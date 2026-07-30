/**
 * Revora Life Shopping Cart
 * Professional cart functionality with localStorage persistence
 */

(function() {
  'use strict';

  const CART_KEY = 'revora_cart';

  // Product catalog
  const PRODUCTS = {
    // Swiss Bionic Solutions
    'sbs-imrs-prime': {
      id: 'sbs-imrs-prime',
      name: 'iMRS Prime',
      brand: 'Swiss Bionic Solutions',
      category: 'full-body',
      price: 599500,
      priceDisplay: '$5,995.00 USD',
      shortDesc: 'Full-body PEMF mat system with advanced frequency programs and bio-feedback.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Best Seller'
    },
    'sbs-omnium1': {
      id: 'sbs-omnium1',
      name: 'Omnium1',
      brand: 'Swiss Bionic Solutions',
      category: 'full-body',
      price: 429500,
      priceDisplay: '$4,295.00 USD',
      shortDesc: 'Portable full-body PEMF system with tablet control and wellness apps.',
      image: 'assets/images/products/sbs-omnium1.jpg',
      badge: 'Portable'
    },
    'sbs-omnium1-combo': {
      id: 'sbs-omnium1-combo',
      name: 'Omnium1 Combo Set',
      brand: 'Swiss Bionic Solutions',
      category: 'full-body',
      price: 549500,
      priceDisplay: '$5,495.00 USD',
      shortDesc: 'Complete Omnium1 system with mat, pad, and spot applicator.',
      image: 'assets/images/products/sbs-omnium1-combo.jpg',
      badge: 'Value Pack'
    },
    'sbs-imrs-pad': {
      id: 'sbs-imrs-pad',
      name: 'iMRS Localized Pad',
      brand: 'Swiss Bionic Solutions',
      category: 'localized',
      price: 129500,
      priceDisplay: '$1,295.00 USD',
      shortDesc: 'Targeted PEMF pad for localized application and spot therapy.',
      image: 'assets/images/products/sbs-imrs-pad.jpg',
      badge: null
    },
    'sbs-smart-pulser': {
      id: 'sbs-smart-pulser',
      name: 'Smart Pulser',
      brand: 'Swiss Bionic Solutions',
      category: 'localized',
      price: 79500,
      priceDisplay: '$795.00 USD',
      shortDesc: 'Handheld localized PEMF device for targeted on-the-go therapy.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Portable'
    },
    // Olylife
    'ol-tera-p90': {
      id: 'ol-tera-p90',
      name: 'Tera-P90',
      brand: 'Olylife',
      category: 'full-body',
      price: 349500,
      priceDisplay: '$3,495.00 USD',
      shortDesc: 'Advanced full-body PEMF with terahertz and heat therapy integration.',
      image: 'assets/images/products/ol-tera-p90.jpg',
      badge: 'Popular'
    },
    'ol-tera-p90-plus': {
      id: 'ol-tera-p90-plus',
      name: 'Tera-P90 Plus',
      brand: 'Olylife',
      category: 'full-body',
      price: 429500,
      priceDisplay: '$4,295.00 USD',
      shortDesc: 'Premium Tera-P90 with enhanced programs and dual applicators.',
      image: 'assets/images/products/ol-tera-p90-plus.jpg',
      badge: 'Premium'
    },
    'ol-tera-pulse': {
      id: 'ol-tera-pulse',
      name: 'Tera-Pulse Localized',
      brand: 'Olylife',
      category: 'localized',
      price: 99500,
      priceDisplay: '$995.00 USD',
      shortDesc: 'Compact localized PEMF device for targeted therapy on the go.',
      image: 'assets/images/products/ol-tera-pulse.jpg',
      badge: 'Compact'
    },
    'ol-tera-pro': {
      id: 'ol-tera-pro',
      name: 'Tera-Pro Professional',
      brand: 'Olylife',
      category: 'professional',
      price: 599500,
      priceDisplay: '$5,995.00 USD',
      shortDesc: 'Clinical-grade professional system with multiple modalities.',
      image: 'assets/images/products/ol-tera-pro.jpg',
      badge: 'Clinical Grade'
    },
    // QiLife
    'ql-qicoil-mini': {
      id: 'ql-qicoil-mini',
      name: 'Qi Coil Mini',
      brand: 'QiLife',
      category: 'localized',
      price: 29900,
      priceDisplay: '$299.00 USD',
      shortDesc: 'Portable PEMF coil for personal use and travel. Frequency ready.',
      image: 'assets/images/products/ql-qicoil-mini.jpg',
      badge: 'Entry Level'
    },
    'ql-qicoil-3s': {
      id: 'ql-qicoil-3s',
      name: 'Qi Coil 3S',
      brand: 'QiLife',
      category: 'localized',
      price: 79500,
      priceDisplay: '$795.00 USD',
      shortDesc: 'Dual coil PEMF system with frequency app and amplified output.',
      image: 'assets/images/products/ql-qicoil-3s.jpg',
      badge: 'Top Rated'
    },
    'ql-qicoil-max': {
      id: 'ql-qicoil-max',
      name: 'Qi Coil Max',
      brand: 'QiLife',
      category: 'full-body',
      price: 159500,
      priceDisplay: '$1,595.00 USD',
      shortDesc: 'Full-body mat with integrated Qi Coil technology and app control.',
      image: 'assets/images/products/ql-qicoil-max.jpg',
      badge: null
    },
    'ql-resonant-wave': {
      id: 'ql-resonant-wave',
      name: 'Resonant Wave System',
      brand: 'QiLife',
      category: 'professional',
      price: 249500,
      priceDisplay: '$2,495.00 USD',
      shortDesc: 'Advanced frequency system with resonant wave amplifier and coils.',
      image: 'assets/images/products/ql-resonant-wave.jpg',
      badge: 'Advanced'
    },
    // SBS Components & Accessories
    'imrs-control-unit': {
      id: 'imrs-control-unit',
      name: 'iMRS Prime Control Unit',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 205300,
      priceDisplay: '$2,053.00 USD',
      shortDesc: 'Brushed aluminum casing with 10.2" touch screen',
      image: 'assets/images/accessories/80011.jpg',
      badge: null
    },
    'imrs-connector-box': {
      id: 'imrs-connector-box',
      name: 'iMRS Prime Connector Box',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 156800,
      priceDisplay: '$1,568.00 USD',
      shortDesc: 'Central connection hub with 6 applicator ports',
      image: 'assets/images/accessories/80016.jpg',
      badge: null
    },
    'imrs-20pin-cable': {
      id: 'imrs-20pin-cable',
      name: 'iMRS Prime 20-Pin Cable',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 3900,
      priceDisplay: '$39.00 USD',
      shortDesc: 'Direct cable connection',
      image: 'assets/images/accessories/80017.jpg',
      badge: null
    },
    'imrs-power-supply': {
      id: 'imrs-power-supply',
      name: 'Power Supply iMRS Prime 24V',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 9000,
      priceDisplay: '$90.00 USD',
      shortDesc: '24V power supply',
      image: 'assets/images/accessories/80020.jpg',
      badge: null
    },
    'exagon-mat': {
      id: 'exagon-mat',
      name: 'Exagon Applicator MAT',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 112300,
      priceDisplay: '$1,123.00 USD',
      shortDesc: 'Whole body PEMF applicator',
      image: 'assets/images/accessories/80012.jpg',
      badge: null
    },
    'exagon-fir': {
      id: 'exagon-fir',
      name: 'Exagon Applicator FIR',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 189400,
      priceDisplay: '$1,894.00 USD',
      shortDesc: 'Hybrid PEMF + Far Infrared applicator',
      image: 'assets/images/accessories/80013.jpg',
      badge: null
    },
    'exagon-pad': {
      id: 'exagon-pad',
      name: 'Exagon Applicator PAD',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 51100,
      priceDisplay: '$511.00 USD',
      shortDesc: 'Local applicator for targeted therapy',
      image: 'assets/images/accessories/80014.jpg',
      badge: null
    },
    'exagon-spot': {
      id: 'exagon-spot',
      name: 'Exagon Applicator SPOT',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 66500,
      priceDisplay: '$665.00 USD',
      shortDesc: 'Punctual applicator with Helmholtz-Effect',
      image: 'assets/images/accessories/80015.jpg',
      badge: null
    },
    'exagon-brain': {
      id: 'exagon-brain',
      name: 'Exagon Brain',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 95100,
      priceDisplay: '$951.00 USD',
      shortDesc: 'Brainwave entrainment system',
      image: 'assets/images/accessories/80027.jpg',
      badge: null
    },
    'exagon-sense': {
      id: 'exagon-sense',
      name: 'Exagon Sense',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 98300,
      priceDisplay: '$983.00 USD',
      shortDesc: 'HRV + SpO2 biofeedback sensor',
      image: 'assets/images/accessories/80029.jpg',
      badge: null
    },
    'brain-hygiene-clothes': {
      id: 'brain-hygiene-clothes',
      name: 'Brain Hygiene Clothes (10 pcs)',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 900,
      priceDisplay: '$9.00 USD',
      shortDesc: 'Disposable hygiene clothes',
      image: 'assets/images/accessories/80028.jpg',
      badge: null
    },
    'organizer-bag': {
      id: 'organizer-bag',
      name: 'iMRS Prime Organizer Bag',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 5400,
      priceDisplay: '$54.00 USD',
      shortDesc: 'Protective travel bag',
      image: 'assets/images/accessories/80021.jpg',
      badge: null
    },
    'travel-bag': {
      id: 'travel-bag',
      name: 'Exagon Applicator Travel Bag',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 5500,
      priceDisplay: '$55.00 USD',
      shortDesc: 'Travel bag for applicators',
      image: 'assets/images/accessories/80022.jpg',
      badge: null
    },
    'software-program-mode': {
      id: 'software-program-mode',
      name: 'Software: Program Mode',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 9900,
      priceDisplay: '$99.00 USD',
      shortDesc: 'Pre-programming user settings',
      image: 'assets/images/accessories/80031.jpg',
      badge: null
    },
    'software-split-mode': {
      id: 'software-split-mode',
      name: 'Software: Split Mode + iGuide',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 99300,
      priceDisplay: '$993.00 USD',
      shortDesc: 'Two PEMF systems in one',
      image: 'assets/images/accessories/80033.jpg',
      badge: null
    },
    'software-hybrid-mode': {
      id: 'software-hybrid-mode',
      name: 'Software: Hybrid Mode',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 146400,
      priceDisplay: '$1,464.00 USD',
      shortDesc: 'PEMF + FIR software upgrade',
      image: 'assets/images/accessories/80034.jpg',
      badge: null
    },
    'software-trial-mode': {
      id: 'software-trial-mode',
      name: 'Software: Trial Mode',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 307100,
      priceDisplay: '$3,071.00 USD',
      shortDesc: 'Clinical research software',
      image: 'assets/images/accessories/80035.jpg',
      badge: null
    },
    'warranty-12m': {
      id: 'warranty-12m',
      name: 'Carefree Plus (12 Months)',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 48300,
      priceDisplay: '$483.00 USD',
      shortDesc: '12-month warranty extension',
      image: 'assets/images/accessories/80050.jpg',
      badge: null
    },
    'warranty-24m': {
      id: 'warranty-24m',
      name: 'Carefree Plus (24 Months)',
      brand: 'Swiss Bionic Solutions',
      category: 'component',
      price: 60100,
      priceDisplay: '$601.00 USD',
      shortDesc: '24-month warranty extension',
      image: 'assets/images/accessories/80051.jpg',
      badge: null
    },
    'ol-galaxy-g-one': {
      id: 'ol-galaxy-g-one',
      name: 'Galaxy G-One',
      brand: 'OlyLife',
      category: 'full-body',
      price: 299500,
      priceDisplay: '$2,995.00 USD',
      shortDesc: 'Revolutionary multi-frequency wellness platform with immersive experience.',
      image: 'assets/images/products/ol-galaxy-g-one.jpg',
      badge: 'New'
    },
    'ol-shaken-massager': {
      id: 'ol-shaken-massager',
      name: 'Shaken 7-in-1 Smart Belt',
      brand: 'OlyLife',
      category: 'accessory',
      price: 24900,
      priceDisplay: '$249.00 USD',
      shortDesc: 'Deep-tissue percussion massager with multiple attachments.',
      image: 'assets/images/products/ol-shaken-massager.jpg',
      badge: 'Massage'
    },
    'ol-a9-anion': {
      id: 'ol-a9-anion',
      name: 'A9 Smart Anion BamaAir',
      brand: 'OlyLife',
      category: 'accessory',
      price: 39900,
      priceDisplay: '$399.00 USD',
      shortDesc: 'Smart air purification with negative ion generation.',
      image: 'assets/images/products/ol-a9-anion.jpg',
      badge: 'Air Wellness'
    },
    'ol-vitality-wand': {
      id: 'ol-vitality-wand',
      name: 'Vitality Wand',
      brand: 'OlyLife',
      category: 'localized',
      price: 59900,
      priceDisplay: '$599.00 USD',
      shortDesc: 'Handheld wellness wand for localized therapy. Compact and rechargeable.',
      image: 'assets/images/products/ol-vitality-wand.jpg',
      badge: 'Portable'
    },
    'ol-frost-gels': {
      id: 'ol-frost-gels',
      name: 'Frost Gels',
      brand: 'OlyLife',
      category: 'accessory',
      price: 50000,
      priceDisplay: '$500.00 USD',
      shortDesc: 'Topical support option from the OlyLife frequency product range.',
      image: 'assets/images/products/ol-frost-gels.jpg',
      badge: 'Wellness Add-on'
    },
    'ol-skyline-sl6': {
      id: 'ol-skyline-sl6',
      name: 'Skyline SL-6',
      brand: 'OlyLife',
      category: 'accessory',
      price: 50000,
      priceDisplay: '$500.00 USD',
      shortDesc: 'Compact everyday wellness and energy routine support product.',
      image: 'assets/images/products/ol-skyline-sl6.jpg',
      badge: 'Energy Support'
    },
    // iMRS Prime Packages
    'imrs-prime-basic': {
      id: 'imrs-prime-basic',
      name: 'iMRS Prime Basic',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 538400,
      priceDisplay: '$5,384.00 USD',
      shortDesc: 'Entry-level package with Control Unit, Exagon Mat and Pad.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Entry Level'
    },
    'imrs-prime-advanced': {
      id: 'imrs-prime-advanced',
      name: 'iMRS Prime Advanced',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 614800,
      priceDisplay: '$6,148.00 USD',
      shortDesc: 'Most popular package with Spot applicator and Program Mode.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Most Popular'
    },
    'imrs-prime-expert': {
      id: 'imrs-prime-expert',
      name: 'iMRS Prime Expert',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 714700,
      priceDisplay: '$7,147.00 USD',
      shortDesc: 'Professional package with iGuide and Split Mode software.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Professional'
    },
    'imrs-prime-hybrid': {
      id: 'imrs-prime-hybrid',
      name: 'iMRS Prime Hybrid',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 937600,
      priceDisplay: '$9,376.00 USD',
      shortDesc: 'Premium package with Far Infrared (FIR) technology.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Premium'
    },
    'imrs-prime-trial': {
      id: 'imrs-prime-trial',
      name: 'iMRS Prime Trial',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 1244700,
      priceDisplay: '$12,447.00 USD',
      shortDesc: 'Research-grade package with fully adjustable parameters.',
      image: 'assets/images/products/sbs-imrs-prime.jpg',
      badge: 'Research'
    },
    // Smart Pulser Packages
    'smart-pulser-basic': {
      id: 'smart-pulser-basic',
      name: 'Smart Pulser Basic Set',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 276900,
      priceDisplay: '$2,769.00 USD',
      shortDesc: 'Entry-level Smart Pulser with S-Mat full-body applicator.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Entry Level'
    },
    'smart-pulser-complete': {
      id: 'smart-pulser-complete',
      name: 'Smart Pulser Complete Set',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 307900,
      priceDisplay: '$3,079.00 USD',
      shortDesc: 'Complete set with S-Mat, S-Pad and S-Spot applicators.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Complete'
    },
    'smart-pulser-duo-sleep': {
      id: 'smart-pulser-duo-sleep',
      name: 'Smart Pulser Duo Sleep Set',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 401900,
      priceDisplay: '$4,019.00 USD',
      shortDesc: 'Dual control sleep system with two S-Mats.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Sleep System'
    },
    'smart-pulser-sbed': {
      id: 'smart-pulser-sbed',
      name: 'Smart Pulser S-Bed',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 129900,
      priceDisplay: '$1,299.00 USD',
      shortDesc: 'Professional bed system with integrated applicator.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Professional'
    },
    'smart-pulser-swrap': {
      id: 'smart-pulser-swrap',
      name: 'Smart Pulser S-Wrap',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 32900,
      priceDisplay: '$329.00 USD',
      shortDesc: 'Wrap-around applicator for targeted body therapy.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Wrap'
    },
    'smart-pulser-uno-sleep': {
      id: 'smart-pulser-uno-sleep',
      name: 'Smart Pulser Uno Sleep Set',
      brand: 'Swiss Bionic Solutions',
      category: 'package',
      price: 284900,
      priceDisplay: '$2,849.00 USD',
      shortDesc: 'Single sleep system with S-Mat applicator.',
      image: 'assets/images/products/sbs-smart-pulser.jpg',
      badge: 'Sleep'
    }
  };

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartUI();
  }

  function addToCart(productId, qty) {
    qty = parseInt(qty) || 1;
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty: qty });
    }
    saveCart(cart);
    openCartDrawer();
  }

  function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    renderCartDrawer();
  }

  function updateQty(productId, qty) {
    qty = parseInt(qty);
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty = qty;
      saveCart(cart);
      renderCartDrawer();
    }
  }

  function getCartTotal() {
    return getCart().reduce((sum, item) => {
      const product = PRODUCTS[item.id];
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function formatPrice(cents) {
    const amount = Number(cents || 0) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount) + ' USD';
  }

  function updateCartUI() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function showCartNotification(productName) {
    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const note = document.createElement('div');
    note.className = 'cart-notification';
    note.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <div>
          <div style="font-weight:600;">Added to cart</div>
          <div style="font-size:0.8rem;opacity:0.8;">${productName}</div>
        </div>
      </div>
    `;
    document.body.appendChild(note);

    requestAnimationFrame(() => note.classList.add('show'));
    setTimeout(() => {
      note.classList.remove('show');
      setTimeout(() => note.remove(), 300);
    }, 2500);
  }

  function openCartDrawer() {
    // Remove existing drawer to ensure fresh render
    const existingDrawer = document.querySelector('.cart-drawer');
    if (existingDrawer) {
      existingDrawer.remove();
    }
    
    // Create new drawer
    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer open';
    drawer.innerHTML = `
      <div class="cart-drawer-overlay" onclick="Cart.closeDrawer()"></div>
      <div class="cart-drawer-panel">
        <div class="cart-drawer-header">
          <h3>Your Cart</h3>
          <button class="cart-drawer-close" onclick="Cart.closeDrawer()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-drawer-body" id="cart-drawer-body"></div>
        <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
      </div>
    `;
    document.body.appendChild(drawer);
    
    // Render cart contents
    renderCartDrawer();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const drawer = document.querySelector('.cart-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      setTimeout(() => {
        drawer.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  function renderCartDrawer() {
    const cart = getCart();
    const body = document.getElementById('cart-drawer-body');
    const footer = document.getElementById('cart-drawer-footer');

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;color:var(--medium-grey);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:1rem;opacity:0.4;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Your cart is empty</p>
          <a href="suppliers.html" class="button button-primary" style="margin-top:1rem;" onclick="Cart.closeDrawer()">Browse Products</a>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = cart.map(item => {
      const product = PRODUCTS[item.id];
      if (!product) return '';
      return `
        <div class="cart-drawer-item">
          <div class="cart-drawer-item-img" style="background-image:url('${product.image}');"></div>
          <div class="cart-drawer-item-info">
            <div class="cart-drawer-item-brand">${product.brand}</div>
            <div class="cart-drawer-item-name">${product.name}</div>
            <div class="cart-drawer-item-price">${product.priceDisplay}</div>
          </div>
          <div class="cart-drawer-item-actions">
            <div class="cart-qty-control">
              <button onclick="Cart.updateQty('${item.id}', ${item.qty - 1})">-</button>
              <span>${item.qty}</span>
              <button onclick="Cart.updateQty('${item.id}', ${item.qty + 1})">+</button>
            </div>
            <button class="cart-remove-btn" onclick="Cart.remove('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    const subtotal = getCartTotal();
    const shipping = subtotal >= 5000 ? 0 : 1500;
    const total = subtotal + shipping;

    footer.innerHTML = `
      <div class="cart-drawer-summary">
        <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="cart-summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
        ${shipping > 0 ? `<div style="font-size:0.75rem;color:var(--brand-blue);margin-bottom:0.5rem;">Free shipping on orders over $50.00 USD</div>` : ''}
        <div class="cart-summary-row cart-summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
      </div>
      <a href="checkout.html" class="button button-primary" style="width:100%;text-align:center;" onclick="Cart.closeDrawer()">Proceed to Checkout</a>
      <button class="button button-secondary" style="width:100%;margin-top:0.5rem;" onclick="Cart.closeDrawer()">Continue Shopping</button>
    `;
  }

  // Expose global API
  window.Cart = {
    add: addToCart,
    remove: removeFromCart,
    updateQty: updateQty,
    getCart: getCart,
    getTotal: getCartTotal,
    getCount: getCartCount,
    clear: clearCart,
    openDrawer: openCartDrawer,
    closeDrawer: closeCartDrawer,
    PRODUCTS: PRODUCTS,
    formatPrice: formatPrice
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
  });

})();
