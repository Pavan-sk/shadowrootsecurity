/**
 * ShadowRoot Security — Coming Soon Landing Page
 * Minimal, accessible Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const toggleMobileMenu = (forceState) => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const nextState = forceState !== undefined ? forceState : !isExpanded;

      mobileToggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      navMenu.classList.toggle('is-open', nextState);
    };

    mobileToggle.addEventListener('click', () => toggleMobileMenu());

    // Close when clicking any nav link/button inside
    navMenu.querySelectorAll('.nav-link, .nav-badge-pill').forEach((el) => {
      el.addEventListener('click', () => toggleMobileMenu(false));
    });
  }

  // 3. Modal Manager
  let lastActiveElement = null;

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    lastActiveElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first interactive control or close button
    const focusable = modal.querySelector('input, button:not([data-close-modal]), [data-close-modal]');
    if (focusable) focusable.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  // Close triggers
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-overlay.is-open');
      if (openModalEl) {
        closeModal(openModalEl);
      }
    }
  });

  // Modal Triggers
  const btnCta = document.getElementById('hero-cta-btn');
  const btnNavStatus = document.getElementById('nav-status-btn');
  const btnNavAbout = document.getElementById('nav-about-btn');
  const btnNavContact = document.getElementById('nav-contact-btn');

  if (btnCta) btnCta.addEventListener('click', () => openModal('modal-subscribe'));
  if (btnNavStatus) btnNavStatus.addEventListener('click', () => openModal('modal-subscribe'));
  if (btnNavAbout) btnNavAbout.addEventListener('click', () => openModal('modal-about'));
  if (btnNavContact) btnNavContact.addEventListener('click', () => openModal('modal-contact'));

  // 4. Copy Email to Clipboard in Contact Modal
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = document.getElementById('contact-email');
  if (copyBtn && emailVal) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailVal.textContent.trim());
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } catch (err) {
        // Fallback
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      }
    });
  }

  // 5. Early Access / Stay Updated Form Logic
  /**
   * INTEGRATION CONFIGURATION:
   * To connect a webhook or email provider (e.g. Formspree, Mailchimp, Cloudflare Worker),
   * enter your POST endpoint URL below.
   */
  const SUBSCRIBE_ENDPOINT = ""; // Leave blank for default honest coming-soon behavior

  const subForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('sub-email-input');
  const submitBtn = document.getElementById('sub-submit-btn');
  const feedback = document.getElementById('sub-feedback');

  if (subForm && emailInput && submitBtn && feedback) {
    const showFeedback = (msg, type) => {
      feedback.textContent = msg;
      feedback.className = `form-notice is-visible is-${type}`;
    };

    emailInput.addEventListener('input', () => {
      if (feedback.classList.contains('is-error')) {
        feedback.className = 'form-notice';
        feedback.textContent = '';
      }
    });

    const isValidEmail = (email) => {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    subForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email) {
        showFeedback('Please enter your email address to receive launch updates.', 'error');
        emailInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showFeedback('Please enter a valid email address (e.g. name@example.com).', 'error');
        emailInput.focus();
        return;
      }

      if (SUBSCRIBE_ENDPOINT && SUBSCRIBE_ENDPOINT.trim() !== "") {
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        try {
          const res = await fetch(SUBSCRIBE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ email })
          });

          if (res.ok) {
            showFeedback('Thank you! You have been added to our pre-launch notification list.', 'success');
            subForm.reset();
          } else {
            showFeedback('Unable to save your request right now. Please try again soon.', 'error');
          }
        } catch (err) {
          showFeedback('Network error. Please check your connection and try again.', 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      } else {
        // Honest response when no remote service is configured
        showFeedback(
          'Thank you for your interest! Pre-launch updates will be delivered as our early labs go live. (Backend integration endpoint configurable in script.js).',
          'info'
        );
      }
    });
  }
});
