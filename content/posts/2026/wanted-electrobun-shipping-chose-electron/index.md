---
title: "I wanted a lighter runtime like Electrobun, shipping reality chose Electron"
date: 2026-05-10
template: post
category: Development
tags:
  - desktop
  - electron
  - electrobun
  - architecture
  - typescript
  - software architecture
description: "Why [Skillful](https://github.com/mastermindzh/skillful) switched from Electrobun back to Electron, and what that taught me about desktop architecture, packaging and runtime seams."
socialImage: "./media/skillful.png"
---

About a month ago I started building a new application called [Skillful](https://github.com/mastermindzh/skillful)). <br />
Originally, the idea was quite simple: I wanted an excuse to try Electrobun.

For those unfamiliar with it, Electrobun is essentially an Electron-like desktop runtime built around Bun instead of Chromium + Node.js. The biggest selling point is obvious immediately: no embedded Chromium browser. Smaller runtime, potentially lower memory usage, less “Electron bloat”.

And honestly? That attracted me.

People love complaining about Electron applications shipping half a browser with every app. Personally, I’ve always thought that criticism was slightly overblown. RAM exists to be used, and modern desktop applications are expected to behave like modern applications. Still, the idea of a lightweight filesystem-first desktop app built on Bun sounded genuinely interesting.

So I gave it a shot.

At first, it actually went pretty well.

Then I tried to ship it.

## The Reality Of Desktop Applications

One thing became painfully clear very quickly:

Building a desktop application is not the hard part anymore. **Shipping** one is.

Packaging, updating, shortcuts, desktop integration, installers, Linux distributions, release channels, runtime quirks, auto-updates, platform conventions... _that_ is the real product surface of a desktop application.

And this is where Electrobun started falling apart. <br />
Not because it was fundamentally bad. In fact, the runtime itself was perfectly fine most of the time.

The problem was that I kept ending up in runtime land instead of product land.

Issues looked like product bugs but turned out to be packaging problems.
Or updater problems.
Or launcher problems.
Or Linux runtime problems.

Every single one costs time, every single one is annoying.

## Why I Chose Electrobun

Before I explain why I moved away from it, it’s important to explain why I chose it in the first place.

[Skillful](https://github.com/mastermindzh/skillful) is intentionally filesystem-first.

The application manages local AI skills, local models, local assets and local workflows. The disk is effectively the source of truth. I wanted an actual desktop application that happened to have a modern UI, normally I'd use Electron but I wanted to try Electrobun. (hell, the whole idea of [Skillful](https://github.com/mastermindzh/skillful) was born because I wanted to use Electrobun)

Electrobun felt ideologically aligned with that.

- Smaller runtime.
- Fast startup.
- Native feeling.
- Bun tooling.
- No Chromium baggage.

And architecturally, it fit extremely well. And it also delivered on speed, the filesystem was fast without me applying any efficiency standards. It truly felt well.

One of the best decisions I made early on was separating the runtime shell from the actual application logic.<br />
The project structure looked roughly like this:

```txt
src/
  main/           -> business logic
  shared/         -> shared RPC + contracts
  mainview/       -> renderer/frontend
  desktop/        -> runtime abstraction layer
```

The important part here is that `src/main/` never cared about the runtime.

- Filesystem scanning.
- Libraries.
- Archives.
- Settings.
- Collections.
- AI skill metadata.

All of that was runtime-agnostic.
The runtime only needed to satisfy a few interfaces:

- open file dialogs
- reveal paths in the file manager
- perform updates
- expose IPC
- manage windows

That architectural seam ended up saving the project later.
At the time though, it just felt like good engineering hygiene.

## The Packaging Disaster Begins

The first warning signs appeared once I started packaging builds.
Every platform had sharp edges.

Windows especially became a rabbit hole of custom glue code and weird packaging hacks.

I ended up maintaining:

- custom launcher scripts
- bundled `bin/bun`
- bundled runtime files
- zstd-compressed payloads
- manual patch generation
- update archive handling
- custom extraction logic

And the frustrating part is:

none of this had anything to do with [Skillful](https://github.com/mastermindzh/skillful) itself.

I wasn't building features anymore.
I wasn't building infrastructure around the runtime.

The Linux packaging story also became especially painful because there wasn't really a conventional ecosystem around Electrobun releases yet, worse, it doesn't align with other Linux packaging guidelines.

Electron, meanwhile, has had years of people solving these exact problems already.
That difference matters far more than people think.

## Electron Won By Being Boring

Eventually I switched the project back to Electron.

Not because Electron was elegant.
Not because Electron was lightweight.
But because Electron made the difficult parts boring again.

And boring infrastructure is one of the best things you can have.

Using [electron-builder](https://www.electron.build/index.html), a single configuration now produces:

- macOS `.dmg` and `.zip`
- Windows NSIS installers
- Linux `.deb`, `.rpm`, `.AppImage`, `.pacman`, `.snap`, `.flatpak`

That is an absurd amount of packaging complexity solved by one ecosystem.
Previously the Linux story was basically:

> “here’s a tarball, good luck.”

Now releases are conventional.<br />
Predictable.<br />
Expected.

That matters.

## Desktop Integration Should Not Be A Side Quest

Another thing Electron completely solved was native desktop integration.
Things I spent days wrestling with before became one-liners:

```ts
dialog.showOpenDialog()
shell.showItemInFolder(path)
shell.openExternal(url)
```

Icons?<br />
Handled.

Start menu entries?<br />
Handled.

Desktop files?<br />
Handled.

Uninstallers?<br />
Handled. (and actually used.. Electrobun produced an `Uninstall.reg` but never applied it)

I cannot overstate how valuable it is when platform integration stops being your problem.

## The Funny IPC Bug

Ironically, one of the most interesting bugs happened _after_ migrating.
Electron prepends this wonderful little string to IPC errors:

```txt
Error invoking remote method 'rpc:call':
```

Which sounds harmless.
Except the domain-specific error transport depended on a sentinel existing at the start of `error.message`.
So suddenly the custom `AppError` rehydration stopped working.

The fix itself was hilariously small:

```ts
startsWith(...)
```

became:

```ts
indexOf(...) >= 0
```

One-line fix.

But the important part was the lesson:

runtime-specific bugs absolutely exist, and the only reason I caught this one was because I ran tests against the actual packaged runtime.

Not just unit tests.

Real packaged application tests.

Without that, I probably would have shipped it without the fix first.

## The Runtime Seam Saved me

The best thing to come out of the Electrobun experiment was honestly the runtime abstraction layer.

Switching runtimes ended up taking about a single evening.

Not because Electron migration is inherently easy, but because the architecture isolated the runtime shell from the actual application.

The domain layer stayed untouched.

The renderer stayed mostly untouched.

The filesystem model stayed untouched.

The only things rewritten were:

- runtime adapters
- packaging
- IPC wiring

That is exactly what you want from architecture.
The runtime became an implementation detail.
Which, honestly, it should have been from day one.

## What I Learned

Looking back, I think the biggest lesson here is this:

> Runtime minimalism is a false economy if you end up rebuilding the ecosystem yourself.

Saving some memory usage on paper is meaningless if your release pipeline needs babysitting every week.
Electron absolutely uses more memory.
Nobody serious denies that.
But the application now:

- ships reliably
- updates reliably
- packages reliably
- integrates with the OS properly
- behaves conventionally
- is dramatically easier to reason about

That trade-off was worth it, instantly.
And funnily enough, the filesystem-first architecture survived the migration almost untouched.

Because filesystem-first was never really about Electrobun.

It was an architectural decision.
Not a runtime one.

## Final Thoughts

If I had to do it all again?

I’d probably start on Electron immediately.
Not because Electron is technologically superior.
But because desktop application development is overwhelmingly operational work once the product itself exists.

The runtime you choose should make packaging, updates and desktop integration boring.

Electron does.

And after spending weeks deep inside launcher scripts, patch files and packaging edge cases...
boring started sounding really, really attractive.

### Would I Use Electrobun Again?

Honestly?

Yes, probably.

Despite everything in this post, I actually still like the idea behind Electrobun a lot.

The runtime itself was not the problem. In many ways it was refreshingly straightforward. Startup times felt great, Bun is genuinely pleasant to work with, and the smaller runtime story still appeals to me philosophically.

But desktop applications are judged on the parts _around_ the runtime.

Users do not care what JavaScript engine powers your application.
They care whether:

- installing works
- updating works
- file associations work
- uninstalling works
- icons work
- shortcuts work
- the application feels native

Electron has years of ecosystem maturity solving exactly those things.
Electrobun is simply not there yet.
I would absolutely consider using it again once a few things mature further.

#### Native Packaging Needs To Become The Default

The biggest one for me is installation strategy.
Desktop applications should install using conventional OS-native mechanisms.

Not:
> "extract this tarball somewhere and run the launcher."

That may be technically acceptable for developers, but it is not acceptable for mainstream desktop software.
The moment your installer story becomes custom, you inherit years of operational complexity yourself.<br />
Electron ecosystems solved this years ago.

#### Desktop Integration Needs To Be Assumed

Basic OS integration should not require detective work.

Things like:

- application icons
- Start Menu entries
- uninstall registration
- desktop files
- external URL opening
- native dialogs

should simply work.

Not “work with a helper script”.
Not “work if you manually patch the generated output”.
Not “work after reading three GitHub issues”.

Just work.

One of the nicest feelings during the Electron migration was deleting workaround code instead of writing more of it.
That alone said a lot.

#### The Chromium Embedded Suggestion Scared Me

One thing that genuinely surprised me was seeing the documentation suggest bundling Chromium Embedded Framework (CEF) for Linux packaging scenarios.

At that point I had a bit of an existential moment.
Because if the solution to packaging problems becomes:

> “ship Chromium anyway”

then we've effectively lost the entire original value proposition.
The whole reason I explored Electrobun was to avoid shipping massive browser runtimes in the first place.

Once we start reintroducing pieces of Chromium manually, things become very difficult to justify operationally.

### The Ecosystem Needs Time

And honestly, this is probably the fairest conclusion.

Electron is old.
Very old.

Which means:

- millions of edge cases already happened
- somebody already solved most packaging problems
- updater pipelines are battle-tested
- CI examples exist for everything
- installers are predictable
- desktop conventions are well understood

Electrobun simply has not had time to accumulate that maturity yet.
That is normal.<br />
I think the project has potential.
I genuinely do.

But for Skillful, where reliable releases mattered more than runtime ideology, maturity beat elegance.
And right now, Electron is still overwhelmingly the more mature choice.
