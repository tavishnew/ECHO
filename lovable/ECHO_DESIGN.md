# ECHO — Design System Reference
**Voice-First AI Tutor for Children**
*Claymorphism + Minimalist*

---

## 1. Design Philosophy

ECHO's visual language blends **claymorphism** (soft, tactile 3D surfaces with layered shadows) with **minimalism** (cream backgrounds, generous whitespace, restrained color use). The result feels warm, safe, and trustworthy — like a friendly classroom, not a toy.

**Core principles:**
- Every surface feels physically real — cards have weight and lift
- Whitespace is generous; nothing competes for attention
- Color is deliberate and limited — purple as the single dominant accent
- Motion is subtle and purposeful — lifts, pulses, slides (never bouncy or distracting)
- No emoji anywhere in the UI

---

## 2. Color Palette

### Backgrounds
| Token | Hex | Usage |
|---|---|---|
| `bg-page` | `#EAE8E4` | Page/screen background (all pages) |
| `bg-card` | `#F5F4F1` | Standard card surface |
| `bg-card-alt` | `#F6F5F2` | Card surface (Tutor page) |
| `bg-card-light` | `#F8F7F5` | Card surface (Pricing, Auth) |
| `bg-card-warm` | `#F5F3EF` | Card surface (Rewards) |
| `bg-white` | `#FFFFFF` | Innermost surfaces, inputs hover state |
| `bg-nav` | `rgba(234,232,228,0.7)` | Frosted glass navbar (blur: 16px) |

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#6B5E88` | Purple — primary CTA, active states, headings accent |
| `primary-dark` | `#594B73` | Purple gradient end, hover darken |
| `primary-hover` | `#5b4f75` | Button hover state |
| `sage` | `#5A7A68` | Science, features, secondary accents |
| `sage-dark` | `#486354` | Gradient end for Science card |
| `sky` | `#4A6E88` | English, tertiary accent |
| `sky-dark` | `#39566B` | Gradient end for English card |
| `blush` | `#8A5250` | Low Vision accessibility, warning |
| `cream-gold` | `#8A7248` | Rewards, gold/level accents |
| `orange` | `#E88C5D` | Streak counter card background |
| `amber` | `#D48C45` | Low Resources accessibility card |

### Text Colors
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#1A1714` | Primary body text (darkest) |
| `ink-alt` | `#2A2824` | Primary text on card surfaces |
| `ink-deep` | `#3A3532` | Heading text on cream backgrounds |
| `ink-medium` | `#4A423D` | Secondary headings |
| `ink-muted` | `#6B6560` | Body text, descriptions |
| `ink-subtle` | `#8A837E` | Captions, timestamps, labels |
| `ink-faint` | `#D5D2CC` | Dividers, disabled elements |
| `muted-purple` | `#8C8697` | Auth form placeholder, tab inactive |

### Subject Card Gradients
```css
/* Mathematics */
background: linear-gradient(135deg, #7D6FA3, #594B73);

/* Science */
background: linear-gradient(135deg, #6A8F7A, #486354);

/* English */
background: linear-gradient(135deg, #5B85A4, #39566B);
```

### Overlay / Alpha Variants
```
Primary at 10%:  rgba(107, 94, 136, 0.10) — tinted icon backgrounds
Primary at 20%:  rgba(107, 94, 136, 0.20) — hover glow, orb ring
Primary at 25%:  rgba(107, 94, 136, 0.25) — button shadow
Ink at 5%:       rgba(26, 23, 20, 0.05)   — hairline borders
Ink at 8%:       rgba(26, 23, 20, 0.08)   — subtle shadow layer
Ink at 12%:      rgba(26, 23, 20, 0.12)   — main card shadow
Ink at 14%:      rgba(26, 23, 20, 0.14)   — large panel shadow (Auth)
White at 80%:    rgba(255, 255, 255, 0.80) — inner top highlight
White at 20%:    rgba(255, 255, 255, 0.20) — primary button inner highlight
```

---

## 3. Typography

### Font Families
```css
/* Display / Headings — all H1–H4 */
font-family: 'Fraunces', serif;
/* Weights: 400, 500, 600, 700 */
/* Optical size: 9..144 (variable) */

/* Body / UI — all paragraphs, labels, buttons, nav */
font-family: 'Plus Jakarta Sans', sans-serif;
/* Weights: 400, 500, 600, 700, 800 */
```

**Google Fonts import:**
```html
<link rel="stylesheet" media="print" onload="this.media='all'"
  href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
```

### Type Scale
| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| Hero H1 | Fraunces | `clamp(3rem, 5vw, 4.5rem)` | 700 | 1.1 | -0.02em |
| Section H2 | Fraunces | `clamp(2.25rem, 4vw, 3.5rem)` | 600–700 | 1.15 | -0.01em |
| Dashboard H1 | Fraunces | `2.25rem` → `3rem` (md) | 600 | 1.2 | default |
| Card H3 | Fraunces | `1.5rem` (24px) | 700 | 1.3 | default |
| Card H4 | Fraunces | `1.25rem` (20px) | 700 | 1.4 | default |
| Subheading | Fraunces | `1.125rem` (18px) | 600 | 1.4 | default |
| Pricing H1 | Fraunces | `3rem` → `4.375rem` (md) | 600 | 1.1 | -0.02em |
| Body Large | Plus Jakarta Sans | `1.25rem` (20px) | 400 | 1.6 | default |
| Body | Plus Jakarta Sans | `1.125rem` (18px) | 400–500 | 1.6 | default |
| Body Small | Plus Jakarta Sans | `0.9375rem` (15px) | 500 | 1.5 | default |
| Label | Plus Jakarta Sans | `0.875rem` (14px) | 600 | 1.4 | default |
| Caption | Plus Jakarta Sans | `0.75rem` (12px) | 600–700 | 1.4 | default |
| ALLCAPS label | Plus Jakarta Sans | `0.75rem` (12px) | 600–700 | 1 | 0.08em |

### Logo Treatment
```css
font-family: 'Fraunces', serif;
font-size: 1.5rem (navbar) / 2rem (sidebar) / 3rem (Auth);
font-weight: 800;
letter-spacing: -0.02em;
color: #6B5E88;
```

---

## 4. Spacing & Layout

### Page Structure
```
Navbar height:       80px (h-20)
Navbar padding-x:    24px (px-6) → max-width 1280px centered
Page top padding:    128px (pt-32) — below fixed navbar
Page bottom padding: 96px (pb-24)
Page padding-x:      24px (px-6)
Max content width:   1280px (max-w-7xl)
```

### Grid & Gaps
```
Section vertical gap:  160px (mb-40) — between major landing page sections
Card grid gap:         24px (gap-6) — standard
Card grid gap large:   32px (gap-8) — testimonials, feature cards
Column gap (lg):       40px (gap-10) — two-column layouts
```

### Dashboard Layout
```
Sidebar width:         260px, fixed, full-height
Sidebar padding:       24px (p-6)
Main content padding:  32px→40px / 32px (p-8 md:px-10 md:py-8)
Main max-width:        1152px (max-w-6xl)
Section spacing:       48px (space-y-12)
```

### Tutor Page Layout
```
Left navigator panel:  280px wide
Right context panel:   240px wide
Center panel:          flex-1 (fills remaining space)
All panels gap:        24px (gap-6)
All panels padding:    32px (p-8)
Top bar height:        ~80px (py-6)
```

### Card Padding
| Context | Padding |
|---|---|
| Feature card (landing) | `p-8` (32px) |
| Testimonial card | `p-10` (40px) |
| Pricing card | `p-8` md: `p-12` (32px → 48px) |
| Dashboard subject card | `p-8` (32px), min-height 160px |
| Dashboard session card | `p-6` (24px) |
| Auth form panel | `p-8` sm: `p-12` (32px → 48px) |
| Rewards stat card | `p-6` (24px) |
| Sidebar/panel | `p-6` (24px) |
| Quick pick row | `p-4` (16px) |

---

## 5. Border Radius

| Context | Value | Usage |
|---|---|---|
| Large panel / Auth card | `32px` | Auth form panel, pricing card, step cards |
| Standard card | `24px` | Feature cards, session cards, nav panel |
| Subject card | `32px` | Colored subject grid cards |
| Button pill / CTA | `999px` | All CTA buttons, language selector, class pills |
| Input field | `16px` | Form inputs, search fields |
| Icon container (small) | `16px` (rounded-2xl) | Nav icons, topic icon |
| Icon container (large) | `20px` (rounded-[20px]) | Feature icon pill |
| Tag / chip | `12px` (rounded-xl) | Level unlock tags, topic tags |
| Badge medallion | `50%` | Circular reward badges |
| Progress bar track | `999px` | All progress bars |
| Speech bubble (tutor/student) | `24px` with `rounded-tr-sm` / `rounded-tl-sm` | Chat messages |

---

## 6. Clay Shadow System

Claymorphism is built from **layered box-shadows** that give surfaces physical depth. Always combine an inset top-edge highlight (simulates light from above) with outward ambient and key shadows.

### Core Shadow Tokens

#### `clay-card` — Standard raised card
```css
box-shadow:
  0 2px 0 rgba(255, 255, 255, 0.8) inset,  /* top edge highlight */
  0 8px 24px rgba(26, 23, 20, 0.12),        /* main ambient shadow */
  0 2px 8px rgba(26, 23, 20, 0.08);         /* tight key shadow */
```

#### `clay-card-hover` — Card lifted on hover
```css
box-shadow:
  0 2px 0 rgba(255, 255, 255, 0.9) inset,
  0 12px 32px rgba(26, 23, 20, 0.15),
  0 4px 12px rgba(26, 23, 20, 0.1);
```

#### `clay-pill` — Small pill / stat chip
```css
box-shadow:
  0 1px 0 rgba(255, 255, 255, 0.8) inset,
  0 4px 12px rgba(26, 23, 20, 0.1),
  0 1px 4px rgba(26, 23, 20, 0.05);
```

#### `clay-inner` — Recessed / pressed surface (inputs, progress tracks)
```css
box-shadow:
  inset 0 2px 8px rgba(26, 23, 20, 0.06),
  inset 0 1px 2px rgba(26, 23, 20, 0.04),
  0 1px 0 rgba(255, 255, 255, 0.8);
```

#### `clay-panel` — Large containers (Auth card, deep panels)
```css
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.8),
  0 16px 48px rgba(26, 23, 20, 0.14),
  0 4px 16px rgba(26, 23, 20, 0.08);
```

#### `clay-btn-primary` — Purple primary button
```css
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.20),   /* top shine */
  inset 0 -2px 0 rgba(0, 0, 0, 0.15),         /* bottom press edge */
  0 8px 24px rgba(107, 94, 136, 0.30),        /* ambient glow */
  0 4px 8px rgba(107, 94, 136, 0.20);         /* key shadow */
```

#### `clay-btn-primary:hover`
```css
transform: translateY(-1px);
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.25),
  inset 0 -2px 0 rgba(0, 0, 0, 0.15),
  0 10px 28px rgba(107, 94, 136, 0.35),
  0 6px 12px rgba(107, 94, 136, 0.25);
```

#### `clay-btn-primary:active`
```css
transform: translateY(1px);
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.10),
  inset 0 -1px 0 rgba(0, 0, 0, 0.10),
  0 4px 12px rgba(107, 94, 136, 0.20),
  0 2px 4px rgba(107, 94, 136, 0.15);
```

#### `clay-btn-secondary` — Off-white secondary button
```css
background: #F4F3F1;
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.8),
  inset 0 -2px 0 rgba(0, 0, 0, 0.05),
  0 4px 12px rgba(26, 23, 20, 0.08);
```

#### `clay-input` — Form input field
```css
background: #EAE8E4;
box-shadow:
  inset 0 2px 4px rgba(26, 23, 20, 0.06),
  inset 0 4px 12px rgba(26, 23, 20, 0.04),
  0 1px 0 rgba(255, 255, 255, 1);
border: none;
```

#### `clay-input:focus`
```css
box-shadow:
  inset 0 2px 4px rgba(26, 23, 20, 0.08),
  inset 0 4px 12px rgba(107, 94, 136, 0.15),  /* purple tint on focus */
  0 1px 0 rgba(255, 255, 255, 1);
```

#### `clay-tab-active` — Selected tab pill
```css
background: #F4F3F1;
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.8),
  0 4px 12px rgba(26, 23, 20, 0.08);
color: #6B5E88;
```

#### `clay-tab-container` — Tab toggle track
```css
background: #EAE8E4;
box-shadow:
  inset 0 2px 4px rgba(26, 23, 20, 0.06),
  inset 0 4px 12px rgba(26, 23, 20, 0.04),
  0 1px 0 rgba(255, 255, 255, 1);
border-radius: 9999px;
padding: 6px;
```

#### `clay-image-wrapper` — Image card container
```css
border-radius: 32px;
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.6),
  inset 0 0 0 4px #F4F3F1,
  0 16px 48px rgba(26, 23, 20, 0.12);
```

#### `clay-mic-button` — Voice mic button (Tutor page)
```css
background: #6B5E88;
box-shadow:
  inset 0 2px 0 rgba(255, 255, 255, 0.60),
  0 6px 16px rgba(107, 94, 136, 0.30);
```

---

## 7. Animations & Motion

All motion follows the rule: **subtle, purposeful, never distracting**. Default easing is `ease` or `ease-in-out`. Duration range: 150ms (micro) → 500ms (entrance).

### Button Interactions
```css
/* Standard hover lift */
transform: translateY(-1px);   transition: 200ms ease;

/* Press / active */
transform: translateY(1px);    transition: 150ms ease;

/* Scale up (landing CTA) */
transform: scale(1.05);        transition: 200ms ease;

/* Scale down (active press) */
transform: scale(0.95);        transition: 150ms ease;
```

### Card Hover Lift
```css
/* Standard card lift */
transform: translateY(-4px);
box-shadow: clay-card-hover;
transition: transform 300ms ease, box-shadow 300ms ease;

/* Subtle lift (pricing, rewards stats) */
transform: scale(1.02);
transition: transform 300ms ease;

/* Session card */
transform: translateY(-4px);   /* -translate-y-1 */
transition: 300ms;
```

### Badge Hover
```css
transform: translateY(-8px) scale(1.05);   /* group-hover */
transition: transform 300ms ease;
```

### Arrow Reveal on Card Hover
```css
/* Hidden by default, slides in from left */
opacity: 0;
transform: translateX(-16px);   /* -translate-x-4 */

/* On group-hover */
opacity: 1;
transform: translateX(0);
transition: opacity 300ms, transform 300ms;
```

### Step Card Number Scale
```css
/* Decorative large number behind step icon */
transform: scale(1.1);   /* group-hover */
transition: transform 500ms ease;
```

### Voice Orb Pulse (Tutor Page — interval: 1500ms)
```css
/* Outer ring — expands and fades */
@keyframes orbPulse {
  0%   { transform: scale(1);   opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}
/* Inner ring — with 300ms delay */
@keyframes orbPulseInner {
  0%   { transform: scale(1);   opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
/* Both run over 1500ms ease-in-out, triggered via React state toggle */
```

### Listening Ring (Tutor Mic Button)
```css
/* Outer: animate-ping variant */
border: 3px solid rgba(107, 94, 136, 0.30);
border-radius: 9999px;
animation: ping 2s cubic-bezier(0,0,0.2,1) infinite;

/* Middle: animate-pulse */
border: 2px solid rgba(107, 94, 136, 0.50);
border-radius: 9999px;
animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
```

### Form Tab Switch (Auth Page)
```css
/* On active tab content mount */
animation: fadeInSlideUp 300ms ease;

@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Tailwind: animate-in fade-in slide-in-from-bottom-2 duration-300 */
```

### FAQ Accordion (Pricing Page)
```css
/* Collapsed */
max-height: 0;
opacity: 0;

/* Expanded */
max-height: 12rem; /* max-h-48 */
opacity: 1;
padding-bottom: 32px; /* pb-8 */

transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;
```

### Navigation Link Hover
```css
color transition: #6B6560 → #1A1714;
transition: color 150ms;
```

### Image / Hero Card Hover
```css
transform: scale(1.02);
transition: transform 500ms ease;
```

### Scroll Reveal (Landing Page)
```javascript
// IntersectionObserver — threshold: 0.15, rootMargin: '0px 0px -8% 0px'
// Adds 'is-visible' class on enter → triggers CSS fade + translate:
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease, transform 500ms ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Progress Bar Fill (Rewards XP bar)
```css
/* Gradient fill left to right */
background: linear-gradient(90deg, #6B5E88, #8A7248);
/* Pseudo-element top shine */
::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 50%;
  background: rgba(255,255,255,0.2);
  border-radius: inherit;
}
```

---

## 8. Component Patterns

### Clay Card (reusable)
```tsx
// Standard card surface
<div
  style={{
    backgroundColor: '#F5F4F1',
    borderRadius: '24px',
    boxShadow:
      '0 2px 0 rgba(255,255,255,0.8) inset, ' +
      '0 8px 24px rgba(26,23,20,0.12), ' +
      '0 2px 8px rgba(26,23,20,0.08)',
  }}
  className="p-8 transition-transform duration-300 hover:-translate-y-1"
>
  {/* content */}
</div>
```

### Primary CTA Button
```tsx
<button
  style={{
    backgroundColor: '#6B5E88',
    color: '#FFFFFF',
    borderRadius: '999px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    boxShadow:
      '0 2px 0 rgba(255,255,255,0.2) inset, ' +
      '0 8px 20px rgba(107,94,136,0.25), ' +
      '0 2px 8px rgba(107,94,136,0.15)',
  }}
  className="px-8 py-4 text-base transition-transform hover:scale-105 active:scale-95"
>
  Get started
</button>
```

### Secondary Button
```tsx
<button
  style={{
    backgroundColor: '#F3F1EC',
    color: '#1A1714',
    borderRadius: '999px',
    fontWeight: 600,
    boxShadow:
      '0 2px 0 rgba(255,255,255,0.8) inset, ' +
      '0 4px 12px rgba(26,23,20,0.08), ' +
      '0 1px 4px rgba(26,23,20,0.05)',
  }}
  className="px-8 py-4 text-base transition-transform hover:scale-105 active:scale-95"
>
  Watch demo
</button>
```

### Clay Input Field
```tsx
<input
  className="w-full px-5 py-4 text-[#4A4553] placeholder:text-[#A39CAE]"
  style={{
    backgroundColor: '#EAE8E4',
    borderRadius: '16px',
    border: 'none',
    outline: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow:
      'inset 0 2px 4px rgba(26,23,20,0.06), ' +
      'inset 0 4px 12px rgba(26,23,20,0.04), ' +
      '0 1px 0 rgba(255,255,255,1)',
    transition: 'box-shadow 200ms ease',
  }}
/>
/* On focus, add purple inner tint: inset 0 4px 12px rgba(107,94,136,0.15) */
```

### Pill / Status Badge
```tsx
// Active selected state
<div
  style={{
    backgroundColor: '#6B5E88',
    color: '#FFFFFF',
    borderRadius: '999px',
    boxShadow:
      '0 2px 0 rgba(255,255,255,0.2) inset, ' +
      '0 8px 24px rgba(26,23,20,0.12), ' +
      '0 2px 8px rgba(26,23,20,0.08)',
  }}
  className="px-6 py-2.5 text-sm font-semibold"
>
  Class 5
</div>

// Inactive state
<div
  style={{
    backgroundColor: '#F5F4F1',
    color: '#8A837E',
    borderRadius: '999px',
    boxShadow:
      '0 1px 0 rgba(255,255,255,0.8) inset, ' +
      '0 4px 12px rgba(26,23,20,0.1), ' +
      '0 1px 4px rgba(26,23,20,0.05)',
  }}
  className="px-6 py-2.5 text-sm font-semibold"
>
  Class 1
</div>
```

### Subject Card (colored with gradient)
```tsx
<div
  className="rounded-[32px] p-8 text-white relative overflow-hidden cursor-pointer
             transition-transform duration-300 group"
  style={{
    background: 'linear-gradient(135deg, #7D6FA3, #594B73)', // Math
    boxShadow: clayShadow,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
  }}
>
  {/* Blur decorations */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10
                  rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10
                  rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between min-h-[160px]">
    {/* icon row, title, chapter count */}
  </div>
</div>
```

### Navbar (frosted glass)
```tsx
<header
  style={{
    backgroundColor: 'rgba(234, 232, 228, 0.70)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  }}
  className="fixed top-0 w-full z-50 border-b border-[#1A1714]/5"
>
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    {/* logo | nav links | CTA */}
  </div>
</header>
```

### Chat Bubble (Tutor)
```tsx
{/* Tutor bubble (left-aligned) */}
<div
  className="max-w-[70%] bg-white p-5 rounded-[24px] rounded-tl-sm"
  style={{ boxShadow: clayShadow }}
>
  <p>Great! Let's explore Numbers Adventure...</p>
</div>

{/* Student bubble (right-aligned) */}
<div
  className="max-w-[70%] bg-[#F6F5F2] p-5 rounded-[24px] rounded-tr-sm"
  style={{ boxShadow: clayShadow }}
>
  <p>I want to learn about place values!</p>
</div>
```

---

## 9. Page-by-Page Breakdown

---

### Home Page (Landing)

**Layout:** Single scrollable column, `max-w-7xl mx-auto`, 6 sections + footer

**Sections & Key Specs:**

| Section | Layout | Padding | Notes |
|---|---|---|---|
| Navbar | Fixed, full-width, flex row | `h-20 px-6` | Frosted glass, border-bottom |
| Hero | Two-column flex, items-center | `pt-32 pb-24 px-6` | Text left, image card right |
| Features | Three-column grid | `mb-40` section gap | Cards with icon pill |
| How it Works | Four-column grid | `mb-40` | Numbered steps, icon top |
| Testimonials | Two-column grid | `mb-20` | Quote + star rating + avatar |
| Footer | Flex row, space-between | `py-12 px-6` | Logo, links, copyright |

**Hero:**
- H1: `clamp(3rem, 5vw, 4.5rem)` Fraunces, weight 700
- Badge pill above headline: sage green (#5A7A68), 14px Sparkles icon
- Sub-copy: `text-lg md:text-xl` Plus Jakarta Sans, color `#6B6560`
- Two CTAs: Primary purple pill + Secondary off-white pill
- Image card: `rounded-[24px]` clay card, `aspect-square`, `max-h-[500px]`
- Background decoration: radial gradient blur `from-primary/20 to-sage/20`, `blur-3xl`

**Feature Cards:**
- Icon: 56×56 pill, colored (primary/sky/sage), lucide icon 24px
- H3: 24px Fraunces bold
- Body: `text-[#6B6560]` 16px, `leading-relaxed`
- Hover: `translateY(-8px)` / `-translate-y-2`, duration 300ms

**How It Works Cards:**
- Large ghost number: `text-6xl` Fraunces, `text-[#EAE8E4]`, `mix-blend-multiply`, `opacity-50`
- Icon button: `48×48` off-white clay pill, purple icon 20px
- Group hover scales the ghost number: `scale-110`, duration 500ms

---

### Dashboard

**Layout:** Two-panel, `min-h-screen flex` — sidebar (260px) + main (flex-1)

**Sidebar:**
- Logo: 40×40 purple rounded-2xl mic icon + `text-2xl` Fraunces wordmark
- Nav items: `px-4 py-3.5 rounded-2xl` — active gets clay shadow + `bg-[#F5F4F1]`
- User badge: clay card bottom, avatar initial circle + name/class text
- Language selector: clay pill with ChevronDown, `bg-[#F5F4F1]`

**Main Content:**
- Header: Date label (uppercase, 12px, `#8A837E`) + H1 greeting (Fraunces, 36-48px)
- Stats row (top right): streak, XP, badges — clay pills with colored icons
- Class selector: horizontal scroll row, pill buttons, active = purple fill + `scale(1.05)`
- Subject grid: 3-col, colored gradient cards, `rounded-[32px]`, `min-h-[160px]`
- "Continue" section: 2-col grid of session cards — progress bar + colored play button
- "Today's picks": icon rows, `rounded-2xl`, `hover:bg-white` color transition

**Progress bar in session card:**
```css
track: bg-[#EAE8E4] h-2 rounded-full (clay-inner shadow)
fill:  height 100%, background = subject color, width = % complete
```

---

### Tutor Page (AI Voice Interface)

**Layout:** Three-panel flex, full-height `min-h-screen`

| Panel | Width | Bg | Border-radius |
|---|---|---|---|
| Left (navigator) | 280px | `#F6F5F2` | 24px |
| Center (voice) | flex-1 | transparent | — |
| Right (context) | 240px | `#F6F5F2` | 24px |

**Top bar:** `px-8 py-6`, back button (40×40 clay pill) + subject breadcrumb + language pill + settings icon

**Voice Orb (center):**
- Container: absolute-positioned, 256×256, centered
- Outer ring: `scale(1.8)` fade animation, 1500ms
- Inner ring: `scale(1.5)` fade, 300ms delay
- Orb core: white clay card, `overflow-hidden`, loads waveform image (fallback: purple gradient)

**Mic Button:**
- Base: `80×80` circle, `#6B5E88`, clay-mic shadow
- Ping ring: `inset-[-12px]`, `border-[3px] border-primary/30`, `animate-ping 2s`
- Pulse ring: `inset-[-4px]`, `border-[2px] border-primary/50`, `animate-pulse`

**Chat bubbles:** float above orb, right/left aligned, `max-w-[70%]`, clay shadow

**Right context panel:**
- Session timer: white clay inner card, `text-2xl` Fraunces, centered, `#6B5E88`
- Topic tags: colored `bg-/10 text-color` pills, `text-xs font-semibold`
- TTS slider: cream track h-4, purple fill left half, white clay thumb centered

---

### Pricing Page

**Layout:** Single column, `max-w-5xl mx-auto`, 4 sections

**Main pricing cards:** Two-column grid, `items-stretch`, `rounded-[32px] p-8 md:p-12`
- Free: `bg-[#F8F7F5]`, outlined CTA button, `border-2 border-[#EAE8E4]`
- Premium: same bg + `border-4 border-primary/10`, "Most popular" purple badge (absolute, `-translate-y-1/2`)
- Feature list: check icon in `rounded-full` colored bg, `text-sm` items, `space-y-4`
- Price display: `text-5xl` Fraunces bold + `/month` muted

**Accessibility cards:** 2×2 grid, `rounded-[24px] p-8`, clay shadow
- Each has: 56×56 icon pill in subject color + `text-xl` Fraunces heading + bullet list with color dot

**FAQ accordion:** `rounded-[24px]`, click toggles `max-h-48`+opacity, ChevronDown/Up icon

**CTA banner:** Full-width clay card, `border-t-4 border-blush/20`, decorative blur balls (absolute, `blur-3xl`)

---

### Rewards Page

**Layout:** Single column, `max-w-5xl mx-auto`, `space-y-12`

**Stats row (3-col):**
- Streak: `bg-[#E88C5D]` orange clay card, Flame icon (white/20 circle bg)
- XP: `bg-[#6B5E88]` purple clay card, Star icon
- Level: `bg-[#5A7A68]` sage clay card, inline progress bar (white fill, `width: 70%`)
- All: `hover:scale-[1.02]`, text-white, uppercase label 12px + Fraunces value 30px

**Level progress card:** full-width `bg-[#F5F3EF]`, XP fraction text (`#8A7248`), gradient bar `from-primary to-cream-gold`, top shine via `::after`

**Badge grid:** 4-col (2-col on mobile), 96×96 circle medallions
- Earned: colored bg, white icon 40px, clay-medallion shadow, `group-hover:-translate-y-2 scale-1.05`
- Locked: `bg-[#D5D3D0]` + `opacity-60 mix-blend-luminosity` + Lock icon badge (14px, bottom-right)

**Activity list:** clay card rows, `hover:bg-white` transition, colored 56×56 icon square, right-aligned XP bold + date/duration caption

**Leaderboard:** sticky right column card, 1st place card elevated (`-translate-y-2`, border-2 gold), 2nd/3rd/4th rows at full opacity → fading opacity-70

---

### Auth Page (Login / Signup)

**Layout:** Two-column flex, full-height, `max-w-[1280px]`

**Left column (50%) — decorative:**
- ECHO wordmark: `text-4xl–5xl` Fraunces bold, `#4A4553`
- Tagline: `text-xl` Plus Jakarta Sans, `#6B5E88`
- Image: `clay-image-wrapper` with `aspect-square max-w-[480px]`
- Trust chips: 3 clay pills, `CheckCircle2 / Globe2 / Sparkles` icons, `text-sm` body

**Right column (50%) — form panel:**
- Auth card: `clay-panel`, `max-w-[440px]`, `p-8 sm:p-12`, `rounded-[32px]`
- Tab toggle: `clay-tab-container` track, `clay-tab.active` / `clay-tab.inactive`
- Tab switch animation: `fade-in slide-in-from-bottom-2 duration-300`
- Input rows: `clay-input` fields, `px-5 py-4`, `rounded-[16px]`
- Password eye toggle: `Eye / EyeOff` icon, `#8C8697 → #6B5E88` on hover
- Primary CTA: `clay-btn-primary w-full py-4`, `border-radius: 999px`
- Divider: `h-px bg-[#D6D2CA]` with "or" text centered
- Google button: `clay-btn-secondary w-full py-4`, Google SVG logo
- Class/Language: 2-col `<select>` with `clay-input` + `ChevronDown` overlay (pointer-events-none)

---

## 10. Icon Library

All icons from **lucide-react**.

| Icon | Size | Usage |
|---|---|---|
| `Mic` | 16–36px | ECHO logo, sidebar nav, mic button |
| `Globe` / `Globe2` | 16–18px | Language selector |
| `ShieldCheck` | 24px | Safety feature card |
| `Sparkles` | 14–16px | Badge pill, auth chip |
| `BookOpen` | 20–26px | Today's picks, activity list |
| `Calculator` | 20–24px | Math subject icon |
| `FlaskConical` | 20–24px | Science subject icon |
| `Library` | 20–24px | English subject icon |
| `Flame` | 16–32px | Streak counter |
| `Star` | 20–32px | XP counter, testimonial rating |
| `Medal` | 16px | Badge count stat pill |
| `Play` | 16–18px | Resume session button |
| `ArrowRight` | 18px | CTA arrows, card hover action |
| `ChevronDown` | 16–20px | Language selector, FAQ, nav |
| `ChevronLeft` | 20px | Back button (Tutor) |
| `Settings` | 20px | Settings button (Tutor) |
| `Volume2` | 16px | TTS speed label |
| `Clock` | 18px | Session timer label |
| `List` | 18px | Topics covered label |
| `Trophy` | 24px | Leaderboard header |
| `Target` | 40px | First Session badge |
| `Zap` | 40px | Math Whiz badge |
| `Languages` | 40px | Multilingual badge |
| `Microscope` | 40px | Science Star badge |
| `GraduationCap` | 40px | Locked "All Subjects" badge |
| `Lock` | 14px | Locked badge overlay |
| `Brain` | 28px | Cognitive accessibility card |
| `Eye` / `EyeOff` | 20–28px | Password toggle, Low Vision card |
| `Ear` | 28px | Hard of Hearing card |
| `Wifi` | 28px | Low Resources card |
| `Check` | 14px | Pricing feature list |
| `CheckCircle2` | 20px | Auth trust chip |

---

## 11. Responsive Breakpoints

Using Tailwind's defaults:
| Name | Min Width | Notes |
|---|---|---|
| `sm` | 640px | Two-col step grid, input layout |
| `md` | 768px | Three-col subject/feature grids, 2-col testimonials, sidebar visible |
| `lg` | 1024px | Auth two-column, leaderboard sidebar |
| `xl` | 1280px | Max content width cap |

**Dashboard sidebar:** hidden on mobile (column-stacked), visible at `md:w-[260px]`  
**Auth left column:** `hidden lg:flex` — mobile shows only the form  
**Subject grid:** `grid-cols-1 md:grid-cols-3`  
**Step grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

---

## 12. Quick Reference Cheatsheet

```
Background:     #EAE8E4
Card surface:   #F5F4F1 (lighter warm cream)
Primary:        #6B5E88
Sage:           #5A7A68
Sky:            #4A6E88
Ink:            #1A1714
Ink muted:      #6B6560

Heading font:   Fraunces, serif   — weights 400/600/700
Body font:      Plus Jakarta Sans  — weights 400/500/600/700

Hero H1:        clamp(3rem, 5vw, 4.5rem) — lh 1.1
Section H2:     clamp(2.25rem, 4vw, 3.5rem)
Card H3:        1.5rem (24px)
Body:           1.125rem (18px)
Label:          0.875rem (14px)

Card radius:    24px
Large panel:    32px
Button/pill:    999px
Input:          16px

Clay shadow:
  0 2px 0 rgba(255,255,255,0.8) inset,
  0 8px 24px rgba(26,23,20,0.12),
  0 2px 8px rgba(26,23,20,0.08)

Hover lift:     translateY(-4px), 300ms ease
Button hover:   scale(1.05), 200ms ease
Button active:  scale(0.95), 150ms ease
Orb pulse:      scale(1.8) → opacity(0), 1500ms repeat
```
