document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".md-nav__item--section");

  sections.forEach(section => {
    const header = section.querySelector(".md-nav__link");
    const list = section.querySelector(".md-nav");

    if (!header || !list) return;

    // Initially collapse
    list.style.display = "none";

    // Add visual indicator
    header.style.cursor = "pointer";
    header.insertAdjacentHTML("beforeend", ' <span class="caret">▾</span>');

    header.addEventListener("click", () => {
      const isOpen = list.style.display === "block";
      list.style.display = isOpen ? "none" : "block";
      header.querySelector(".caret").textContent = isOpen ? "▾" : "▴";
    });
  });
});