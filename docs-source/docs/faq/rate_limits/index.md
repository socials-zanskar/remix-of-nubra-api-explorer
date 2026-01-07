---
hide:
  - navigation
  - toc
---

# Rate Limits & API Usage FAQs
Below are the most common questions related to Nubra’s REST and WebSocket API limits, order-rate caps, throttling behavior, per-IP rules, and how to request higher limits.
Click any question to expand the detailed answer.

---

## API Rate Limits & Caps

??? faq-question "What are the rate limits for Nubra’s REST and WebSocket endpoints?"
    Nubra currently enforces the following limits:

    ### **REST APIs**

    - **Historical data**: **60 requests per minute**
    - **Trading APIs**: No SEBI-defined hard rate limit at the moment  
      *(practical guideline: ~10 order operations per second)*

    ### **WebSocket Market Data**

    Nubra WebSocket subscriptions operate on a **weight-based system**, not a fixed number of instruments.

    - Each WebSocket stream (Option Chain, Orderbook, OHLCV, Index, Greeks) consumes a defined **weight**
    - Your session has a **maximum total weight capacity**
    - The combined weight of all active subscriptions must remain within this limit

    **For the latest WebSocket weight limits and stream weights, refer to:**

    - **Python SDK WebSocket Limits**
    - **REST API WebSocket Subscription Limits**

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Are there separate limits for market data vs trading APIs?"
    **Yes.**

    - **Market Data (WebSocket)**  
      Governed by a **weight-based subscription model**, not instrument counts.

    - **Trading REST APIs:**  
      Recommended usage is around **10 operations per second** for stable performance.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What are the per-minute and per-second caps for each API category?"
    Summarized:

    | API Category | Limit |
    | --- | --- |
    | **Historical Data (REST)** | **60 req/min** |
    | **Live Market Data (WebSocket)** | Weight-based subscription system |
    | **Trading APIs (REST)** | **10 ops/sec** per IP |
    | **Orderbook / Index WebSocket** | Counted via WebSocket weight |

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Is the limit of 10 orders per second enforced per client or per IP?"
    The guideline of ~10 order operations per second is applied **per IP address**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Exceeding Limits & Throttling

??? faq-question "What happens if I exceed the allowed API rate limits?"
    If your application exceeds the allowed limit, the server returns a **structured error response** indicating that the request was rejected due to rate limits.

    This allows your system to:

    - Retry after a delay  
    - Queue requests  
    - Notify users gracefully  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What is the throttling or cooldown period after hitting limits?"
    **There is no automated cooldown or throttling policy.**

    If you exceed the limit:

    - The API simply returns an error for that request.  
    - You can retry after a short delay of your choosing.  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Requesting Higher Capacity

??? faq-question "How can I request a higher order-placement limit?"
    For cases where you need higher throughput:

    - Contact **Nubra support** directly  
    - Provide details of your use case, expected load, and trading volume  

    They may provide custom guidance or roadmap timelines.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

Click any category to navigate directly to its FAQ group.

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../general/">
  <h4>General</h4>
  <p>Onboarding, basics, and core concepts.</p>
</a>

<a class="faq-mini-card" href="../authentication/">
  <h4>Authentication & Login</h4>
  <p>OTP, TOTP, token lifecycle, session handling, login issues.</p>
</a>

<a class="faq-mini-card" href="../uat_live/">
  <h4>UAT & LIVE</h4>
  <p>Environment differences, testing flows, credentials.</p>
</a>

<a class="faq-mini-card" href="../instruments/">
  <h4>Instruments & Reference Data</h4>
  <p>ref_ids, expiries, master files.</p>
</a>

<a class="faq-mini-card" href="../rate_limits/">
  <h4>Rate Limits & API Usage</h4>
  <p>REST/WebSocket caps, throttling.</p>
</a>

</div>
