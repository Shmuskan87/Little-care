document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-testimonial-slider]");
  if (!slider) return;

  const slides = [...slider.querySelectorAll("[data-testimonial-slide]")];
  const dots = [...slider.querySelectorAll("[data-testimonial-dot]")];
  const previous = slider.querySelector("[data-testimonial-prev]");
  const next = slider.querySelector("[data-testimonial-next]");
  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = !active;
      slide.classList.toggle("is-active", active);
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  };

  previous?.addEventListener("click", () => showSlide(current - 1));
  next?.addEventListener("click", () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(current - 1);
    if (event.key === "ArrowRight") showSlide(current + 1);
  });

  showSlide(current);
});
