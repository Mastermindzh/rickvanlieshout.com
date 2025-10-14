---
title: What is Software Architecture (Really)?
date: "2025-10-08"
template: "post"
category: "software-architecture"
tags:

- "software architecture"
- "software development"
- "engineering culture"
- "team dynamics"
- "people management"
- "team maturity"
- "frontliners"
- "adaptability"
description: "Software architecture isn’t a fixed design or a set of diagrams, it’s the evolving set of decisions that guide how a system behaves and grows with its team."
socialImage: ./media/compass.png
---

## A new category on rickvanlieshout.com: Software Architecture

This new category is about the *real* side of software architecture.
Not buzzwords, not picture-perfect diagrams, but the messy, human part of designing systems that actually work.

I’ve spent many years working with different kinds of architectures, from tightly coupled monoliths to sprawling microservice landscapes. Along the way, I’ve learned that architecture isn’t about doing things the “right” way, it’s about understanding *why* you’re doing them in the first place, and how they fit into your team and product’s reality.

Note that this applies both to enterprise systems as well as open-source initiatives.

## What software architecture actually is

Software architecture is the set of decisions that define how a system behaves, evolves, and is understood over time.
It’s not the framework, not the diagram, and not the shiny technology you picked. It’s the *reasoning* behind those things, and how they hold up when the system changes.

If software design is about the details, like how classes interact, how APIs are structured, and how code is organized, architecture is about direction.
It’s the compass that helps the team navigate change without losing its bearings.

Good architecture provides just enough structure for a team to move fast, without locking them into a corner. It’s the scaffolding around the code, the **shared mental model** that keeps complexity in check.

But architecture doesn’t exist in isolation. The same design that works beautifully in one place can fail completely in another, which brings us to the one factor most people overlook: **context.**

## Why context always matters

There’s no single best architecture, only architectures that make sense in a specific context.
A perfect design on paper might fail completely when you drop it into the wrong environment. The right architecture depends on your product stage, your constraints, and, most importantly, your team.

At Frontliners, we’ve seen this up close.
We took on the task of replacing a monolith that had been in production for more than 25 years. It was deeply intertwined with the business, used everywhere, and full of edge cases that only existed because of decades of real-world use.
To make matters worse, these edge cases are often only known to some users, others just "follow what they've been taught".

We didn’t have a large or deeply experienced team at the time, but we did have a strong sense of purpose.
We knew we wanted to modernize, to move toward something distributed and scalable, but we also knew we couldn’t do it all at once. That meant making tough decisions, again and again, weighing what we could achieve now against what would still make sense later. This is especially true from a technical perspective as during this tumultuous time we've switched both CPO and CEO multiple times. They all offered new and shiny things, and tech was left trying to realize them within increasingly shorter timelines.

We focused on the people we had, their strengths, their limits, their growth potential, and built an architecture that could *grow* with them.
It wasn’t perfect, but it gave us some momentum, and that momentum led us to something sustainable.

Still, even with the best intentions, it’s easy to lose perspective once you’ve found a path that seems to work. The next challenge we faced wasn’t technical at all, it was cultural.

## When good principles turn into dogma

During our early microservices phase, we fell into a trap many teams do.
We started creating “rules” that sounded right, but didn’t always fit reality.
Things like *“you can only do X”* or *“you can NEVER depend on another service”*.
And whilst I, as the architect or CTO, never called these "rules" (rather: guidelines), when they were communicated between layers of old <> new developers they often turned into "rules".
Rules like that can be comforting because they feel like control, but they’re often just fear in disguise.
Take something like route calculation. When you have hundreds of parameters and thousands of routes, you can’t pre-compute every possible scenario. Sometimes you need to depend on another service, and that’s fine. Architecture should adapt to problems, not deny their existence.

The problem wasn’t the technology, it mostly never is, it was the mindset.
Without a clear product goal, people cling to certainty. Those “rules” gave us a sense of safety, but they also made change harder. We eventually had to tear those walls down and rebuild our way of thinking, together.

That rebuilding forced us to look inward and ask hard questions about who we were as a team. Because architecture isn’t just about systems, it’s about people.

## Architecture and team maturity: balancing trade-offs

Every architecture exists in the shadow of the team that builds it.
A highly mature, cross-functional team can handle complexity. A newer or smaller team cannot, no matter how good the intentions are.

If your architecture outpaces your team’s ability to understand or maintain it, it’s not a good architecture for you.
Progress sometimes means taking two steps forward and one step back. You might accept a short-term compromise, a “bad” thing, to enable the next leap forward.

And that’s okay.
Because architecture isn’t a competition, it’s a conversation. The best systems evolve through collaboration, not commandments.
Let the team make mistakes, learn, and recover. If you enforce every decision from above, you’ll gain consistency, but lose creativity and ownership.

Every engineer should be part of that conversation. They don’t have to think about architecture every day, but they should *care* about it. Curiosity and challenge keep architecture alive.

Yet even with a healthy mindset, time changes everything. The longer a team works in the same system, the easier it becomes to stop questioning it.

## Choice blindness and the value of fresh eyes

As teams settle into a certain way of working, patterns start to feel “normal.”
Pain points fade into the background, awkward workarounds become invisible (even desired!). Over time, everyone forgets that things could be different. I call this *choice blindness*, when familiarity blinds you to your own design decisions.

That’s why new hires are so valuable.
They don’t carry the same assumptions. They look at your system and ask the uncomfortable questions:
“Why does this work like that?”
“Is that rule still needed?”
“Has the context changed since we made that decision?”

Sometimes those questions sting. But they’re essential, because context *does* change.
Teams evolve, products evolve, constraints evolve, and what once was a good choice might be holding you back now.

Helping teams see those patterns and guide that evolution is what good architects do best.

## The role of the architect

An architect’s job therefore isn’t to dictate (though they are often given that power), it’s to clarify.
They connect the big picture to the team’s day-to-day, make trade-offs explicit, and keep people aligned. The most valuable skill an architect has isn’t technical, it’s adaptability.

A good architecture isn’t static. It bends with the product, the people, and the business.
And that adaptability only exists when the team is part of the conversation.
Architecture that’s understood by everyone lasts longer, because it belongs to everyone.

And that shared ownership matters, because architecture isn’t something you finish, it’s something you *continually* shape.

## Architecture is ongoing, not final

Architecture is never done. It’s a living process that shifts with each decision, sprint, and release.
That constant evolution can look chaotic from the outside. To stakeholders or customers, it might even seem like we’re changing direction all the time.

But that’s exactly what makes a system resilient, it changes with its context.
You can’t plan your way to perfection, you can only *evolve* your way there.

The key is communication. When we explain *why* we’re making architectural changes, and how they serve the product long-term, that “technical mess” starts to look like healthy adaptation.
A system that never changes is a dead one.

That’s something we learned first-hand. At Frontliners, we saw how both people and systems evolve, and how one without the other simply doesn’t work.

## Wrapping up

At Frontliners, we started with a thirty-year-old monolith and a small, still-growing team.
We worked through complexity, limitations, and doubt. We made decisions that weren’t perfect, but they kept us moving.

Now, we have the right people and the right balance.
We’re building something sustainable and great. What helped us wasn’t just the technical architecture, but its *ability to change with its context*.

That, to me, is what software architecture really is.

In the next article, we’ll look at how these ideas translate into structure, comparing **monoliths, distributed monoliths, and microservices**, and when each one actually makes sense in the real world.
