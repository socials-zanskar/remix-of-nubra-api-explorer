---
hide:
  - navigation
  - toc
---

# Market Data & WebSocket FAQs
Below are the most common questions related to Nubra’s live market data, WebSocket streaming, tick frequency, depth levels, subscription limits, data accuracy, and troubleshooting missing ticks.
Click any question to expand the detailed answer.

---

## Data Delivery & Quality

??? faq-question "What type of market data does Nubra provide (snapshot vs streaming)?"
    Nubra provides two kinds of market data delivery:

    **REST-based Snapshot Data**
    - Use `quote()` or snapshot endpoints  
    - Returns current price, OI, depth, LTP, etc.  
    - Good for polling every few seconds or ad-hoc requests  

    **WebSocket-based Streaming Data**
    - Real-time ticks  
    - Option chain streaming  
    - Orderbook (20 levels)  
    - Underlying/index live feed  

    WebSocket = continuous live stream  
    REST = one-time snapshot

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How frequently are ticks or updates received from the WebSocket feed?"
    Ticks are streamed in **real time**, directly as updates occur at the exchange.

    - Index & stock updates are usually received **every 1s** during active trading hours.  
    - Option and futures ticks are delivered **on every trade or quote update**.  
    - Order book updates reflect the **top 20 bid/ask levels** as they change.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How accurate is Nubra’s real-time market data?"
    Yes — Nubra’s market data is **exchange-sourced and timestamp-synced** with the live NSE/BSE feeds.

    - Each tick includes an **exchange timestamp** in nanoseconds.  
    - Data streams are **validated and deduplicated** before delivery.  
    - Snapshot REST calls and WebSocket updates share the same reference stream for consistency.  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Are pre-open and post-market sessions supported?"
    Currently, Nubra’s live market data feed provides updates **only for active market hours**.  
    Pre-open auctions and post-market sessions are **not supported** in the live stream at this time.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Subscriptions & Limits

??? faq-question "What’s the maximum number of instruments I can subscribe to at once?"
    Nubra’s live market data currently does **not enforce a hard limit** on the number of instruments you can subscribe to simultaneously.

    - For **order book depth feeds**, a limit of **10,000 instruments per session** applies.  
    - Regular tick-level subscriptions have **no explicit cap**, but users should subscribe responsibly.  

    Additional safety limits may be added as the platform scales.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I unsubscribe from or modify my live data subscriptions?"
    At the moment, subscriptions **cannot be modified or unsubscribed dynamically**.

    Once a subscription is active, it stays active for the session.  
    Add/remove subscription management will be added in a future release.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What are the rate limits for Market Data APIs?"
    Nubra’s REST Market Data API currently enforces minimal throttling:

    **Historical Data**  
    - Up to **60 requests per minute**

    **Live Market Data**  
    - Supports **up to 10,000 active subscriptions per session**  
    - No other throttling currently applied

    Future updates may add granular limits.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Analytics & Calculations

??? faq-question "What level of market depth is available?"
    Nubra provides **up to 20 levels of market depth** on both **bid and ask** sides.

    Each level contains:

    - Price  
    - Quantity  
    - Number of orders  

    Example:

    ```python
    quote = mdInstance.quote(ref_id=69353, levels=20)
    print(len(quote.orderBook.bid), len(quote.orderBook.ask))  # 20 levels each
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I compute Open Interest or VWAP from Nubra data?"
    Yes — Nubra exposes all required fields for OI and VWAP calculations.

    Available through APIs:

    - `cumulative_oi`, `cumulative_call_oi`, `cumulative_put_oi`  
    - `tick_volume`, `cumulative_volume`, `cumulative_volume_premium`  

    These allow:

    - VWAP  
    - OI change across expiries  
    - OI/Volume heatmaps  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I generate OHLC candles from tick data?"
    To generate custom candles:

    1. Stream tick data using WebSocket (`on_market_data` or `on_orderbook_data` callback).  
    2. Aggregate tick values locally by time window (1s, 1m, 5m, etc.).  
    3. Compute:
        - **Open** = first tick price  
        - **High** = max price  
        - **Low** = min price  
        - **Close** = last tick price  
        - **Volume** = sum of traded quantity  

    Or use the built-in Historical Data API with intervals:

    ```python
    result = mdInstance.historical_data({
        "exchange": "NSE",
        "type": "STOCK",
        "values": ["ASIANPAINT"],
        "interval": "1m",
        "startDate": "2025-04-19T11:01:57.000Z",
        "endDate": "2025-04-24T06:13:57.000Z"
    })
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Troubleshooting

??? faq-question "What should I do if ticks are missing for some instruments?"
    If no ticks are received for a subscribed symbol, likely reasons include:

    - Illiquid instrument  
    - Wrong symbol or ref_id  
    - WebSocket reconnection event  
    - Market closed or pre-open session  

    **Fixes:**

    - Verify subscription format  
    - Check for `on_connect` callback  
    - Re-subscribe after reconnection  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../market_data/">
  <h4>Market Data & WebSocket</h4>
  <p>Snapshot vs streaming, tick frequency, depth, and subscriptions.</p>
</a>

<a class="faq-mini-card" href="../historical/">
  <h4>Historical Data & Analytics</h4>
  <p>Intervals, corporate actions, adjustments, gaps, candle logic.</p>
</a>

<a class="faq-mini-card" href="../orders/">
  <h4>Orders & Execution</h4>
  <p>Order types, flexi & basket orders, modify/cancel, common errors.</p>
</a>

<a class="faq-mini-card" href="../margins/">
  <h4>Margins & Risk</h4>
  <p>Margin checks, aggressor limits, live updates, and risk rules.</p>
</a>

<a class="faq-mini-card" href="../positions/">
  <h4>Positions & Holdings</h4>
  <p>Day vs net, conversions, holding logic, and reconciliation.</p>
</a>

<a class="faq-mini-card" href="../greeks/">
  <h4>Options Greeks & Strategy APIs</h4>
  <p>Real-time Greeks, IV/Delta strategies, multi-leg logic.</p>
</a>

</div>
