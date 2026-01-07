---
hide:
  - navigation
  - toc
---

# Welcome to the Nubra API FAQs

<!-- ============================= -->
<!-- FAQ SEARCH BAR (WORKING)     -->
<!-- ============================= -->

This FAQ section gives you quick, accurate answers to the most common questions asked by developers, quantitative researchers, and trading teams integrating with Nubra’s API ecosystem.

Whether you're authenticating via OTP/TOTP, switching between UAT and LIVE, handling market data streams, or debugging REST/Python SDK responses — you’ll find concise, practical guidance here.

If you’re new to Nubra APIs, you may want to explore the full documentation:  
[https://nubra.io/products/api/docs](https://nubra.io/products/api/docs)

<!-- NEW: Search bar moved below documentation link -->
<input
  type="text"
  id="faq-search"
  placeholder="Search FAQs..."
  class="faq-search-input"
/>

<ul id="faq-results-list" style="display:none; margin: 0; padding-left: 1rem;"></ul>

---

# Getting Started & Core Concepts

<div class="faq-card-grid">

<a class="faq-card horizontal" href="general/">
  <img src="../assets/faq/general.png" alt="General" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>General</h3>
    <p>Basic concepts, onboarding, and introduction to the Nubra API ecosystem.</p>
  </div>
</a>

<a class="faq-card horizontal" href="authentication/">
  <img src="../assets/faq/authentication.png" alt="Authentication" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Authentication & Login</h3>
    <p>OTP, TOTP, token lifecycle, session handling, and login issues.</p>
  </div>
</a>

<a class="faq-card horizontal" href="uat_live/">
  <img src="../assets/faq/uat_live.png" alt="UAT LIVE" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>UAT & LIVE Environments</h3>
    <p>Differences, testing flows, credentials, and when to switch.</p>
  </div>
</a>

<a class="faq-card horizontal" href="instruments/">
  <img src="../assets/faq/instruments.png" alt="Instruments" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Instruments & Reference Data</h3>
    <p>ref_ids, master download, expiries, and contract format rules.</p>
  </div>
</a>

<a class="faq-card horizontal" href="rate_limits/">
  <img src="../assets/faq/rate_limits.png" alt="Rate Limits" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Rate Limits & API Usage</h3>
    <p>REST/WebSocket caps, throttling behavior, and best practices.</p>
  </div>
</a>

</div>

---

# Market Data & Trading

<div class="faq-card-grid">

<a class="faq-card horizontal" href="market_data/">
  <img src="../assets/faq/market_data.png" alt="Market Data" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Market Data & WebSocket</h3>
    <p>Snapshot vs streaming, tick frequency, depth, and subscriptions.</p>
  </div>
</a>

<a class="faq-card horizontal" href="historical/">
  <img src="../assets/faq/historical.png" alt="Historical Data" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Historical Data & Analytics</h3>
    <p>Intervals, corporate actions, adjustments, gaps, candle logic.</p>
  </div>
</a>

<a class="faq-card horizontal" href="orders/">
  <img src="../assets/faq/orders.png" alt="Orders" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Orders & Execution</h3>
    <p>Order types, flexi & basket orders, modify/cancel, common errors.</p>
  </div>
</a>

<a class="faq-card horizontal" href="margins/">
  <img src="../assets/faq/margins.png" alt="Margins" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Margins & Risk</h3>
    <p>Margin checks, aggressor limits, live updates, and risk rules.</p>
  </div>
</a>

<a class="faq-card horizontal" href="positions/">
  <img src="../assets/faq/positions.png" alt="Positions" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Positions & Holdings</h3>
    <p>Day vs net, conversions, holding logic, and reconciliation.</p>
  </div>
</a>

<a class="faq-card horizontal" href="greeks/">
  <img src="../assets/faq/greek.png" alt="Greeks" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Options Greeks & Strategy APIs</h3>
    <p>Real-time Greeks, IV/Delta strategies, multi-leg logic.</p>
  </div>
</a>

</div>

---

# Integrations & Troubleshooting

<div class="faq-card-grid">

<a class="faq-card horizontal" href="integrations/">
  <img src="../assets/faq/integration.png" alt="Integrations" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Integrations & Tools</h3>
    <p>Excel, TradingView, Postman, backtesting, platform support.</p>
  </div>
</a>

<a class="faq-card horizontal" href="algo/">
  <img src="../assets/faq/algo.png" alt="Algo" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Algo Registration & Compliance</h3>
    <p>SEBI guidelines, registration workflow, approvals, documentation.</p>
  </div>
</a>

<a class="faq-card horizontal" href="troubleshooting/">
  <img src="../assets/faq/troubleshooting.png" alt="Troubleshooting" class="faq-icon-sm">
  <div class="faq-card-text">
    <h3>Troubleshooting & Errors</h3>
    <p>Error decoding, debugging steps, rejection reasons, fixes.</p>
  </div>
</a>

</div>

---

## Can’t Find the Answer You’re Looking For?

We’re always here to help.  
Our support team typically responds quickly with detailed technical guidance.

[Need more assistance?](mailto:support@nubra.io){ .md-button .md-button--primary }

---

<!-- ============================= -->
<!-- FAQ SEARCH JS (WORKING)       -->
<!-- ============================= -->
<script>
document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("faq-search");
  const resultsList = document.getElementById("faq-results-list");

  const cards = document.querySelectorAll(".faq-card");

  const faqItems = Array.from(cards).map(card => {
    const title = card.querySelector("h3")?.innerText || "";
    const desc = card.querySelector("p")?.innerText || "";
    const link = card.getAttribute("href");
    return { title, desc, link };
  });

  searchInput.addEventListener("input", function () {
    const q = searchInput.value.toLowerCase().trim();

    if (!q) {
      resultsList.style.display = "none";
      resultsList.innerHTML = "";
      return;
    }

    const matches = faqItems.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );

    resultsList.style.display = "block";
    resultsList.innerHTML = matches.length
      ? matches
          .map(item => `<li style="margin:6px 0;">
                          <a href="${item.link}" style="font-size:0.9rem;">
                            ${item.title}
                          </a>
                        </li>`)
          .join("")
      : `<li style="opacity:0.6;">No matching FAQs found.</li>`;
  });

});
</script>