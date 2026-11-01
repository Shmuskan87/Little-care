document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".section-heading, .split-layout > *, .clinic-layout > *, .appointment-layout > *, " +
      ".contact-layout > *, .info-card, .benefit-card, .blog-card, .faq-item, " +
      "main p:not(.eyebrow), .site-footer p, .steps li"
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
  const pageScrollControls = document.querySelector(".page-scroll-controls");
  if (header) {
    const updateHeaderShadow = () => {
      const hasScrolled = window.scrollY > 10;
      header.classList.toggle("is-scrolled", hasScrolled);
      pageScrollControls?.classList.toggle("is-visible", window.scrollY > 420);
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  document.querySelectorAll('.page-scroll-button[href="#top"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });

  document
    .querySelectorAll(".expertise .info-card, .why-choose .benefit-card")
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });

  const easeOut = (value) => 1 - Math.pow(1 - value, 3);

  const runCounter = (counter) => {
    const raw = counter.dataset.counter;
    const target = Number.parseFloat(raw);
    const decimals = (raw.split(".")[1] || "").length;

    if (prefersReducedMotion) {
      counter.textContent = decimals
        ? target.toFixed(decimals)
        : target.toLocaleString("en-IN");
      return;
    }

    const duration = 1800;
    const startedAt = performance.now();
    const frame = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const value = target * easeOut(progress);
      counter.textContent = decimals
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const counters = document.querySelectorAll("[data-counter]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  }
});
