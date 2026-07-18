---
title: "TDD Isn't Slower — It's a Different Kind of Fast"
description: "Test-driven development gets dismissed as a tax on shipping speed. After 19+ years and a fair number of production incidents, here's why I still lead with it."
pubDate: 2025-11-18
tags: ["Engineering Culture", "TDD", "Leadership"]
image: "/blog-covers/tdd-different-kind-of-fast.jpg"
---

Every few months someone on a new team asks why we still write tests first when "we could just ship faster without them." It's a fair question from anyone who's only felt the upfront cost of TDD and not the downstream cost of skipping it. So here's my honest answer, not the textbook one.

**TDD doesn't make the first version faster. It makes the fifth version faster.** Nobody ships a feature once. You ship it, a customer finds an edge case, you patch it, a teammate refactors the module six months later, and you extend it again next year. The upfront discipline of writing a failing test before the implementation doesn't slow down version one meaningfully — but it makes every version after that dramatically safer to touch, because you have a truth source for "does this still work" that doesn't depend on someone remembering to manually re-check it.

**It's a design tool disguised as a testing practice.** Writing the test first forces you to think about your function or endpoint from the outside — what does the caller actually need, what's the smallest useful contract — before you've committed to an implementation. Most of the over-engineered code I've had to unwind over the years was written implementation-first, where the API shape followed whatever was easiest to build internally rather than what was actually easiest to use.

**It changes what "fast" means at the team level.** A single engineer can absolutely move faster without tests for a week. A 20-person engineering team cannot move faster without them for a quarter. At NerdDevs scale, the question isn't "can I personally skip this test," it's "can every other engineer who touches this file in the next year safely assume it still does what it says." TDD is how we buy that assumption cheaply instead of expensively, via a production incident.

**The proven-pattern half matters as much as the testing half.** TDD without sound design patterns just gives you well-tested spaghetti. We pair test-first development with established patterns — repository layers, clear service boundaries, idempotent job handlers — so the tests are verifying something architecturally sound, not propping up something that should have been restructured instead.

I don't run TDD as dogma — there are prototypes and throwaway scripts where it's genuinely the wrong tool. But for anything going into production, anything another engineer will maintain, anything a customer will depend on: the tax is real, and it's one of the cheapest insurance policies in software engineering.
