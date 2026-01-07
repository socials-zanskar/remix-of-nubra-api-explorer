---
hide:
  - navigation
  - toc
---

# Historical Data FAQs
Below are the most common questions related to Nubra’s historical data availability, adjusted candles, lookback limits, intervals, OI/Greeks, and troubleshooting missing or misaligned candles.
Click any question to expand the detailed answer.

---

## Data Coverage & Adjustments

??? faq-question "Are corporate actions such as splits and bonuses adjusted in the data?"
    **Yes**, historical data for **equities** is **corporate-action adjusted** to maintain price continuity after stock splits, bonuses, or dividends.

    This ensures your historical charts and backtests are aligned with real post-adjustment market values.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Is there a delay in historical data compared to live market feeds?"
    No — historical data is near real-time and **exchange-synced** at source.

    Once a candle closes (e.g., 1-minute or 1-day), it becomes immediately available via the API.

    For live feeds, use the **WebSocket APIs** instead of historical endpoints, as those provide **real-time tick streaming**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How does Nubra handle holidays and non-trading days in historical data?"
    Non-trading days (weekends and exchange holidays) are **automatically excluded** from historical data responses.

    This means:

    - Candles are only generated for **active trading sessions**.
    - Date ranges that include holidays will show **gaps**, not zero-volume candles — keeping your charts cleaner and true to market conditions.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Intervals & Lookback Limits

??? faq-question "What historical data intervals are available (1m, 5m, 1D, etc.)?"
    Nubra supports a wide range of candle intervals for historical data retrieval.

    You can request the following intervals through the API:

    | Interval | Description |
    | --- | --- |
    | `1s` | 1-second tick data |
    | `1m`, `2m`, `3m`, `5m`, `15m`, `30m` | Minute-level candles |
    | `1h` | Hourly candles |
    | `1d` | Daily candles |
    | `1w` | Weekly candles |
    | `1mt` | Monthly candles |

    This allows flexible use cases from **high-frequency backtesting** to **long-term portfolio analysis**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How far back can I fetch historical data for each interval type?"
    - **Intraday intervals (< 1 day):** up to **3 months** of historical data (at 1-second or minute resolution).  
    - **Daily and higher intervals (≥ 1 day):** up to **10 years** of data (for stocks and indices, in the PROD environment).  

    This ensures comprehensive coverage for both **short-term trading** and **long-term backtesting**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I access 1-second resolution data for more than 3 months?"
    By default, the API provides **1-second resolution data for the past 3 months**, which covers most backtesting and analytics use cases.

    However, Nubra maintains a **full tick-level historical archive** internally.

    If you require extended tick data (for model training, HFT simulation, or quant research), reach out to:

    **support@nubra.io** — include your use case and data range, and the team can enable or share a custom dataset.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Analytics & Troubleshooting

??? faq-question "Are Open Interest and Greeks available for historical analysis?"
    Nubra provides both **Open Interest (OI)** and **Greeks** as part of its historical options data.  
    This allows you to run backtests, study trend shifts, compare intraday vs. multi-day OI changes, and perform volatility-based strategy research using historical datasets.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Why might certain candles appear missing or misaligned?"
    Missing or misaligned candles usually occur when:

    - The selected **symbol or expiry has low/no trading volume** for that time frame.  
    - The **market was closed** during that period (weekend, holiday, circuit halt, etc.).  
    - The request spans a **rollover or expiry date** for derivatives.  
    - Your local time zone formatting differs from the exchange time zone (always use UTC for consistency).  

    If needed, you can forward such discrepancies to `support@nubra.io` with the instrument symbol and time range.

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
