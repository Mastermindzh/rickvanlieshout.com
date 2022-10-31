---
title: My blog hasn't gotten an update in 5 years, here's why.
date: "2022-10-30"
template: "post"
category: "blog"
tags:
  - "software development"
  - "architecture"
  - "writing"
description: "Good software design practices and a few perfectionistic tendencies lead to almost 5 years without any writing. This post is a deep dive into a few of the struggles of the past 5 years"
---

I've been rebuilding the old "[rickvanlieshout.com](https://rickvanlieshout.com)" for over 5 years now...
But the website isn't that big. It could be done way faster and it has been done way faster.
The thing is, I rewrote it several times, each time with a different design and updated packages.

## Changing the theme (round #1)

Shortly after finishing the original website its design already felt stale.
Sure, it had some nice colors and I really liked the mobile view (it read beautifully on a smartphone), but it still felt off.
Nothing on the website gave me a wow effect, most of it was "ok" and some of it was not to my liking.
I never quite put my finger on the why, but it just didn't feel right.

I did put a lot of time into optimizing and designing the bits I found important, the biggest time sinks were multi-language support and print mode.
In the end, I even ended up making a compromise on the multi-language support because I didn't want to blog in Dutch.
One of the things I'm glad I did, however, was working on styling print mode.
It wasn't because I expect many people to print my website or articles, it's because I expect some of them to use "read-focus" extensions or apps like pocket as I do so often myself. I also suspect the occasional pdf download, most of which I probably did myself on my resume page though.

One of the biggest annoyances that I tried solving with a new theme was dark mode.
Hell, I swung completely in the opposite direction and bought the all-dark [Hikma theme](https://themeforest.net/item/hikma-portfolio-html-template/23366729). I rebuilt the entire site in that theme, but never published. The next chapter will explain why.

## Moving to Gatsby

Right around the time I started thinking about uploading the new theme I also found GatsbyJS.
Gatsby was in its infancy back then, barely out of beta and a little rough around the edges.
Considering I like to live on the edge, software-wise anyway, I decided to go for it.
`rickvanlieshout.com-hikma-gatsby` was born and I worked on it for a few short weeks.

In the end, that also burned out because, again, the theme felt stale.

## Upgrading to Gatsby 3 and back to the old theme

I'd had enough! I needed to finish my website and I needed to do it quickly.
I picked up the new Gatsby V3, my old theme, and a renewed mental vigor and started coding away.
The first prototypes came into existence very quickly and looked fine.

Alas, I burnt out on the project almost as quickly as I had started.
One of the reasons was the theme... but there was a more serious reason this time as well.

## Server-side rendering, the old theme, and a stubborn software architect

During the rewrite to Gatsby V3 I encountered various SSR issues.
The most notable of them all was not being able to save and apply the color scheme without annoying flashes on page loads.
I chalked it up to a CSS issue and left it for what it was at first, but I simply couldn't go live like this.

We just discovered my other biggest flaw. Perfectionism.
Because I am responsible for code and product quality at my job and have also heavily emphasized that part of my contributions in any of the open-source projects I've worked on, I felt that I couldn't release something that wasn't perfect.
And as most of you will know, you can chase perfection forever. There is always a flaw, always something to improve.

In my mind, I could fix the quality issues, but I'd still be left with the theme.
I also realized I'd end up at the same point I started... Same design, and the same missing features, just a bunch of time later.
This wasn't working either.

## Finding a new design and a new starting point

One day I found myself procrastinating on a whole bunch of things by looking at fancy CSS themes.
I hadn't really thought about it, but I'd ended up looking at new portfolios and blog designs.
I'd found a few good candidates but didn't really make a choice yet.

Was I embarking on the journey once again? Or would I give up before I started?
Eventually, I decided to organize my thoughts and figure out why things failed before, it roughly came down to:

- I can't go about and make it perfect on the first try
  - No translations
  - Print mode for all the important pages
  - Dark mode can come later
- I didn't like the design, I wanted something black and white which could be reversed for dark mode
- I didn't like the previous efforts of using Gatsby for just the posts and not the static pages
- I needed a starting point, no matter how "good" it was, I needed a place to start writing again.
- I needed a new website fast because the old one was breaking down (PHP updates caused the API to break)

Eventually, I stumbled upon "[lumen](https://github.com/alxshelepenok/gatsby-starter-lumen)". A beautiful blog project with amazing typography and a relatively modern Gatsby setup. It wasn't perfect, it missed a few bells and whistles, but it did tick off a lot of boxes.
I decided to fork the project and try it out, adding bits and bobs of content to see how my writing style would look with the new theme.

I liked it.

## Not all was perfect however

As with all things in life, this project would need some work. I found a few things that were lacking which I wanted to fix before releasing a new website. I was determined not to fall into the same trap as before however and structured the work better than I ever had before.

### Things I changed

Below you'll find a list of some of the biggest things I've changed.

- I added a Dark mode with a little [react-toggle](https://github.com/aaronshaf/react-toggle) to switch between light/dark.
- Blog posts now show a header that includes the "back to articles" button and my name.
- Added code block theming for both light and dark mode
!["A block of code in both the dark and light themes"](/media/prism_styles.png)
- I added support for tables with a bit of styling around them (slight indent and row styling)
![a table](/media/table.png)
- I added the ability to quote others in a beautiful way
![a quote](/media/quote.png)
- Medium like image zooming (click any of the images above)

#### The posts query bug

Here and there I also encountered some bugs. Most of them got fixed in my copy but one of them was big enough that I felt a need to contribute to the project. The "posts query" bug.

Before the fix, there was a bug in the `post-query` file that simply looked through all markdown files to find pages with a slug.
This, however, is troublesome if you have more than the 3 example pages because the default page sizing will fail.
You see, the code that fetches the blogs does so by filtering out real "posts", but the pagination queries do not.
This meant that, given enough pages, the pagination would overflow and tell the user that there were more posts available than there were.
If a user were to click on "next" they would be presented with an empty page.

In the end, it was a tiny bug, but I [submitted a PR](https://github.com/alxshelepenok/gatsby-starter-lumen/pull/1125) to fix it in the upstream repository.

## making it my own

Though the original codebase gave me a great starting point I have decided not to follow the upstream contributions but instead forge my own future.
Doing so allows me to keep my codebase clean and allows me to deviate from the choices made by Alexander.

Alexander is slowly introducing more features than I need.
One of the newer feature commits (a dark mode) even included his own state management library "diesel" for which I see absolutely no fit in the project.

As such, I have decided to simply skip pulling from upstream and maintain the website myself.

## The future is bright

Now that I have this new blog it should be easier for me to write some articles.
Let's hope I will find time to write more than I have in the past 5 years!
