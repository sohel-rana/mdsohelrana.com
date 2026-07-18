---
title: "From Idea to 1,000 Educators: What Building Biddaan Taught Me About EdTech in Bangladesh"
description: "Biddaan is our localized multi-vendor LMS for coaching centers and trainers in Bangladesh. Here's what onboarding 1,000+ educators actually taught us about the market."
pubDate: 2025-10-09
tags: ["EdTech", "SaaS", "Bangladesh", "Product"]
---

Biddaan started from a simple observation: coaching centers and independent trainers across Bangladesh were running their entire business — live classes, course sales, exams, payments — across five disconnected tools, or worse, out of a notebook and a WhatsApp group. The opportunity wasn't "build an LMS." Global LMS platforms already exist. The opportunity was building one for how educators here actually operate.

**Offline-first isn't a nice-to-have, it's table stakes.** A meaningful share of our educators enroll students in person, collect cash payments, and only later reconcile everything digitally. If your platform assumes every transaction starts online, you've excluded a large, active, paying part of the market before you've even launched. We built offline enrollment and institute management as first-class flows, not an afterthought bolted onto an online-only product.

**Multi-tenancy has to be invisible to the tenant.** Each educator or institute on Biddaan needs their own branded space, their own student rosters, their own exam banks — without ever feeling like they're a "tenant" in someone else's system. Getting the data isolation architecture right early meant we could onboard institute #1 and institute #1,000 on the same codebase without either one feeling like a compromise.

**The exam engine is the actual product, even though it looks like a feature.** Coaching centers in Bangladesh live and die by exam quality — question banks, audio questions for language learning, negative marking schemes that match local exam boards, and analytics that tell a trainer exactly where a batch of students is falling behind. We under-invested here in our first version and it showed immediately in retention. Once we treated assessments as core infrastructure rather than a checkbox feature, engagement numbers moved in a way nothing else we shipped matched.

**Trust compounds slower than you'd like, and faster than you'd expect once it starts.** Our first 50 educators came from direct outreach and word of mouth in tight-knit coaching networks. Educator #1,000 came largely from other educators. That's the EdTech growth loop that actually works in this market — not performance marketing, but one trainer telling another that their students' exam scores improved.

Building for a specific market's real operating constraints, instead of porting a generic SaaS playbook, is slower at first and much more durable later. That's the trade I'd make again.
