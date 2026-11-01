document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      items.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (!otherButton || !otherAnswer || otherItem === item) return;

        otherButton.setAttribute("aria-expanded", "false");
        otherItem.classList.remove("is-open");
        window.setTimeout(() => {
          if (!otherItem.classList.contains("is-open")) otherAnswer.hidden = true;
        }, 260);
      });

      button.setAttribute("aria-expanded", String(willOpen));

      if (willOpen) {
        answer.hidden = false;
        requestAnimationFrame(() => item.classList.add("is-open"));
      } else {
        item.classList.remove("is-open");
        window.setTimeout(() => {
          if (!item.classList.contains("is-open")) answer.hidden = true;
        }, 260);
      }
    });
  });
});
