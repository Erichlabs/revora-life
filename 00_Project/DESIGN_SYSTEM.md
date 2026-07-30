# DESIGN SYSTEM
## Revora Life — Consolidated Visual Standards

---

## Design Principles

### 1. Clarity First
Every element serves a purpose. No decorative clutter. Information hierarchy is immediately apparent.

### 2. Breathing Room
Generous white space creates a premium, unhurried experience. Content has room to breathe.

### 3. Subtle Sophistication
Refined details convey quality without flashiness. Understated elegance over bold statements.

### 4. Trust Through Design
Professional, credible aesthetic builds confidence. Medical-grade precision meets wellness warmth.

### 5. Wellness Warmth
Inviting, not clinical. Human-centered design that feels approachable and supportive.

---

## Colour System

### Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--brand-blue` | #1E5AAF | rgb(30, 90, 175) | Primary CTAs, links, key actions |
| `--deep-blue` | #0F2B52 | rgb(15, 43, 82) | Footer, dark sections, emphasis |
| `--white` | #FFFFFF | rgb(255, 255, 255) | Backgrounds, text on dark |

### Secondary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--silver` | #F5F7FA | rgb(245, 247, 250) | Section backgrounds, cards |
| `--medium-grey` | #8A94A6 | rgb(138, 148, 166) | Secondary text, icons |
| `--dark-grey` | #2D3748 | rgb(45, 55, 72) | Body text, headings |

### Accent Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--wellness-green` | #38A169 | rgb(56, 161, 105) | Success states, wellness indicators |
| `--soft-green` | #E6F4EA | rgb(230, 244, 234) | Light backgrounds, subtle accents |
| `--energy-blue` | #4A90E2 | rgb(74, 144, 226) | Links, highlights, interactive |

### Colour Usage Rules

**Backgrounds:**
- Primary: `--white`
- Secondary: `--silver`
- Dark: `--deep-blue`
- Accent: `--soft-green` (sparingly)

**Text:**
- Headings: `--dark-grey` or `--deep-blue`
- Body: `--dark-grey`
- Secondary: `--medium-grey`
- On dark: `--white`

**CTAs:**
- Primary: `--brand-blue` background, white text
- Primary hover: `--deep-blue` background
- Secondary: transparent, `--brand-blue` border
- Secondary hover: `--brand-blue` background, white text

**Accents:**
- Success: `--wellness-green`
- Links: `--energy-blue`
- Hover: `--brand-blue`

### Accessibility

| Combination | Ratio | WCAG |
|-------------|-------|------|
| Brand Blue on White | 5.2:1 | AA ✓ |
| Dark Grey on White | 12.5:1 | AAA ✓ |
| White on Deep Blue | 14.2:1 | AAA ✓ |
| Medium Grey on White | 3.2:1 | Large text only |

---

## Typography System

### Font Families

**Primary:** Inter
- Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Usage: Body text, UI elements, general content
- Fallback: -apple-system, BlinkMacSystemFont, sans-serif

**Display:** Playfair Display
- Weights: 400 (Regular), 600 (SemiBold), 700 (Bold)
- Usage: Headlines, display text, premium emphasis
- Fallback: Georgia, serif

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| Display | Playfair | 48px / 3rem | 700 | 1.1 | -0.02em |
| H1 | Playfair | 40px / 2.5rem | 700 | 1.2 | -0.01em |
| H2 | Inter | 32px / 2rem | 600 | 1.3 | -0.01em |
| H3 | Inter | 24px / 1.5rem | 600 | 1.4 | — |
| H4 | Inter | 20px / 1.25rem | 600 | 1.4 | — |
| H5 | Inter | 18px / 1.125rem | 600 | 1.5 | — |
| H6 | Inter | 16px / 1rem | 600 | 1.5 | — |
| Body Large | Inter | 18px / 1.125rem | 400 | 1.7 | — |
| Body | Inter | 16px / 1rem | 400 | 1.7 | — |
| Small | Inter | 14px / 0.875rem | 400 | 1.6 | — |
| Eyebrow | Inter | 14px / 0.875rem | 600 | 1.5 | 0.05em |

### Typography Patterns

**Eyebrow Text:**
- Uppercase
- Letter-spacing: 0.05em
- Colour: `--brand-blue` or `--wellness-green`
- Usage: Section labels, category indicators

**Body Text:**
- Max-width: 65 characters per line (optimal)
- Line height: 1.7 for readability
- Margin-bottom: 1.5rem between paragraphs

---

## Spacing System

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.5rem / 8px | Tight spacing, inline elements |
| `--space-sm` | 1rem / 16px | Default element spacing |
| `--space-md` | 1.5rem / 24px | Component padding |
| `--space-lg` | 2rem / 32px | Section internal spacing |
| `--space-xl` | 3rem / 48px | Major component gaps |
| `--space-2xl` | 4rem / 64px | Section padding |
| `--space-3xl` | 6rem / 96px | Major section padding |

### Spacing Patterns

**Sections:**
- Default: `--space-3xl` (6rem) vertical padding
- Compact: `--space-2xl` (4rem) vertical padding
- Responsive: Reduces to `--space-xl` on mobile

**Containers:**
- Max-width: 1200px
- Horizontal padding: `--space-lg` (2rem)
- Mobile padding: 1.5rem

**Components:**
- Card padding: `--space-xl` (3rem)
- Form field margin: `--space-md` (1.5rem)
- Button padding: 1rem 2rem

---

## Layout Grid

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Grid Patterns

**Two-Column (Content + Image):**
```css
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
```

**Four-Column (Benefits):**
```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}
/* Responsive: 4 → 2 → 1 columns */
```

**Three-Column (Products):**
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
/* Responsive: 3 → 2 → 1 columns */
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--border-radius` | 8px | Buttons, cards, inputs |
| `--border-radius-lg` | 12px | Large cards, modals |
| `--border-radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 2px 4px rgba(0,0,0,0.05) | Subtle elevation |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.05) | Cards, dropdowns |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) | Modals, popovers |

---

## Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | 200ms ease | Hover states, color changes |
| `--transition-medium` | 300ms ease | Transform, opacity |
| `--transition-slow` | 500ms ease | Page transitions, reveals |

---

## Iconography

### Style
- Line icons, 2px stroke
- Rounded corners (where applicable)
- Consistent 24x24px viewBox
- Minimal, clear metaphors

### Icon Categories

**Wellness:** Heart, leaf, sun, moon, star
**Technology:** Signal, pulse, wave, zap
**Navigation:** Arrow, menu, close, chevron
**Communication:** Phone, email, message, chat
**Actions:** Download, share, search, filter

### Usage
- Size: 24px default, 20px small, 32px large
- Colour: Inherit from text or `--medium-grey`
- Spacing: 0.5rem from text

---

## Imagery

### Photography Style
- Clean, bright, natural light
- Lifestyle wellness scenes
- Authentic moments (not staged)
- Professional product shots
- High resolution (min 1200px wide)

### Image Treatment
- Bright, clean exposure
- Natural colour grading (no heavy filters)
- Slight warmth (not cold/clinical)
- Sharp focus
- Consistent aspect ratios

### Aspect Ratios
- Hero: 16:9 or 3:2
- Product: 1:1 or 4:3
- Lifestyle: 3:2 or 4:3
- Thumbnails: 1:1

### Placeholders
- Use descriptive text: [Image: description]
- Maintain aspect ratio with background colour
- Document required images in ASSET_CHECKLIST.md

---

## Animation Guidelines

### Philosophy
Subtle, purposeful, premium. Animations should enhance, not distract.

### Allowed Animations
- Fade transitions (300ms)
- Subtle hover lifts (transform: translateY)
- Button state changes (background, color)
- Loading skeletons

### Avoid
- Flashy effects
- Auto-playing video
- Excessive motion
- Distracting animations
- Long animation durations

### Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Respect `prefers-reduced-motion`
- Keep animations under 500ms

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 768px | Phones |
| Tablet | 768px - 1023px | Tablets, small laptops |
| Desktop | 1024px - 1199px | Laptops |
| Large Desktop | 1200px+ | Desktops, large screens |

### Responsive Patterns

**Typography Scale:**
- Desktop: 100% (base)
- Tablet: 95%
- Mobile: 90%

**Grid Collapse:**
- 4 columns → 2 columns → 1 column
- 3 columns → 2 columns → 1 column
- 2 columns → 1 column

**Navigation:**
- Desktop: Horizontal nav visible
- Mobile: Hamburger menu (future enhancement)

---

## Accessibility

### Colour Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text
- Test all colour combinations

### Focus States
- Visible focus indicators
- Consistent focus style
- Skip navigation link

### Semantic HTML
- Proper heading hierarchy
- Landmark elements
- ARIA labels where needed

### Motion
- Respect `prefers-reduced-motion`
- No auto-playing animations
- Subtle, non-distracting motion

---

*Design System consolidated from COLOUR_PALETTE.md, TYPOGRAPHY.md, BRAND_STYLE_GUIDE.md, and styles.css.*

*This system is reusable for future premium wellness/health technology projects.*
