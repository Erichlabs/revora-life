# KNOWLEDGE CAPTURE — TECHNICAL
## Revora Life — Extracted Technical Knowledge

---

## Component Patterns

### Layout Patterns

#### 1. Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```
**Use:** All content wrapping
**Responsive:** Padding reduces on mobile

#### 2. Section
```css
.section {
  padding: 6rem 0;
}
.section-alt {
  background-color: var(--silver);
}
```
**Use:** Major page sections
**Pattern:** White → Silver alternating for visual rhythm

#### 3. Content Grid
```css
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
```
**Use:** Two-column text + image layouts
**Responsive:** Stacks to 1 column on mobile
**Variant:** `direction: rtl` for image-left layouts

---

### UI Components

#### 1. Button System
```css
.button {
  display: inline-flex;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
}
.button-primary {
  background-color: var(--brand-blue);
  color: white;
}
.button-secondary {
  background: transparent;
  border: 2px solid var(--brand-blue);
  color: var(--brand-blue);
}
```
**Pattern:** Primary for main actions, secondary for alternatives
**States:** Hover darkens primary, fills secondary

#### 2. Card Pattern
```css
.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
```
**Use:** Products, benefits, testimonials
**Enhancement:** Hover lift effect `transform: translateY(-4px)`

#### 3. Form Pattern
```css
.form-group {
  margin-bottom: 1.5rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--medium-grey);
  border-radius: 8px;
}
```
**Use:** Contact forms, enquiry forms
**Validation:** HTML5 `required` attribute

---

### Content Components

#### 1. Hero Layout
```
.hero-grid (2 columns)
├── .hero-content (text)
│   ├── .eyebrow
│   ├── h1
│   ├── .hero-text
│   ├── .hero-actions (buttons)
│   └── .hero-proof (social proof)
└── .hero-visual (image/placeholder)
```
**Use:** Homepage, major landing pages
**Responsive:** Stacks, text centers on mobile

#### 2. Section Heading
```
.section-heading (centered, max-width 700px)
├── .eyebrow
├── h2
└── p (description)
```
**Use:** All major sections
**Pattern:** Eyebrow label + headline + supporting text

#### 3. Benefits Grid
```
.benefits-grid (4 columns → 2 → 1)
└── .benefit-card (x4)
    ├── .benefit-icon (emoji/SVG)
    ├── h3
    └── p
```
**Use:** Feature highlights, value props
**Responsive:** 4 → 2 → 1 columns

#### 4. Products Grid
```
.products-grid (3 columns → 2 → 1)
└── .product-card (x3)
    ├── .product-image
    ├── .product-content
    │   ├── h3
    │   ├── p
    │   └── .product-link
```
**Use:** Product catalog previews
**Enhancement:** Hover lift effect

#### 5. Testimonial Card
```
.testimonial-card
├── .testimonial-stars
├── .testimonial-text (italic)
├── .testimonial-author
└── .testimonial-role
```
**Use:** Social proof sections
**Style:** Subtle shadow, generous padding

#### 6. FAQ Item
```
.faq-item
├── .faq-question (h4)
└── .faq-answer (p)
```
**Use:** FAQ pages
**Pattern:** Border-bottom separator

---

## Responsive Techniques

### Breakpoint Strategy
```css
/* Desktop: 1200px+ */
/* Tablet: 768px - 1199px */
/* Mobile: < 768px */
```

### Mobile-First Approach
- Base styles are mobile
- Progressive enhancement for larger screens
- `min-width` media queries

### Common Responsive Patterns

#### Grid Collapse
```css
.benefits-grid {
  grid-template-columns: 1fr; /* Mobile */
}
@media (min-width: 768px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Navigation Hide
```css
.main-nav {
  display: none; /* Mobile */
}
@media (min-width: 768px) {
  .main-nav {
    display: flex;
  }
}
```

#### Typography Scale
```css
h1 {
  font-size: 2.25rem; /* Mobile */
}
@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}
```

---

## CSS Standards

### Variable Naming
```css
--brand-blue      /* Purpose + color */
--space-lg        /* Type + size */
--font-primary    /* Type + purpose */
```

### Class Naming (BEM-inspired)
```css
.block           /* Component */
.block-element   /* Child */
.block--modifier /* Variant */
```

### Property Order
1. Layout (display, position, grid, flex)
2. Box model (width, height, margin, padding)
3. Visual (background, border, shadow)
4. Typography (font, color, line-height)
5. Other (transition, transform)

---

## Asset Organization

### Current Structure
```
03_HTML/
├── index.html
├── styles.css
├── about.html
├── benefits.html
├── contact.html
├── faq.html
├── privacy.html
├── products.html
├── terms.html
└── what-is-pemf.html
```

### Recommended Asset Structure
```
assets/
├── css/
│   └── styles.css
├── js/
│   └── main.js (future)
├── images/
│   ├── products/
│   ├── lifestyle/
│   └── icons/
├── fonts/
│   └── (if self-hosting)
└── favicon/
    └── favicon.png
```

---

## Performance Decisions

### CSS
- Single stylesheet (reduces HTTP requests)
- CSS variables for theming (no preprocessor needed)
- Minimal unused styles

### Fonts
- Google Fonts with `display=swap`
- Preconnect to fonts.gstatic.com
- Only 2 font families

### Images
- Lazy loading: `loading="lazy"` attribute
- Placeholder strategy for MVP
- WebP consideration for production

### No JavaScript (Current)
- Pure HTML/CSS implementation
- Form handling via Formspree
- Future enhancements: accordion, carousel, etc.

---

## SEO Implementation

### On-Page SEO
- Unique title tags (50-60 chars)
- Unique meta descriptions (150-160 chars)
- Single H1 per page
- Logical heading hierarchy
- Image alt text
- Internal linking

### Technical SEO
- Semantic HTML5
- Schema.org markup (Organization)
- Open Graph tags
- Mobile-responsive
- Fast loading (minimal assets)

### Future SEO
- XML sitemap
- robots.txt
- Canonical URLs
- Structured data expansion

---

## Accessibility Decisions

### Colour Contrast
- Brand Blue on White: 5.2:1 (AA ✓)
- Dark Grey on White: 12.5:1 (AAA ✓)
- White on Deep Blue: 14.2:1 (AAA ✓)

### Focus Management
- Default browser focus (acceptable for MVP)
- Future: Custom focus indicators

### Semantic HTML
- Proper heading hierarchy
- Landmark elements (header, main, footer)
- Form labels associated with inputs

### ARIA (Future)
- Mobile navigation toggle
- Accordion expand/collapse
- Alert messages

---

## Reusable Patterns for Future Projects

### Premium Wellness Aesthetic
- Swiss-inspired clean design
- Medical-grade professionalism
- Blue + white + subtle green palette
- Inter + Playfair Display typography

### Component Library
- Hero layouts (split, centered)
- Card patterns (product, benefit, testimonial)
- Grid systems (responsive collapse)
- Form patterns (clean, accessible)
- Navigation patterns (sticky header, footer columns)

### CSS Framework
- CSS custom properties for theming
- Spacing scale (xs to 3xl)
- Colour system (primary, secondary, accent)
- Typography scale (consistent hierarchy)

---

*Technical knowledge extracted from styles.css, all HTML files, and QA_REPORT.md.*

*These patterns are reusable for future premium brand websites.*
