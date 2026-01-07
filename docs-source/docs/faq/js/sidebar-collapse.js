document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(
        ".md-nav__item.md-nav__item--section"
    );

    sections.forEach(section => {
        const header = section.querySelector(".md-nav__link");
        const subList = section.querySelector(".md-nav__list");

        if (!header || !subList) return;

        // Start collapsed
        subList.style.maxHeight = "0px";
        section.classList.remove("open");

        header.style.cursor = "pointer";

        header.addEventListener("click", () => {
            const isOpen = section.classList.contains("open");

            if (isOpen) {
                section.classList.remove("open");
                subList.style.maxHeight = "0px";
            } else {
                section.classList.add("open");
                subList.style.maxHeight = subList.scrollHeight + "px";
            }
        });
    });
});
