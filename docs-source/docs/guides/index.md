---
hide:
  - navigation
  - toc
---

# Nubra Developer Guides

End-to-end, opinionated guides to help you **design, test, and run production-grade
algorithmic trading systems** using Nubra’s APIs.

These guides are written in the **order real trading systems are built** — not just API reference order.

---

## Getting Started & Core Foundations

Everything you must understand **before touching real money**.

<div class="faq-card-grid">

<a class="faq-card horizontal" href="Authentication/">
  <div class="faq-card-text">
    <h3>Authentication & Login Flow</h3>
    <p>
      Automated TOTP login, session handling, and production-safe
      authentication with working code examples.
    </p>
  </div>
</a>

<a class="faq-card horizontal" href="UAT/">
  <div class="faq-card-text">
    <h3>UAT Environment</h3>
    <p>
      Test strategies safely in a sandbox before deploying to live markets.
    </p>
  </div>
</a>

<a class="faq-card horizontal" href="Instruments/">
  <div class="faq-card-text">
    <h3>Instrument Tracker</h3>
    <p>
      Instrument formats, expiries, strikes, and resolving ref_ids reliably.
    </p>
  </div>
</a>

</div>

---

## Market Data & Price Discovery

Fetching prices, depth, and snapshots efficiently.

<div class="faq-card-grid">

<a class="faq-card horizontal" href="MarketQuotes/">
  <div class="faq-card-text">
    <h3>Market Quotes & Order Book</h3>
    <p>
      LTPs, bid–ask depth, snapshots, and real-time price access.
    </p>
  </div>
</a>

<a class="faq-card horizontal" href="ExpiredOptions/">
  <div class="faq-card-text">
    <h3>Expired Options</h3>
    <p>
      Greeks, ohlcv and more data of Exipred Options using Historical Data API
    </p>
  </div>
</a>

</div>

---
## Real-Time Market Data & Streaming

Event-driven price feeds for **low-latency, reactive trading systems**.

<div class="faq-card-grid">

<a class="faq-card horizontal" href="OrderBook/">
  <div class="faq-card-text">
    <h3>Order Book Stream</h3>
    <p>
      Live bid–ask depth updates, tick-by-tick changes, and
      market microstructure signals via WebSocket streams.
    </p>
  </div>
</a>

</div>

---
## Order Placement & Execution

Placing, grouping, and managing orders programmatically.

<div class="faq-card-grid">

<a class="faq-card horizontal" href="PlaceOrder/">
  <div class="faq-card-text">
    <h3>Place Order</h3>
    <p>
      Examples for all supported order types with execution best practices.
    </p>
  </div>
</a>

<a class="faq-card horizontal" href="MultiOrder/">
  <div class="faq-card-text">
    <h3>Multi Order</h3>
    <p>
      Execute basket trades using a single API call.
    </p>
  </div>
</a>

<a class="faq-card horizontal" href="FlexiOrder/">
  <div class="faq-card-text">
    <h3>Flexi Basket Orders</h3>
    <p>
      Strategy-aware basket execution with hedge benefit,
      margin efficiency, and accurate position sizing.
    </p>
  </div>
</a>

</div>
