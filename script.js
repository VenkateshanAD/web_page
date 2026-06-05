document.addEventListener('DOMContentLoaded', () => {

  // ========== LOADER ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 1500);
  });

  // ========== PARTICLES BACKGROUND ==========
  (function createParticles() {
    const container = document.getElementById('particles-bg');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      const colors = ['#6c3bf0', '#3b82f6', '#a855f7', '#06b6d4'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(particle);
    }
  })();

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ========== THEME TOGGLE ==========
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  let isDark = true;

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  });

  // ========== SEARCH ==========
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let searchTimeout;

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchOverlay.classList.toggle('active');
      if (searchOverlay.classList.contains('active')) searchInput.focus();
    }
    if (e.key === 'Escape') searchOverlay.classList.remove('active');
  });

  document.getElementById('searchClose').addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });

  const searchData = [
    { name: 'Golden Retriever', icon: 'fa-dog', category: 'Dogs' },
    { name: 'Persian Cat', icon: 'fa-cat', category: 'Cats' },
    { name: 'Cockatiel', icon: 'fa-dove', category: 'Birds' },
    { name: 'Betta Fish', icon: 'fa-fish', category: 'Fish' },
    { name: 'French Bulldog', icon: 'fa-dog', category: 'Dogs' },
    { name: 'Maine Coon', icon: 'fa-cat', category: 'Cats' },
    { name: 'Parakeet', icon: 'fa-dove', category: 'Birds' },
    { name: 'Angelfish', icon: 'fa-fish', category: 'Fish' },
    { name: 'Pet Food', icon: 'fa-bowl-food', category: 'Accessories' },
    { name: 'Pet Toys', icon: 'fa-baseball-ball', category: 'Accessories' },
    { name: 'Pet Beds', icon: 'fa-couch', category: 'Accessories' },
    { name: 'Grooming Kit', icon: 'fa-hand-sparkles', category: 'Accessories' },
    { name: 'Pet Grooming', icon: 'fa-cut', category: 'Services' },
    { name: 'Veterinary Care', icon: 'fa-stethoscope', category: 'Services' },
    { name: 'Pet Training', icon: 'fa-graduation-cap', category: 'Services' },
    { name: 'Pet Adoption', icon: 'fa-hand-holding-heart', category: 'Services' }
  ];

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.toLowerCase().trim();
    if (!query) { searchResults.innerHTML = ''; return; }
    searchTimeout = setTimeout(() => {
      const results = searchData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
      searchResults.innerHTML = results.length
        ? results.map(r =>
          `<div class="search-result-item">
              <i class="fas ${r.icon}"></i>
              <div><strong>${r.name}</strong><br><small>${r.category}</small></div>
            </div>`
        ).join('')
        : '<div class="search-result-item">No results found</div>';
    }, 300);
  });

  // ========== HERO 3D TILT ==========
  const heroCard = document.getElementById('hero3DCard');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ========== COUNTER ANIMATION ==========
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      let current = 0;
      const increment = target / 60;
      const update = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };
      update();
    });
  }

  // ========== SCROLL REVEAL ==========
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .pet-card-item, .accessory-card, .service-card, .contact-info, .contact-form-wrapper, .hero-text, .hero-visual');
    reveals.forEach(el => {
      el.classList.add('reveal');
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
    // trigger counter on hero visibility
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const rect = heroStats.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && !heroStats.dataset.counted) {
        heroStats.dataset.counted = 'true';
        animateCounters();
      }
    }
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ========== PET FILTER ==========
  const filterButtons = document.querySelectorAll('.filter-btn');
  const petCards = document.querySelectorAll('.pet-card-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      petCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ========== GALLERY SLIDER ==========
  (function gallery() {
    const track = document.getElementById('galleryTrack');
    const slides = track.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const dotsContainer = document.getElementById('galleryDots');
    let current = 0;

    if (!slides.length) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = index;
      if (current < 0) current = slides.length - 1;
      if (current >= slides.length) current = 0;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let autoSlide = setInterval(() => goTo(current + 1), 4000);
    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    });
  })();

  // ========== SHOPPING CART ==========
  let cart = [];
  const cartBtn = document.getElementById('cartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  cartBtn.addEventListener('click', () => openCart());
  cartClose.addEventListener('click', () => closeCart());
  cartOverlay.addEventListener('click', () => closeCart());

  function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('active'); }
  function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('active'); }

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      if (!name) return;

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      updateCart();
      openCart();
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => { btn.style.transform = ''; }, 200);
    });
  });

  function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartCount.textContent = totalItems;
    cartTotal.textContent = '$' + totalPrice.toFixed(2);

    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
        </div>`;
      return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <i class="fas fa-paw"></i>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x ${item.qty}</p>
        </div>
        <button class="cart-item-remove" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  // ========== CONTACT FORM ==========
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      setTimeout(() => { btn.innerHTML = original; }, 2000);
      e.target.reset();
    }, 1500);
  });

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== ACTIVE NAV LINK ==========
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ========== SMOOTH SCROLL FOR NAV ==========
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        // close mobile nav
        const navCollapse = document.getElementById('navbarNav');
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ========== 3D TILT FOR ACCESSORY CARDS ==========
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
});
