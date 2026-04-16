---
title: "Synchronous vs Asynchronous Communication: When to Call and When to Publish"
date: "2026-01-06"
template: "post"
category: "software-architecture"
tags:

- "software architecture"
- "software development"
- "engineering culture"
- "event driven architecture"
- "microservices"
- "what is software architecture"
description: "Synchronous and asynchronous communication are not opposing choices, they are complementary tools. Understanding when to use each is key to building scalable systems."
socialImage: ./media/software-architecture-sync-vs-async.png
---

In the previous article we explored the difference between data events and domain events, and how mixing them creates confusion. This time we take a step back and look at a broader question: how should services communicate in the first place?

Because once your system becomes distributed, communication is no longer an implementation detail. It is part of your architecture.

## The false debate

Much like the monolith versus microservices discussion, synchronous versus asynchronous communication often turns into a debate.

You will hear things like:

- “We should not call other services”
- “Everything should be event-driven”
- “Just make an API call, it is simpler”

None of these are universally correct.

They are simplifications of a much more nuanced problem.

Synchronous and asynchronous communication are not competing approaches. They solve different problems. Treating them as interchangeable, or worse, treating one as superior, is where things start to break down.

## What synchronous communication really is

Synchronous communication is straightforward. One service calls another and waits for a response. A request goes out, a response comes back.
This creates a direct dependency. `Service A` depends on `Service B` being available and responding in time.

That sounds like a downside, but it also provides clarity.
Failures are immediate. Latency is visible. The flow of data is easy to follow.
This makes synchronous communication a good fit when you need certainty.

For example:

- Validating input before processing
- Fetching data needed to complete a request
- Checking permissions or business rules
- Anything that requires an immediate answer

If you need to know something before you can continue, a synchronous call is usually the right choice.

## What asynchronous communication really is

Asynchronous communication works differently. Instead of asking for something, you publish that something happened.
You do **not** wait for a response. You move on. <br />
Other services can react to that event in their own time, independently of the original request.

This removes the direct dependency between services, but introduces a different kind of complexity.
Failures are no longer immediate. They can be delayed, retried, or even silently ignored if you are not careful.

That does not make asynchronous communication worse. It just makes it different.
It shines in scenarios where you are reacting to something that already happened.

For example:

- Sending emails or notifications
- Updating search indexes
- Triggering downstream processes
- Integrating with external systems

In these cases, you do not need an immediate answer. You just need to make sure the reaction eventually happens.

## A simple example

Consider placing an order.

The initial request might look like this:

- Validate the order
- Check inventory
- Store the order

These steps are typically synchronous. You need to know whether they succeed before you can respond to the user.

Once the order is placed, a different set of actions follows:

- Send a confirmation email
- Update analytics
- Notify other systems
- Trigger fulfillment

These are not part of the immediate request. They are reactions to something that already happened.

This is where asynchronous communication fits naturally.

Trying to force everything into one model quickly becomes awkward.

If you make everything synchronous, your request chain grows longer and more fragile. If you make everything asynchronous, you lose control over what is actually completed when the request finishes.

## Where things go wrong

Most issues do not come from choosing one approach over the other. They come from using the wrong one for the problem at hand.
One common mistake is using asynchronous communication for things that require an immediate answer.

Publishing an event and hoping another service processes it in time is not a replacement for a direct call. It introduces uncertainty where you actually need guarantees. On the other side, teams often overuse synchronous calls across service boundaries.

A calls B, B calls C, C calls D. Everything works, until one service slows down or fails. Now your entire request chain is affected.
This creates cascading failures that are difficult to debug and even harder to recover from.

There is also a more subtle problem...

Making something asynchronous does not make it simpler. It moves the complexity elsewhere.
Retries, ordering, idempotency, and observability all become your responsibility. If you do not design for that, failures become invisible and behaviour becomes unpredictable.

## The real trade-offs

Synchronous communication is easier to reason about. You see the full flow, you get immediate feedback, and failures are explicit.
But it comes with tighter coupling and less flexibility. Services depend on each other being available at the same time.

Asynchronous communication decouples services and allows systems to scale more naturally. It enables independent processing and reduces direct dependencies.
But it makes the system harder to understand. Debugging becomes more complex, and failures are no longer obvious.

Neither is better.
They are trade-offs.

## How they work together

In practice, most well-designed systems use both.

Synchronous communication is often used within a bounded context, where clarity and immediate feedback matter.<br />
Asynchronous communication is used between contexts, where independence and scalability are more important.

A common pattern looks like this:

- A request comes in
- Services communicate synchronously to complete the core action
- Once done, an event is published
- Other services react asynchronously

This keeps the core flow predictable, whilst allowing the system to evolve and scale around it.

## A simple rule

If there is one guideline that holds up in most cases, it is this:

> If you need an answer now, make a call. </br>
> If something already happened, publish an event.

It is not perfect, but it is a good starting point.

## Wrapping up

Just like with architectural styles, communication patterns are not about choosing the “right” one upfront.
They are about understanding the problem you are solving.

Synchronous communication gives you certainty and simplicity. Asynchronous communication gives you flexibility and scalability.
Good architecture is not about picking one. It is about knowing when to use each, and how they fit together.

Teams that treat this as a strict rule tend to struggle. Teams that understand the trade-offs tend to build systems that are easier to evolve.
And just like everything else in architecture, this is not a one-time decision. It changes as your system grows.

In the next article, we will look at one of the hardest problems in software architecture: where to draw boundaries, and why getting that wrong hurts more than almost anything else.
