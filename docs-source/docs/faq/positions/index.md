---
hide:
  - navigation
  - toc
---

# Positions & Holdings FAQs
Below are the most common questions related to fetching live portfolio data, the difference between Day/Net positions and Holdings, and converting product types.
Click any question to expand the detailed answer.

---

## Portfolio Data Retrieval

??? faq-question "How can I fetch my live positions and holdings through the API?"
    **Positions (Intraday or F&O):**

    ```python
    from nubra_python_sdk.portfolio.portfolio_data import NubraPortfolio
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    nubra = InitNubraSdk(NubraEnv.PROD)
    portfolio = NubraPortfolio(nubra)
    result = portfolio.positions()

    for pos in result.portfolio.opt_positions:
        print(pos.symbol, pos.quantity, pos.pnl)
    ```

    **Holdings (Equity or Delivery):**

    ```python
    result = portfolio.holdings()

    for h in result.portfolio.holdings:
        print(h.symbol, h.quantity, h.current_value, h.net_pnl)
    ```

    These give you a **live snapshot** of both **open trading positions** and **demat holdings**, including current quantities, MTM, realised/unrealised P&L, and pledged status.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Position Types & Reconciliation

??? faq-question "What’s the difference between Day and Net positions in Nubra?"
    - **Day Positions (Intraday):**

        Represent trades opened and closed within the same trading day. They reflect **real-time intraday quantities**, MTM, and P&L for MIS (intraday) orders.

        You can view these via the **Positions API** (`portfolio.positions()`), under `stock_positions`, `fut_positions`, and `opt_positions`.

        Intraday mark-to-market (MTM) for these is also visible in the **Funds API** under:

        ```python
        result.port_funds_and_margin.mtm_eq_iday_cnc
        ```

    - **Net Positions:**

        Represent **overnight or carry-forward positions** (NRML/CNC) that persist beyond the current trading day.

        These appear in the **Holdings API** (`portfolio.holdings()`) as active holdings, including `invested_value`, `current_value`, and long-term P&L fields (`net_pnl`, `day_pnl`, `total_pnl`).

    **In short:**

    - `positions()` → intraday/day-level breakdowns  
    - `holdings()` → overnight/net positions and demat holdings

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "I just bought a stock for overnight — why does it show in Positions but not in Holdings?"
    When you buy a stock in **CNC/NRML** mode during market hours, it first appears under **Positions** (via `portfolio.positions()`) because the trade is executed but **not yet settled into your demat account**.

    Here’s what happens step by step:

    1. **Trade Execution:**

        Once your CNC (delivery) buy order is filled, the quantity and average price appear under:

        ```python
        result.portfolio.stock_positions
        ```

        This represents your *traded-but-not-settled* position.

    2. **End-of-Day (EOD) Settlement:**

        At the end of the trading day, your broker sends the buy trade for **T+1 or T+2 settlement** (depending on the exchange).

    3. **Holding Update (Next Day):**

        Once the shares are credited to your demat account, they move from `positions()` → to `holdings()`:

        ```python
        result.portfolio.holdings
        ```

        At that point, you’ll see them reflected as a **holding** with fields like `quantity`, `avg_price`, `current_value`, and `net_pnl`.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Management & Product Conversion

??? faq-question "How do I convert a position from MIS to NRML or vice versa?"
    You can convert MIS ↔ NRML by:

    1. **Closing the current position**, and  
    2. **Re-entering** it under the new product type.

    In API terms:

    - Fetch live position via `portfolio.positions()` (check `product` field — `MIS` or `NRML`).  
    - Place an **opposite-side order** to close the existing MIS/NRML position.  
    - Place a **new order** in the desired product type.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Why can’t I sell unpledged holdings on the same day?"
    When you **unpledge** a stock, it first moves from pledged margin pool → back to demat balance, but this **settlement completes on T+1**.

    Until then:

    - The quantity appears as **`available_to_pledge`** in the **Holdings API**, but not yet in your **free holdings balance**.  
    - You’ll see it under `t1_qty` (T+1 unsettled quantity).

    Hence, **you cannot sell unpledged holdings on the same day**, as they are not yet released for delivery sell.

    Once settlement completes, it will reflect under `quantity` and can then be sold.

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
