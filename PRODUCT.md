# Product

## Register

product

## Platform

web

## Users

EchoEdu is a freemium voice-first AI tutor for children, with a marketing landing page that converts into an authenticated app. Three audiences use the product, and the design has to serve all three without catering to just one:

- **Child learner (primary user)** — roughly ages 6–14, the person actually talking to the tutor and working through subjects. Often on a low-cost phone, sometimes with low literacy, almost always in a language other than English.
- **Parent (decision-maker and payer)** — chooses the product, sets up the account, and decides whether to upgrade to Premium. Needs to feel the product is safe, trustworthy, and genuinely helping their child.
- **Teachers / schools (third audience)** — a growing surface for classrooms and cohorts; care about groupings, progress, and manageability at scale.

The child is the user; the parent is the buyer; teachers/schools are the institutional expander. Design defaults to the child's moment-to-moment experience, but every screen should also read as safe and credible to a watching parent.

## Product Purpose

A voice-first AI tutor that holds a real conversation with a child in their own language (12 Indian languages, including Urdu/RTL), answering questions and guiding study with Groq AI and on-device Web Speech. It is built to run on low-cost devices and, per the product intent, even offline — so a child's access to a tutor does not depend on a fast connection or an expensive phone. Free tier is usable on its own; Premium adds depth (more subjects, history, rewards, multi-child).

Success looks like: a child can ask a question out loud and get a helpful, age-appropriate spoken answer in their language; a parent can see it is working and trust it; an upgrade feels like a fair, optional step up rather than a wall.

## Positioning

A voice-first AI tutor that speaks your child's language — even offline, on a $50 phone.

## Conversion & proof

- Primary CTA: **Start learning free** (sign up / open the tutor).
- Secondary CTA: **See pricing / Upgrade to Premium** (for visitors not ready to start, or free users hitting a limit).
- The line a visitor remembers after 10 seconds: *"Your child's tutor that speaks their language — anywhere, even offline."*
- Belief ladder (what a visitor must come to believe, in order, before the primary CTA):
  1. This actually talks to my child in our language.
  2. It's safe, age-appropriate, and genuinely helpful — not a toy.
  3. It works on the phone we already have, even with a weak connection.
  4. Free is enough to start; Premium is a fair, optional upgrade.
- Proof on hand: testimonials, classroom/case-study results, and press are not yet collected. Collect any parent quotes, school pilots, or usage numbers into `.impeccable/assets/proof/` and reference them by path.

## Brand Personality

Warm, calm, and trustworthy — friendly to a child without being infantilizing, and credible to a parent without being corporate. The voice is encouraging and plain-spoken. Three words: **warm, trustworthy, encouraging**. Emotional goal: the child feels helped, not judged; the parent feels reassured.

## Anti-references

*(Proposed defaults from the brief and the existing `design.md` — confirm or edit.)*

- **Not toy-like or loud** — no candy-colored, cartoon-shout visual noise that makes a parent distrust it.
- **Not a cluttered SaaS feature grid** — don't lead with a wall of feature cards and upsell badges; show the tutoring, don't list it.
- **Not English-default** — never treat one language as the default with others bolted on; the experience must be language-first.
- **Not cold "techy" edtech** — avoid the dark, neon, dashboard-for-engineers look that reads as unfriendly to families.

## Design Principles

- **Language-first, voice-first.** The interface meets the child in their own language and honors spoken input; low-literacy-friendly and RTL-aware (Urdu) by default, not as an afterthought.
- **Earn trust, not attention.** Calm, warm, and legible for a watching parent; restraint over spectacle.
- **Inclusive by default.** 12 languages, disability modes (cognitive, low-vision, hard-of-hearing), and low-cost/offline devices are design constraints, not edge cases.
- **A free tier that feels complete.** Premium is a clear, humane step up — never a wall that blocks the core experience.
- **Show, don't tell.** Demonstrate tutoring through real interaction and gentle feedback, not feature lists or hero metrics.

## Accessibility & Inclusion

- Target **WCAG 2.1 AA** contrast and touch targets (≥44×44px); preserve visible focus outlines (don't strip `outline`).
- Built-in accessibility modes toggled at sign-up: **Cognitive**, **Low Vision**, **Hard of Hearing**.
- Multilingual through i18next with 12 Indian languages; Urdu is RTL and must be handled correctly.
- Respect `prefers-reduced-motion`; keep motion as state feedback, not decoration.
- Offline/low-bandwidth resilience is a feature, not a fallback — design for weak connections and cheap devices.
