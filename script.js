document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Mobile navigation
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const primaryNav = document.getElementById('primary-navigation');
  const navLinks = primaryNav ? primaryNav.querySelectorAll('a') : [];

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    primaryNav.classList.add('is-open');
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    primaryNav.classList.remove('is-open');
  }

  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
      const isOpen =
        hamburger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  /* ---------------------------------------------------------
     Smooth scrolling
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId.length < 2) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });

  /* ---------------------------------------------------------
     Navbar + Back to top
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  function handleScroll() {
    if (navbar) {
      navbar.classList.toggle(
        'is-scrolled',
        window.scrollY > 12
      );
    }

    if (backToTop) {
      backToTop.classList.toggle(
        'is-visible',
        window.scrollY > 420
      );
    }
  }

  handleScroll();

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  /* ---------------------------------------------------------
     Graceful fallback for missing images
  --------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback-img]').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        img.style.display = 'none';
      },
      { once: true }
    );
  });

  /* ---------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

});