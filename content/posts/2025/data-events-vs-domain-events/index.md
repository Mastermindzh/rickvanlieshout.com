---
title: "Data Events vs Domain Events: Stop Mixing Them"
date: "2025-12-23"
template: "post"
category: "software-architecture"
tags:

- "software architecture"
- "software development"
- "engineering culture"
- "event driven architecture"
- "kafka"
- "what is software architecture"
description: "Data events and domain events both have their place, but mixing them is one of the fastest ways to create confusion in event-driven systems."
socialImage: ./media/data-events-vs-domain-events.png
---

In the previous article we explored how systems evolve structurally, from modular monoliths to distributed systems and eventually microservices. This time we move one level deeper, into how those systems communicate.

Once your system becomes distributed, communication is everything. This is where things often start to break down.

## Where it usually goes wrong

Most teams do not set out to build a confusing event-driven system. They start simple. A change happens in a service, an event is published, and another service reacts.

Something like:

```
CustomerUpdated
OrderChanged
EntityUpdated
```

It feels clean at first. Generic, reusable, flexible.

Until it isn’t.

The moment another service consumes that event, it has to answer a question: what actually happened?

Was the address updated, the status changed, or something recalculated?

The consumer now has to figure that out. It pulls additional data, compares state, and often keeps local copies just to understand what changed over time.

At that point, meaning is no longer explicit. It has to be reconstructed.

That is where the pain begins.

## The real issue is not events, it is ambiguity

Teams often blame event-driven architecture itself. Kafka becomes the problem. Asynchronous communication becomes the problem.

But it is neither.

The real issue is that the system is publishing **data events**, whilst consumers are expecting **domain intent**. That mismatch introduces complexity that spreads across the system.

## Data events vs domain events

There is a simple but important distinction.

**Data events describe what changed.**
**Domain events describe what happened.**

A data event looks like:

```
CustomerUpdated
OrderRowChanged
EntityUpdated
```

A domain event looks like:

```
CustomerAddressChanged
OrderPlaced
RouteRecalculated
InvoiceFinalised
```

One forces you to interpret. The other tells you exactly what to do.

That is the difference between extracting meaning from data and being given meaning directly.

## Data events are not wrong

Data events are not a mistake. They are useful, and often necessary.

There are many scenarios where intent does not matter, only state. Filling dropdowns, synchronising reference data, updating read models, feeding search indexes, or keeping caches in sync.

In those cases, a simple “CustomerUpdated” event is perfectly fine. You do not care why something changed, only that you have the latest version.

This is where data events shine.

## Where things go off the rails

Problems start when data events are used to drive behaviour.

When a service reacts to something like “EntityUpdated”, it needs context. Because that context is not in the event, it has to rebuild it. This leads to consumers fetching additional data, keeping their own state, and implementing logic that does not belong to them.

At that point, your system is no longer loosely coupled. It is tightly coupled through interpretation. You have not removed dependencies, you have just hidden them.

This is where “event-driven” quietly turns into async CRUD.

## Domain events change the conversation

Domain events remove that ambiguity. They describe something that has already happened, in business terms.

```
OrderPlaced
RouteCalculated
InvoiceApproved
```

The consumer no longer needs to guess. It does not need to diff or fetch additional state just to understand intent. It simply reacts.

That is what event-driven systems are supposed to feel like.

> Events should describe what happened, not what changed.

## Kafka does not fix this for you

Kafka does not care whether your events are good or bad.

You can have clean topics, proper partitioning, and great throughput, and still end up with a system that is hard to reason about. The problem is not how events are transported, it is what they represent.

A topic full of “EntityUpdated” events is still a problem, no matter how well it scales.

## It is not either or

In a well-designed system, you often have both.

You might publish a domain event like `OrderPlaced`, followed by a data event like `OrderReadModelUpdated`. Each serves a different purpose. One drives behaviour, the other synchronises state.

That is completely fine.

The key is that they are not the same thing, and should never be treated as such.

## A simple rule

If there is one thing to take away, it is this:

**Use data events to sync state. Use domain events to drive behaviour.**

## Why this matters more than it seems

As systems grow, these small decisions compound. A few ambiguous events turn into dozens, and a few consumers with extra logic turn into entire services built on assumptions.

Before long, your architecture becomes harder to change than the monolith you started with. Event-driven architecture is supposed to give you flexibility, but without clear intent it does the opposite.

## Wrapping up

Good architecture is not just about structure. It is about clarity. Clarity in boundaries, ownership, and communication.

Events are one of the most powerful tools we have in distributed systems, but only if they actually communicate something meaningful.

As the year comes to an end, it is a good moment to reflect on the systems we build and the decisions we carry forward.

Take a step back and look at the events in your system. Ask yourself whether they describe what truly happened, or just what changed.

If there is room to improve, that is a good thing. It means your system is still evolving.

Wishing you a calm Christmas, and a new year filled with better decisions, simpler systems, and fewer `EntityUpdated` events.
