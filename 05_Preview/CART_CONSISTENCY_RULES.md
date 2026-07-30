# Revora Life Shopping Cart Consistency Rules

## 1. ADD TO CART BEHAVIOR
- **Rule**: Clicking "Add to Cart" on ANY product page must open the FULL cart drawer
- **Implementation**: All pages use `Cart.add()` which triggers `openCartDrawer()`
- **No small notifications**: The small toast notification is replaced with full drawer

## 2. CART DRAWER DESIGN
- **Width**: Fixed 420px max-width on desktop, 100% on mobile
- **Position**: Fixed right side, full height
- **Background**: White (#FFFFFF)
- **Shadow**: 0 4px 20px rgba(0,0,0,0.15)
- **Z-index**: 1000 (above all content)

## 3. CART ITEM DISPLAY
Each item in cart must show:
- Product image (thumbnail, 60x60px)
- Product name (font-weight: 600)
- Brand name (smaller, gray text)
- Price (formatted with USD)
- Quantity selector (+/- buttons)
- Remove button

## 4. CART FOOTER
- Subtotal calculation
- Shipping info (FREE or calculated)
- Total price
- "Proceed to Checkout" button (primary blue)
- "Continue Shopping" button (secondary/outline)

## 5. HEADER CART ICON
- Position: Top right, next to navigation
- Shows item count badge
- Click opens cart drawer
- Updates in real-time

## 6. CHECKOUT PAGE
- Must display all cart items with images
- Must allow item removal
- Must update totals dynamically
- Must link back to cart drawer

## 7. PRODUCT PAGES
All product pages must include:
- Cart icon in header
- cart.js script at bottom
- Consistent "Add to Cart" button styling
- Quantity selector (where applicable)

## 8. MOBILE RESPONSIVENESS
- Cart drawer: Full width on screens < 480px
- Touch-friendly buttons (min 44px)
- Swipe to close gesture
- Bottom sheet style on mobile

## 9. ERROR HANDLING
- If product not found in catalog, show error message
- If cart empty, show "Your cart is empty" message with CTA
- All prices must be validated before display

## 10. TESTING CHECKLIST
Before deployment, verify:
- [ ] Add to cart works on all product pages
- [ ] Cart drawer opens fully
- [ ] Items display with correct images
- [ ] Quantities can be adjusted
- [ ] Items can be removed
- [ ] Totals calculate correctly
- [ ] Checkout page shows all items
- [ ] Mobile experience is smooth
