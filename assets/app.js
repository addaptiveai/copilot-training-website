/* copilot-training.com.au — shared behaviour for every page.
   Kept dependency-free and deferred; nothing here is required to render the
   page, so all copy and links are present in the initial HTML. */

(function () {
  'use strict';

  /* ── Analytics ─────────────────────────────────────────
     GA4 is loaded in the document head. Everything below fails silently if
     the tag is blocked, so tracking never breaks the page. */
  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }

  /* Any element carrying data-track fires a named event on click. Keeps the
     event taxonomy in the markup, next to the thing being measured. */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    track(el.getAttribute('data-track'), {
      link_text: (el.textContent || '').trim().slice(0, 100),
      link_url: el.getAttribute('href') || '',
      page_path: window.location.pathname
    });
  });

  /* ── Navigation ────────────────────────────────────────
     Hide on scroll down, reveal on scroll up. Lifted unchanged from the
     original single-page build. */
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var lastScroll = 0;
  var ticking = false;

  if (nav) {
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        nav.classList.toggle('scrolled', y > 24);
        if (y > 80) {
          var menuOpen = mobileMenu && mobileMenu.classList.contains('open');
          nav.classList.toggle('hidden', y > lastScroll && !menuOpen);
        } else {
          nav.classList.remove('hidden');
        }
        lastScroll = y;
        ticking = false;
      });
    }, { passive: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Services dropdown ─────────────────────────────────
     The dropdown is an enhancement only. Its links are real anchors that are
     already in the DOM, and the footer lists the same three pages, so a
     crawler or a browser with no JavaScript still reaches every service page. */
  var dropToggle = document.getElementById('services-toggle');
  var dropdown = document.getElementById('services-menu');

  if (dropToggle && dropdown) {
    var setOpen = function (open) {
      dropdown.setAttribute('data-open', String(open));
      dropToggle.setAttribute('aria-expanded', String(open));
    };

    dropToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(dropdown.getAttribute('data-open') !== 'true');
    });

    var wrapper = dropToggle.closest('.nav__item');
    wrapper.addEventListener('mouseenter', function () { setOpen(true); });
    wrapper.addEventListener('mouseleave', function () { setOpen(false); });

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown.getAttribute('data-open') === 'true') {
        setOpen(false);
        dropToggle.focus();
      }
    });

    /* Close once focus leaves the group, so keyboard users are not left with
       an open menu behind them. */
    wrapper.addEventListener('focusout', function (e) {
      if (!wrapper.contains(e.relatedTarget)) setOpen(false);
    });
  }

  /* ── Contact form ──────────────────────────────────────
     Posts to Web3Forms. Same handler as the original build, with start,
     success and failure events added. */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var formBtn = document.getElementById('form-btn');
    var formSuccess = document.getElementById('form-success');
    var formError = document.getElementById('form-error');
    var started = false;

    contactForm.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('form_start', { form_id: 'contact' });
    }, { once: false });

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      formBtn.textContent = 'Sending…';
      formBtn.disabled = true;
      formError.hidden = true;

      try {
        var res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(contactForm)
        });
        var json = await res.json();

        if (!json.success) throw new Error(json.message);

        /* Clear only the fields the person filled in. Hidden fields carry the
           Web3Forms key and routing, so they must survive a submission. */
        contactForm
          .querySelectorAll('input:not([type=hidden]):not([type=checkbox]), select, textarea')
          .forEach(function (el) { el.value = ''; });

        formSuccess.hidden = false;
        /* Registered as a key event in GA4, matching the other Addaptive sites. */
        track('form_submitted', { form_id: 'contact' });
      } catch (err) {
        formError.hidden = false;
        track('form_error', { form_id: 'contact' });
      } finally {
        formBtn.textContent = 'Send Enquiry';
        formBtn.disabled = false;
      }
    });
  }

  /* ── Insights article engagement ───────────────────────
     Fires once when the reader reaches the foot of the article body, which is
     a better read signal than time on page. */
  var articleBody = document.querySelector('[data-article-body]');

  if (articleBody && 'IntersectionObserver' in window) {
    var end = document.createElement('div');
    articleBody.appendChild(end);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        track('article_read', {
          article_slug: articleBody.getAttribute('data-article-body'),
          page_path: window.location.pathname
        });
        observer.disconnect();
      });
    }, { threshold: 0 });

    observer.observe(end);
  }
})();
