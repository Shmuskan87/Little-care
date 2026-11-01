document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".about, .expertise, .conditions, .why-choose, .clinic, .testimonials, .faq, .blog, .appointment, .contact"
  );

  const paragraphItems = document.querySelectorAll(
    "main p:not(.eyebrow), .site-footer p"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => {
      item.classList.add("scroll-reveal");
      revealObserver.observe(item);
    });

    const paragraphObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    paragraphItems.forEach((paragraph, index) => {
      paragraph.classList.add("paragraph-reveal");
      paragraph.style.setProperty("--paragraph-delay", `${Math.min(index * 35, 280)}ms`);
      paragraphObserver.observe(paragraph);
    });
  }

  document.querySelectorAll("[data-counter]").forEach((counter) => {
    const target = Number(counter.dataset.counter);
    const decimal = target % 1 !== 0;
    const duration = 1200;
    const startedAt = performance.now();

    const updateCounter = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = decimal ? value.toFixed(1) : Math.floor(value).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  });
});
