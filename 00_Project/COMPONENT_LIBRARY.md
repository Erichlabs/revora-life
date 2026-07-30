# COMPONENT LIBRARY
## Revora Life — Reusable UI Components

---

## Layout Components

### 1. Container
**Purpose:** Max-width wrapper for content

```html
<div class="container">
  <!-- Content -->
</div>
```

**CSS:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
}
```

**Usage:** Wrap all page sections

---

### 2. Section
**Purpose:** Major page sections with consistent padding

```html
<section class="section">
  <div class="container">
    <!-- Content -->
  </div>
</section>

<!-- Alternate background -->
<section class="section section-alt">
  <div class="container">
    <!-- Content -->
  </div>
</section>
```

**CSS:**
```css
.section {
  padding: 6rem 0;
}

.section-alt {
  background-color: var(--silver);
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
}
```

**Usage:** All major page sections

---

### 3. Content Grid
**Purpose:** Two-column text + image layouts

```html
<div class="content-grid">
  <div class="content-block">
    <h2>Heading</h2>
    <p>Text content...</p>
  </div>
  <div class="content-visual">
    <img src="image.jpg" alt="Description">
  </div>
</div>

<!-- Image on left -->
<div class="content-grid" style="direction: rtl;">
  <div class="content-block" style="direction: ltr;">
    <!-- Content -->
  </div>
  <div class="content-visual" style="direction: ltr;">
    <!-- Image -->
  </div>
</div>
```

**CSS:**
```css
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
```

**Usage:** About, Benefits, Products pages

---

### 4. Section Heading
**Purpose:** Centered section headers

```html
<div class="section-heading">
  <p class="eyebrow">Category</p>
  <h2>Section Title</h2>
  <p>Supporting description...</p>
</div>
```

**CSS:**
```css
.section-heading {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 6rem;
}

.section-heading h2 {
  margin-bottom: 1.5rem;
}

.section-heading p {
  color: var(--medium-grey);
  font-size: 1.125rem;
}
```

**Usage:** Homepage sections, feature highlights

---

## UI Components

### 5. Button
**Purpose:** Primary and secondary actions

```html
<!-- Primary -->
<a href="/contact" class="button button-primary">Book Consultation</a>

<!-- Secondary -->
<a href="/learn" class="button button-secondary">Learn More</a>
```

**CSS:**
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease;
  cursor: pointer;
  border: none;
}

.button-primary {
  background-color: var(--brand-blue);
  color: white;
}

.button-primary:hover {
  background-color: var(--deep-blue);
}

.button-secondary {
  background-color: transparent;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
}

.button-secondary:hover {
  background-color: var(--brand-blue);
  color: white;
}
```

**Usage:** CTAs, form submissions, navigation

---

### 6. Card
**Purpose:** Content containers

```html
<!-- Product Card -->
<div class="product-card">
  <div class="product-image">
    <img src="product.jpg" alt="Product">
  </div>
  <div class="product-content">
    <h3>Product Name</h3>
    <p>Description...</p>
    <a href="/product" class="product-link">Learn More →</a>
  </div>
</div>

<!-- Benefit Card -->
<div class="benefit-card">
  <div class="benefit-icon">🌙</div>
  <h3>Sleep Better</h3>
  <p>Description...</p>
</div>

<!-- Testimonial Card -->
<div class="testimonial-card">
  <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
  <p class="testimonial-text">"Quote..."</p>
  <p class="testimonial-author">Name</p>
  <p class="testimonial-role">Role</p>
</div>
```

**CSS:**
```css
.product-card,
.benefit-card,
.testimonial-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 300ms ease;
}

.product-card:hover,
.benefit-card:hover,
.testimonial-card:hover {
  transform: translateY(-4px);
}
```

**Usage:** Products grid, benefits grid, testimonials

---

### 7. Form Elements
**Purpose:** Contact and enquiry forms

```html
<form class="contact-form">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5"></textarea>
  </div>
  
  <button type="submit" class="button button-primary">Send</button>
</form>
```

**CSS:**
```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--medium-grey);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 200ms ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--brand-blue);
}

.contact-form {
  background-color: var(--silver);
  padding: 3rem;
  border-radius: 8px;
}
```

**Usage:** Contact page, enquiry forms, consultation booking

---

## Content Components

### 8. Hero
**Purpose:** Homepage and landing page heroes

```html
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-content">
      <p class="eyebrow">Premium Wellness</p>
      <h1>Main Headline</h1>
      <p class="hero-text">Supporting description...</p>
      <div class="hero-actions">
        <a href="/primary" class="button button-primary">Primary CTA</a>
        <a href="/secondary" class="button button-secondary">Secondary CTA</a>
      </div>
      <div class="hero-proof">
        <span class="stars">⭐⭐⭐⭐⭐</span>
        <span>Social proof text</span>
      </div>
    </div>
    <div class="hero-visual">
      <img src="hero.jpg" alt="Hero image">
    </div>
  </div>
</section>
```

**CSS:**
```css
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, white 0%, var(--silver) 100%);
  padding: 6rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.hero-text {
  font-size: 1.125rem;
  color: var(--medium-grey);
  margin-bottom: 3rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.hero-proof {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--medium-grey);
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero h1 {
    font-size: 2.25rem;
  }
}
```

**Usage:** Homepage, major landing pages

---

### 9. Eyebrow
**Purpose:** Section labels and category indicators

```html
<p class="eyebrow">Category Name</p>
```

**CSS:**
```css
.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--brand-blue);
  margin-bottom: 1.5rem;
}
```

**Usage:** Hero sections, section headings, card labels

---

### 10. FAQ Item
**Purpose:** FAQ page content

```html
<div class="faq-list">
  <div class="faq-item">
    <h4 class="faq-question">Question text?</h4>
    <p class="faq-answer">Answer text...</p>
  </div>
</div>
```

**CSS:**
```css
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--silver);
  padding: 2rem 0;
}

.faq-question {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dark-grey);
  margin-bottom: 1rem;
}

.faq-answer {
  color: var(--medium-grey);
}
```

**Usage:** FAQ page

---

## Navigation Components

### 11. Header
**Purpose:** Site header with navigation

```html
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="brand">Brand Name</a>
    <nav class="main-nav">
      <a href="/page1">Page 1</a>
      <a href="/page2">Page 2</a>
    </nav>
    <a href="/contact" class="header-cta">CTA Button</a>
  </div>
</header>
```

**CSS:**
```css
.site-header {
  background-color: white;
  border-bottom: 1px solid var(--silver);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.brand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--brand-blue);
}

.main-nav {
  display: flex;
  gap: 3rem;
}

.main-nav a {
  color: var(--dark-grey);
  font-weight: 500;
}

.header-cta {
  background-color: var(--brand-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .main-nav {
    display: none; /* Mobile menu future enhancement */
  }
}
```

**Usage:** All pages

---

### 12. Footer
**Purpose:** Site footer with navigation

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Brand</div>
        <p class="footer-about">Description...</p>
      </div>
      <div>
        <h4 class="footer-heading">Category</h4>
        <ul class="footer-links">
          <li><a href="/page">Page</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Brand. All rights reserved.</p>
    </div>
  </div>
</footer>
```

**CSS:**
```css
.site-footer {
  background-color: var(--deep-blue);
  color: white;
  padding: 6rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-heading {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

**Usage:** All pages

---

## Grid Systems

### 13. Benefits Grid
```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}

@media (max-width: 1024px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
```

### 14. Products Grid
```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
```

### 15. Testimonials Grid
```css
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
```

---

*Component Library extracted from styles.css and all HTML files.*

*These components are reusable for future premium brand websites.*
