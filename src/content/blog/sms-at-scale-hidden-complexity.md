---
title: "The Hidden Complexity of SMS at Scale: Building a Messaging Platform That Doesn't Drop Texts"
description: "Delivering 5M+ texts a month taught me that SMS looks simple until you're the one guaranteeing it arrives. Notes on idempotency, dead-letter handling, and carrier reality."
pubDate: 2025-09-22
tags: ["System Design", "Messaging", "AWS", "Reliability"]
---

Text messaging feels like a solved problem — you call an API, a message appears on someone's phone. Then you build a product where deliverability *is* the product, moving 5M+ texts a month, and you discover that "solved" was doing a lot of quiet work you never had to think about before.

**Carriers are not one system, they're hundreds of small negotiations.** Every carrier has its own filtering heuristics, rate limits, and shortcode registration quirks. A message that sails through T-Mobile can get silently throttled on a smaller regional carrier. We stopped treating delivery as binary and started tracking delivery *paths* — which provider, which route, which retry attempt actually got the message through — because averages hide the carriers quietly failing you.

**Idempotency isn't optional once retries exist.** Any queue-driven system will eventually retry a message that actually succeeded the first time — a timeout on the response doesn't mean the send failed, it might just mean you didn't hear back fast enough. Without idempotency keys tied to each outbound message, retries turn into duplicate texts, and duplicate texts turn into abuse complaints and carrier penalties that hurt every user on the platform, not just the one who got double-texted.

**Dead-letter queues are your honesty layer.** Early on we let failed sends vanish into logs nobody read. Now every terminal failure lands in a dead-letter queue with enough context to answer "why" without re-running the whole pipeline in our heads. That single change turned "some texts don't arrive sometimes" from a mystery into a Tuesday-morning triage list.

**Reputation is a shared resource, and abuse is everyone's problem.** Number reputation and carrier compliance aren't back-office concerns — they determine whether your legitimate users' messages get delivered at all. We built abuse controls not because we distrust our users, but because a small number of bad actors can degrade deliverability for everyone sharing the same sending infrastructure. Protecting the platform's reputation *is* a feature for every honest user on it.

**Load-balanced doesn't mean load-aware.** Auto-scaling AWS infrastructure handles volume; it doesn't automatically handle *burstiness*. SMS traffic spikes in ways that correlate with real-world events — holidays, outages elsewhere, time zones waking up — and we learned to provision for burst shape, not just burst size.

None of this shows up in a demo. It only shows up at 5M+ texts a month, when the 0.1% edge case is still thousands of real messages to real people. That's the part of "boring infrastructure" that actually deserves the most engineering attention.
