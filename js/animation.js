document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".section-heading, .split-layout > *, .clinic-layout > *, .appointment-layout > *, " +
      ".contact-layout > *, .info-card, .benefit-card, .blog-card, .faq-item, " +
      "main p:not(.eyebrow), .site-footer p"
  );

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((element) => {
      const siblingIndex = element.parentElement
        ? [...element.parentElement.children].indexOf(element)
        : 0;
      element.classList.add("reveal");
      element.style.setProperty("--delay", `${Math.min(siblingIndex, 4) * 90}ms`);
      observer.observe(element);
    });
  }

  const header = document.querySelector(".site-header");
  if (header) {
    const updateHeaderShadow = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  document.querySelectorAll("[data-counter]").forEach((counter) => {
    const target = Number(counter.dataset.counter);
    if (prefersReducedMotion) {
      counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString();
      return;
    }

    const duration = 1200;
    const startedAt = performance.now();
    const updateCounter = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = target % 1 !== 0 ? value.toFixed(1) : Math.floor(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(updateCounter);
    };
    requestAnimationFrame(updateCounter);
  });
});
