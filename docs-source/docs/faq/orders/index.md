---
hide:
  - navigation
  - toc
---

# Orders & Execution FAQs
Below are the most common questions related to placing orders, Flexi & basket strategies, modifying/canceling orders, grouping & tagging orders, viewing history, interpreting rejections, and handling failures or timeouts in Nubra’s trading APIs.
Click any question to expand the detailed answer.

---

## Order Types, Placement, and Strategy

??? faq-question "What order types are supported by Nubra?"
    Nubra supports a full range of exchange-compliant order types, accessible via both the Python SDK and REST API:

    | Order Type | Description |
    | --- | --- |
    | **Regular** | Standard market or limit order |
    | **Stoploss (SL/SL-M)** | Order triggered when a price condition is met |
    | **Iceberg** | Large order split into smaller “visible” legs to reduce market impact |
    | **Flexi Basket** | Multi-leg basket executed as a unified strategy (options, hedges, etc.) |
    | **Multi Order** | Batch execution of multiple independent orders in a single request |

    Each can be placed as **MARKET** or **LIMIT**, with **DAY** or **IOC** validity.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I place, modify, or cancel an order using the API?"
    You can use the following SDK methods from the **Trading (V2)** module:

    | Function | Purpose |
    | --- | --- |
    | `create_order()` | Place a single order |
    | `multi_order()` | Place multiple independent orders |
    | `flexi_order()` | Place a multi-leg basket strategy |
    | `modify_order_v2()` | Change price/quantity of a pending order |
    | `cancel_orders_by_id()` / `cancel_orders([])` | Cancel one or more pending orders |
    | `cancel_flexi_order()` | Cancel a Flexi Basket order |
    | `get_order()` / `orders()` | Retrieve details of specific or all orders |
    | `get_flexi_order()` | Retrieve details of Flexi Basket orders |

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What types of multi-leg or basket orders can I place?"
    Yes. Use the **`multi_order()`** method to place **independent multiple orders** in one call.

    Alternatively, use **`flexi_order()`** to place **strategic multi-leg baskets** (e.g., straddle, strangle) that execute and manage as one entity.

    ```python
    result = trade.multi_order([
        {...},  # Order 1
        {...}   # Order 2
    ])
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What is a Flexi Order, and how does it differ from a regular order?"
    A **Flexi Order** (also known as a **Flexi Basket**) allows you to:

    - Combine multiple option/future legs into one strategy.  
    - Define shared parameters like **entry price**, **stop loss**, **target**, and **exit time** at the **basket level**.  
    - Apply **One-Cancels-Other (OCO)** logic — if target is hit, stop loss is cancelled automatically.

    Unlike multi orders, Flexi baskets are **executed and monitored as one unit**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I tag or group multiple orders for a strategy?"
    Use the `tag` field during order creation:

    ```python
    "tag": "straddle_1030am"
    ```

    You can then filter all related orders via:

    ```python
    trade.orders(tag="straddle_1030am")
    ```

    This is useful for multi-leg strategy tracking, reporting, and exits.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Order Management & Lifecycle

??? faq-question "Can Flexi Orders be modified after placement?"
    Not currently.

    Once a Flexi basket is placed, it cannot be modified — you can only **cancel** it via:

    ```python
    trade.cancel_flexi_order(basket_id=basket_id, exchange="NSE")
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What mandatory fields are required for modify-order requests?"
    Each modification request **must** include both the **exchange** and **order_type** fields, along with other key parameters depending on the order type:

    | Execution Type | Required Fields |
    | --- | --- |
    | **REGULAR (LIMIT)** | `exchange`, `order_type`, `order_price`, `order_qty` |
    | **STOPLOSS** | `exchange`, `order_type`, `order_price`, `order_qty`, `trigger_price` |
    | **ICEBERG** | `exchange`, `order_type`, `order_price`, `order_qty`, `leg_size` |

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I fetch details for a single Order ID?"
    Use:

    ```python
    result = trade.get_order(order_id=795)
    print(result.order_status, result.order_price, result.display_name)
    ```

    This returns a complete structure including order status, fill details, prices, and instrument metadata.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I query multiple Order IDs or filter orders?"
    Currently, you can:

    - Fetch **all orders** via `trade.orders()`  
    - Or **filter** by `live=True`, `executed=True`, or `tag="my_strategy"`

    ```python
    result = trade.orders(tag="straddle_v1", live=True)
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I view the complete order history (placement, partial fill, full fill, modifications)?"
    Yes. Each order object in `get_order()` or WebSocket updates includes:

    - **Timestamps:** placement, acknowledgment, modification, fill  
    - **Filled quantities:** partial and total  
    - **Exchange order ID:** for mapping with broker console  

    Use WebSocket **`on_order_update`** and **`on_trade_update`** to stream updates in real time.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Errors, Rejections, and Troubleshooting

??? faq-question "What are common order rejections (aggressor limit, invalid qty, trigger mismatch, etc.)?"
    Below are some common order rejection types and their reasons:

    | Rejection Type | Description |
    | --- | --- |
    | **Aggressor Limit** | Limit price crosses the best bid/ask (too aggressive). |
    | **Invalid Quantity** | Not in multiples of lot size or below minimum qty. |
    | **Invalid Trigger** | Trigger price inconsistent with limit. |
    | **No Market Depth** | Orderbook empty for given strike/contract. |
    | **Outside Trading Hours** | Attempted trade outside market window. |
    | **Exchange Not Available** | Segment temporarily unavailable. |

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I interpret rejection reasons in order responses?"
    Rejection messages appear in the `order_status` and `update_msg` fields (via WebSocket or REST).

    Common reasons include:

    - **Aggressor limit** — your limit price crossed the market price  
    - **Invalid quantity or tick size** — lot size mismatch or fractional quantity  
    - **Invalid trigger price** — SL order violated trigger/limit rules  
    - **Exchange closed or illiquid contract**

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Are rejected orders included in get_order responses?"
    Yes — all order states are included, including:

    - `ORDER_STATUS_REJECTED`  
    - `ORDER_STATUS_CANCELLED`  
    - `ORDER_STATUS_FILLED`  
    - `ORDER_STATUS_OPEN`

    This helps maintain a full trading log for compliance and debugging.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Why did my order modification fail even though my payload looked correct?"
    Common causes:

    - You didn’t include both **exchange** and **order_type** in the modify payload  
    - The order was already **filled**, **cancelled**, or **expired**  
    - The **trigger_price** or **leg_size** fields were omitted for SL/ICEBERG orders  
    - Modifications attempted on **executed Flexi baskets** (not supported)  

    **Pro tip:** Always check the latest status via `get_order()` before modifying.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What happens if an order placement fails or times out?"
    If an order placement request **fails**, **times out**, or cannot be processed by the exchange/broker, the API returns a **structured error response** containing:

    - **Error code**  
    - **Error message** describing the reason  
    - **Internal reference ID** (if available)  
    - **Status = failed**

    This allows your system to log, retry, or notify the user gracefully.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What is the retry or error-handling policy during volatile markets?"
    - Nubra automatically retries **temporary exchange rejections** (e.g., connectivity or rate limit issues)  
    - Permanent rejections must be corrected by the client  
    - Clients should implement **exponential backoff** on retry  

    **Best practice:** Always log the response from `create_order()` or WebSocket `on_error` to determine if the failure was transient or permanent.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I exit all open positions or square off trades via API?"
    You can use the SDK’s **positions + orders** endpoints:

    1. Call `trade.orders(live=True)` to find open positions  
    2. Send **opposite-side orders** (SELL if BUY, and vice-versa) to close them  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../market_data/">
  <h4>Market Data & WebSocket</h4>
  <p>Snapshot vs streaming, tick frequency, depth, subscriptions.</p>
</a>

<a class="faq-mini-card" href="../historical/">
  <h4>Historical Data & Analytics</h4>
  <p>Intervals, adjustments, gaps, candle logic.</p>
</a>

<a class="faq-mini-card" href="../orders/">
  <h4>Orders & Execution</h4>
  <p>Order types, flexi/basket orders, modify/cancel, errors.</p>
</a>

<a class="faq-mini-card" href="../margins/">
  <h4>Margins & Risk</h4>
  <p>Margin checks, aggressor limits, live updates, risk rules.</p>
</a>

<a class="faq-mini-card" href="../positions/">
  <h4>Positions & Holdings</h4>
  <p>Day vs net, conversions, holding logic, reconciliation.</p>
</a>

<a class="faq-mini-card" href="../greeks/">
  <h4>Options Greeks & Strategy APIs</h4>
  <p>Real-time Greeks, IV/Delta strategies, multi-leg logic.</p>
</a>

</div>
