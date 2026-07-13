---
name: ECHO — Voice-First AI Tutor
description: Warm, claymorphic tutor UI for children. Calm, trustworthy, language-first; tactile surfaces without toy-like noise.
colors:
  primary: "#6B5E88"
  sage: "#5A7A68"
  sky: "#4A6E88"
  blush: "#8A5250"
  cream: "#8A7248"
  neutral-bg: "#EAE8E4"
  ink: "#1A1714"
  ink-muted: "#6B6560"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "40px"
  pill: "999px"
  full: "50%"
spacing:
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#F5F3EF"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "#A898C0"
    textColor: "#F5F3EF"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: ECHO — Voice-First AI Tutor

## 1. Overview

**Creative North Star: "The Quiet Clay Classroom."**

ECHO's visual language is built on two opposing forces held in tension: **claymorphism** — tactile, puffy, three-dimensional surfaces made from layered light-and-dark shadows so cards and buttons feel like soft clay lifted off the page — and **minimalism** — a restrained, desaturated palette, generous whitespace, and no decorative noise. The result is warm and trustworthy for children and parents without slipping into toy-like loudness.

The interface meets a child in their own language (12 Indian languages, Urdu RTL-aware) and honors spoken input, so type stays legible and uncluttered; the parent watching over a shoulder reads calm competence, not a candy-colored game. Depth comes from shadow and glaze, never from saturation.

> **Implementation drift (read before editing).** The build is now reconciled to the Claymorphism × Minimalism brand system. All surfaces — `App.css`, `Navbar.css`, `Dashboard.css`, `Auth.css`, `TutorPage.css`, `PricingPage.css`, `RewardsPage.css` — use the four-layer clay shadow, glazed white edge, warm `#EAE8E4` base, the Fraunces / Plus Jakarta Sans pairing, and the five desaturated accents, centralized in `src/index.css` `:root`. This DESIGN.md is the canonical, build-accurate spec.

**Rejects:** toy-like or loud candy color; cluttered SaaS feature grids; English-as-default; cold, neon "techy" edtech that reads as unfriendly to families.

**Key Characteristics:**
- Tactile clay surfaces (four-layer neumorphic shadow + glazed white edge), never flat.
- Desaturated accent palette — color that reads without competing.
- Warm off-white base (#EAE8E4), not pure white, not cream/beige AI-default.
- Fraunces display + Plus Jakarta Sans body; display reserved for hero/section headings, not UI labels.
- Generous radius (32px cards, 999px pills); soft, not sharp.

## 2. Colors

The palette is restrained-warm: one near-neutral base, a near-black warm ink, and five deliberately desaturated accents. Accents are low-chroma on purpose — they signal subject and state without shouting.

### Primary
- **Dusty Lavender** (#6B5E88): the primary CTA and the Maths accent. Used for the main action on every screen and for maths-related surfaces. Paired tint `#A898C0` is the gradient start on lavender cards.

### Subject Accents
- **Dusty Sage Green** (#5A7A68): success states and Computer-Science cards. Tint `#8AB4A0`.
- **Steel Blue** (#4A6E88): science, links, and secondary navigation. Tint `#7A9CB8`.
- **Dusty Rose** (#8A5250): English and alert/destructive states. Tint `#B88888`.
- **Warm Umber** (#8A7248): Hindi and reward surfaces. Tint `#B8A060`.

### Neutral
- **Warm Light Grey** (#EAE8E4): page background and the fill of neutral clay cards. Carries three subtle radial blobs (sage/lavender/sky) for warmth.
- **Near-Black Warm** (#1A1714): body text and headings. Hit AA on the grey base.
- **Secondary Warm Grey** (#6B6560): captions, placeholders, muted meta. Must still clear 4.5:1 on `#EAE8E4` — if it's close, darken toward the ink, not lighter.

### Named Rules
**The Desaturated Voice Rule.** Accents stay at the muted tones above. Never promote a tint to a full-saturation CTA or use a neon/saturated hue for an inactive state; saturation is reserved for the live "listening" mic and active selection only.

**The One Warm Base Rule.** The page background is `#EAE8E4` (or its tinted blobs), never pure white and never the cream/sand AI default. Warmth lives in accent + type, not in the base.

## 3. Typography

**Display Font:** Fraunces (with Georgia, serif fallback)
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** Plus Jakarta Sans at 500–600 weight, slightly tracked.

**Character:** a soft serif display against a humanist sans body — editorial warmth that still feels friendly and legible to a child. The pairing earns trust; it is not a display-font showcase.

### Hierarchy
- **Display** (600, clamp(3rem, 6vw, 4.5rem), line-height 1.05, letter-spacing -0.02em): hero and section headings only.
- **Headline** (600, ~1.875rem / 30px): sub-section and card titles.
- **Title** (600, ~1.25rem / 20px): list and panel headers.
- **Body** (400–500, 1rem / 16–18px, line-height 1.6, max line length 65–75ch): prose, chat, instructions.
- **Label** (500–600, ~0.875rem / 14px, letter-spacing 0.02em, sentence case): captions, pills, button text, form labels.

### Named Rules
**The Display-Stays-Hero Rule.** Fraunces is for hero/section headings and the brand wordmark only. Buttons, nav, form controls, data, and chat use Plus Jakarta Sans. No display serif in UI labels.

**The Language-First Rule.** Every string is localized (i18next, 12 languages). Urdu is RTL — layout, alignment, and icon direction must flip. Never hard-code English copy or LTR-only spacing.

## 4. Elevation

ECHO is a shadow-driven system, not a flat one. Depth is created by **four layered shadows**: a dark cast shadow, a bright highlight shadow, an inset top-left glow, and an inset bottom-right depth — applied together so surfaces look pressed from soft clay. Every clay surface also carries a 1px translucent-white border that reads as a glazed edge.

### Shadow Vocabulary
- **Clay (large)** (`16px 16px 32px rgba(40,38,34,0.28), -16px -16px 32px rgba(255,255,255,0.82), inset 4px 4px 12px rgba(255,255,255,0.82), inset -4px -4px 12px rgba(40,38,34,0.10)`): large cards (32px radius).
- **Clay (small)** (`8px 8px 16px rgba(40,38,34,0.22), -8px -8px 16px rgba(255,255,255,0.78), inset 2px 2px 6px rgba(255,255,255,0.82), inset -2px -4px 6px rgba(40,38,34,0.10)`): buttons, pills, circles (radius 999px / 50%).
- **Clay (inset / recessed)** (`inset 2px 2px 6px rgba(255,255,255,0.78), inset -2px -2px 6px rgba(40,38,34,0.10), 2px 2px 4px rgba(40,38,34,0.10)`): pills and badges that sit *into* the surface.

### Named Rules
**The Glazed Edge Rule.** Every lifted clay surface gets `border: 1px solid rgba(255,255,255,0.70)`. No clay component ships without it.

**The Press-In Rule.** Interactive clay elements invert their shadow (inset-forward) and scale to 0.97 on `:active`. Hover may lift slightly; active always presses.

## 5. Components

### Buttons
- **Shape:** fully rounded pill (999px radius), clay small shadow.
- **Primary:** Dusty Lavender fill (#6B5E88), warm off-white label (#F5F3EF), padding 14px 32px, weight 600.
- **Hover / Focus:** lift via the clay shadow; label color unchanged. Focus keeps the browser default outline (never removed).
- **Secondary:** Sage fill (#5A7A68) for the alternate action (e.g. "Learn free" vs "See pricing").
- **Active:** shadows invert (pressed-in) + `transform: scale(0.97)`.

### Chips / Pills
- **Style:** recessed inset shadow, neutral or accent tint background, 999px radius.
- **State:** selected chips use the matching accent fill; unselected stay neutral. Used for language, subject, and topic filters.

### Cards / Containers
- **Corner Style:** 32px (large), 24px (medium), 40px (image frame).
- **Background:** neutral base (#EAE8E4) for neutral cards; light→full accent gradient for subject cards (e.g. `#8AB4A0 → #5A7A68` for sage).
- **Shadow Strategy:** the large clay shadow; colored cards tint the shadow toward the accent's own dark hue.
- **Border:** 1px glazed white edge.
- **Internal Padding:** 24–32px.

### Inputs / Fields
- **Style:** neutral clay surface, 1px glazed edge, 16–24px radius, Plus Jakarta Sans.
- **Focus:** brighten the highlight shadow and tighten the inset; preserve a visible focus ring (never `outline: none` without a replacement).
- **Error / Disabled:** use Dusty Rose for error text/border; disabled drops shadow and lowers opacity.

### Navigation
- **Style:** sticky top bar on the landing page; left sidebar (dark warm) inside the app. Clay pills for tiers/badges.
- **States:** current item uses the accent (lavender) or yellow-compatible highlight; hover brightens; focus-visible shows a 2px outline.
- **Mobile:** sidebar collapses to a hamburger; nav remains one tap away.

### Signature Component — Claymic Tutor Button
The voice entry point. A 44×44px clay circle in Dusty Lavender that pulses red (#dc2626) while listening. It is the one place saturated color is allowed, because it signals live recording. Keep it the single most recognizable control on the tutor screen.

## 6. Do's and Don'ts

### Do:
- **Do** build depth with the four-layer clay shadow + glazed white edge on every lifted surface.
- **Do** keep accents desaturated (#5A7A68 / #6B5E88 / #4A6E88 / #8A5250 / #8A7248); let saturation appear only on the live mic and active selection.
- **Do** use Fraunces for hero/section headings and Plus Jakarta Sans everywhere else, including all UI labels.
- **Do** preserve visible focus outlines and a 44×44px minimum touch target on every control.
- **Do** support the three accessibility modes (Cognitive, Low Vision, Hard of Hearing) and Urdu RTL out of the box.
- **Do** reserve the free experience as complete; show Premium as a fair, optional step up, never a wall.

### Don't:
- **Don't** make it toy-like or loud — no candy colors, no cartoon-shout noise that makes a parent distrust it.
- **Don't** lead with a cluttered SaaS feature grid or upsell badges; show the tutoring, don't list it.
- **Don't** treat English as the default — every surface must be language-first; Urdu must flip RTL.
- **Don't** build a cold, neon, dashboard-for-engineers look; warmth and legibility win for families.
- **Don't** flatten clay surfaces, drop the glazed border, or strip `outline` for the sake of "clean."
- **Don't** use a display serif (Fraunces) on buttons, nav, form controls, or data.
- **Don't** use pure white or the cream/sand AI-default as the page background; stay on `#EAE8E4` and its tinted blobs.
- **Don't** ship a component with only some states — default, hover, focus, active, disabled, and loading must all exist.
