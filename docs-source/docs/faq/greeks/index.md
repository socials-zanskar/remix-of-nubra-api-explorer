---
hide:
  - navigation
  - toc
---

# Options Greeks & Strategy APIs FAQs
Below are the most common questions related to real-time Options Greeks, multi-leg strategy execution, automation of adjustments, and latency details.
Click any question to expand the detailed answer.

---

## Real-Time Greeks & Analytics

??? faq-question "How do I fetch real-time Options Greeks from Nubra?"
    Nubra provides real-time Greeks through **two methods**:

    ---

    ### **Via WebSocket — for streaming live Greeks (recommended)**

    You can subscribe to the option instrument using the WebSocket API.

    Every tick delivered via the `on_option_data` callback includes:

    - **IV (Implied Volatility)**
    - **Delta**
    - **Gamma**
    - **Theta**
    - **Vega**
    - OI / OI change
    - LTP / LTP change
    - Volume
    - Timestamp
    - ATM strike
    - Full CE/PE chain snapshot

    **Example:**

    ```python
    socket.subscribe(["NIFTY:20250626"], data_type="option", exchange="NSE")
    ```

    Real-time updates flow through:

    ```python
    def on_option_data(msg):
        print("[OPTION]", msg)
    ```

    The WebSocket delivers **continuous Greeks updates** in every tick using `OptionData`:

    ```python
    class OptionData:
        iv: float
        delta: float
        gamma: float
        theta: float
        vega: float
    ```

    ---

    ### **Via REST — for snapshot Greeks**

    Use the Option Chain API:

    ```python
    nubra = InitNubraSdk(NubraEnv.PROD)
    mdInstance = MarketData(nubra)
    result = mdInstance.option_chain("NIFTY", exchange="NSE")
    ```

    This returns the entire option chain with CE/PE Greeks included.

    ---

    **WebSocket = real-time streaming**  
    **REST = single snapshot**

    Both offer complete Greeks for all strikes.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What are the latency and refresh intervals for Greeks data?"
    Nubra does **not** apply a fixed refresh interval or polling frequency to Greeks.

    Instead, Greeks are **pushed in real time** whenever the underlying market data updates.

    In other words:

    - **No fixed latency target is defined yet**
    - **No periodic refresh cycle**
    - Greeks are recalculated and streamed **immediately on every data update** (tick-by-tick)

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I use Greeks to calculate implied volatility or delta-neutral strategies?"
    Yes. Nubra gives you all data required for **IV modeling** or **delta-neutral hedging**:

    You receive:

    - IV  
    - Delta  
    - Gamma  
    - Theta  
    - Vega  
    - ATM strike  
    - Current underlying price  
    - Bid/Ask  
    - OI / Volume  
    - Timestamps  

    This allows you to build:

    - **Delta-neutral hedges**
    - **Gamma scalping systems**
    - **Theta decay models**
    - **IV crush / IV expansion strategies**
    - **Custom IV estimators**
    - **Black-Scholes recalculations** using streaming inputs

    Most users:

    - Consume real-time Greeks via WebSocket  
    - Use REST for strike-by-strike snapshots  
    - Build triggers based on delta, IV, skew, etc.  
    - Execute orders via create_order, multi_order, or flexi_order  

    All Greeks can be piped directly into strategy logic.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Strategy Execution & Adjustment

??? faq-question "Are multi-leg (straddle, strangle, spread) APIs supported directly?"
    Yes — through **Flexi Basket Order**, which is built specifically for multi-leg strategies.

    You can execute:

    - **Straddles**
    - **Strangles**
    - **Vertical spreads**
    - **Ratio spreads**
    - **Iron condors** (same underlying)
    - **Directional debit/credit spreads**
    - **Any multi-legged options structure**

    The Flexi Basket API allows:

    - Multiple legs  
    - Unified entry price  
    - Basket-level stop-loss  
    - Basket-level target  
    - Basket-level exit time  
    - Momentum triggers  
    - Qty multipliers  
    - OCO (SL/Target only one triggers)

    **Example:**

    ```python
    result = trade.flexi_order({
        "exchange": "NSE",
        "basket_name": "OptionStrategy",
        "orders": [
            {"ref_id": ce_ref, "order_qty": 1, "order_side": "ORDER_SIDE_BUY"},
            {"ref_id": pe_ref, "order_qty": 1, "order_side": "ORDER_SIDE_SELL"}
        ],
        "basket_params": {
            "order_side": "ORDER_SIDE_BUY",
            "price_type": "LIMIT",
            "entry_price": 72000,
            "multiplier": 2
        }
    })
    ```

    **Restrictions:**

    - All legs must have same underlying  
    - No cross-exchange baskets  
    - Modifications not supported  
    - Pricing rules enforced (SL < entry, Target > entry)

    Nubra also supports:

    - `multi_order` — plain multi-leg execution  
    - `flexi_order` — strategy-based execution  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I use Nubra’s APIs to automate option strategy adjustments?"
    Option strategy adjustments in Nubra depend on **what type of order you originally placed**:

    ---

    ### **Flexi Basket Strategies (Straddle, Strangle, Spreads, Iron Condor, etc.)**

    Flexi Basket orders **cannot be modified**.

    If your option strategy needs adjustment (e.g., adjust SL/target, roll strikes, hedge, exit, re-enter):

    **You must cancel the existing Flexi Basket and place a new basket order.**

    Because Flexi Basket treats all legs as a **unified strategy**, with shared:

    - Entry price  
    - SL  
    - Target  
    - Exit time  
    - Momentum trigger  

    **Workflow:**

    1. `cancel_flexi_order(basket_id)`  
    2. Place a new `flexi_order()` with updated legs  

    ---

    ### **Multi Order (multi-order basket)**

    Multi Order **supports modifying individual legs**.

    - Modify price/qty per leg → `modify_order()`  
    - No need to cancel whole basket  

    Exchange rules still apply.

    ---

    ### **Single-Leg Orders**

    Modify using `modify_order()` or cancel + replace.

    Works for LIMIT, SL, SL-M, etc.

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
