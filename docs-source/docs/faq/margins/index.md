---
hide:
  - navigation
  - toc
---

# Margins & Risk FAQs
Below are the most common questions related to margin calculations, real-time updates, collateral pledging, and interpreting aggressor limit errors.
Click any question to expand the detailed answer.

---

## Margin Calculation & Funds

??? faq-question "How do I calculate margin requirements using Nubra’s APIs?"
    You can calculate **margin requirements** using the **Funds API** (`portfolio.funds()`), which provides a live breakdown of cash, collateral, and margin usage across all segments. :contentReference[oaicite:0]{index=0}

    From the response:

    - `margin_used_deriv_traded` → margin used for executed derivative positions  
    - `margin_block_deriv_open_order` → margin blocked for open derivative orders  
    - `margin_used_eq_iday` → margin used for intraday equity positions  
    - `margin_blocked_eq_iday_open` → margin blocked for open intraday equity orders  
    - `total_margin_blocked` → total margin blocked (sum of all segments)  
    - `net_margin_available` → free margin available for new orders  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I retrieve user-specific margin or collateral details?"
    Use the **Funds API** (`portfolio.funds()`) — it returns detailed, **user-specific** cash and collateral information tied to your trading account (`client_code`). :contentReference[oaicite:1]{index=1}

    Key fields:

    - `total_collateral` → total value of pledged or margin-eligible holdings  
    - `start_of_day_collateral` → starting pledged margin at market open  
    - `iday_collateral_pledge` → intraday margin received from new pledges  
    - `iday_collateral_pledge_sell` → margin released from pledged holdings sold during the day  
    - `net_margin_available` → effective margin available to trade after accounting for all usage  

    Additionally, the **Holdings API** (`portfolio.holdings()`) provides per-stock collateral details:

    - `margin_benefit` → margin value contributed by a specific pledged stock  
    - `haircut` → percentage reduction applied when calculating eligible collateral  
    - `available_to_pledge` / `is_pledgeable` → shows what more can be pledged for margin benefit  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How does Nubra handle margin updates during live trading sessions?"
    Nubra’s margin and funds data are **updated in real time** during the session: :contentReference[oaicite:2]{index=2}

    - As new orders are placed → `margin_block_deriv_open_order` and `margin_blocked_eq_iday_open` increase.  
    - When orders execute → `margin_used_deriv_traded` increases.  
    - When positions are squared off or MTM changes → `mtm_deriv`, `net_margin_available`, and `total_collateral` adjust immediately.  
    - If you pledge or unpledge stocks intraday → `iday_collateral_pledge` and `iday_collateral_pledge_sell` reflect live updates.  

    The **Funds API** gives a real-time snapshot every time it’s called, and you can refresh it periodically or trigger it after trade executions.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Collateral & Pledging

??? faq-question "How can I confirm whether MTF or pledged margins are available via API?"
    Yes — Nubra exposes pledged and margin details through the **Holdings** and **Funds** APIs: :contentReference[oaicite:3]{index=3}

    **From Holdings API:**

    - `is_pledgeable` → indicates if a holding is eligible for margin (MTF or collateral)  
    - `margin_benefit` → amount of margin derived from pledged shares  
    - `available_to_pledge` → how much more can be pledged  
    - `haircut` → reduction applied to the pledged value  

    **From Funds API:**

    - `total_collateral` → total pledged collateral margin  
    - `start_of_day_collateral` / `iday_collateral_pledge` → confirm pledged margin status  
    - `net_margin_available` → total tradable margin after adding pledged + cash  

    These two APIs allow you to **verify MTF/pledged margin availability and utilization** in real time.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Risk & Errors

??? faq-question "How do I interpret “above aggressor limit” errors in UAT or LIVE?"
    An **“above aggressor limit”** error means your order price is too far **away from the prevailing market price**, violating NSE’s **price band or aggressor threshold**. :contentReference[oaicite:4]{index=4}

    Typical causes:

    - Limit buy placed **too far above** LTP  
    - Limit sell placed **too far below** LTP  

    Cross-check using:

    - `last_traded_price` (Holdings/Positions)  
    - `LTP` from Market Quotes API  

    If the price exceeds allowed aggressor limits, the order is rejected in both **UAT and LIVE**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

Click any category to navigate directly to its FAQ group.

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
