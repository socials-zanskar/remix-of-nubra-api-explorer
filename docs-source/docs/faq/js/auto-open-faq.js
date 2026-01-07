// Runs on every page load (supports navigation.instant)
document$.subscribe(function () {

  // Utility: find <details> below the hidden <h2> anchor
  function getDetailsFromHeading(h2) {
    let node = h2.nextSibling;
    while (node) {
      if (node.nodeType === 1 && node.tagName.toLowerCase() === "details") {
        return node;
      }
      node = node.nextSibling;
    }
    return null;
  }

  // Smooth scroll so the summary (question) is visible
  function smoothScrollToSummary(summary) {
    const yOffset = -80;  // adjust if needed
    const y = summary.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const tocLinks = document.querySelectorAll(".md-toc__link, .md-nav__link");

  tocLinks.forEach(link => {
    link.addEventListener("click", function () {
      const id = this.getAttribute("href").slice(1);
      const h2 = document.getElementById(id);
      if (!h2) return;

      const details = getDetailsFromHeading(h2);
      if (!details) return;

      const summary = details.querySelector("summary");

      // 1️⃣ CLOSE on clicking the same question (toggle)
      if (details.open) {
        details.open = false;

        setTimeout(() => {
          smoothScrollToSummary(summary);
        }, 50);

        return; // stop here (do not reopen)
      }

      // 2️⃣ Close all other dropdowns (accordion)
      document.querySelectorAll("details").forEach(d => {
        if (d !== details) d.open = false;
      });

      // 3️⃣ Open selected dropdown
      details.open = true;

      // 4️⃣ Scroll to summary (not deep inside content)
      setTimeout(() => {
        smoothScrollToSummary(summary);
      }, 50);
    });
  });
});
