---
title: "Why We Rebuilt Our AI Chat Pipeline for Scale: Lessons from Genius AI's First 100K Users"
description: "What broke, what held, and what we'd do differently after Genius AI went from zero to 100K sign-ups in three weeks without falling over."
pubDate: 2025-08-14
tags: ["AI", "System Design", "Node.js", "Case Study"]
---

When we shipped Genius — our GPT-4/5 and Vision-powered AI chat app — we sized the backend for steady growth. We got a hockey stick instead: 100K+ sign-ups in the first three weeks. No outage, no degraded service, but it was closer than I'd like to admit, and it taught me more about production AI infrastructure than the two years before it.

**The bottleneck was never the model.** Everyone worries about LLM latency first. In practice, our slowest requests were rarely the OpenAI call itself — they were database writes waiting on lock contention, and image uploads competing with chat completions for the same connection pool. We separated read-heavy and write-heavy paths onto distinct MongoDB connection pools, and that alone cut our p95 latency more than any prompt optimization did.

**Caching has to be aggressive but honest.** A meaningful share of conversations start with near-identical system prompts and context windows. We cache aggressively at the request-shaping layer — not the model output, which would break the "feels alive" quality users expect from a chat product, but everything upstream of the actual generation call. That distinction matters: cache the plumbing, never the personality.

**Auto-scaling needs a floor, not just a ceiling.** AWS auto-scaling groups are good at reacting to load, but reacting is inherently late. We learned to keep a warm floor of instances sized for our worst realistic 15-minute spike, not our average traffic, because cold-starting new containers under a viral growth curve means users see failure before your infrastructure sees a metric worth acting on.

**Redis became our shock absorber.** Every queue-able side effect — usage logging, moderation checks, push notification triggers — got pulled out of the request path and into Redis-backed background jobs. The chat response itself is the only thing that needs to be synchronous; everything else can be eventually consistent.

If there's one takeaway I give founders building AI products now, it's this: your uptime story isn't written by your model provider, it's written by the boring infrastructure decisions you make around it — connection pooling, queueing discipline, and refusing to let non-critical work block the critical path. Genius held at 99.9% uptime through that first spike not because we predicted the exact load, but because we'd already decoupled the parts that couldn't fail from the parts that could.

We're still running variations of that same architecture today, just with more headroom built in from day one.
