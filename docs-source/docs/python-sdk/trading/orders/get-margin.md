## Get Margin (Margin Estimation)

The **Get Margin** API allows you to estimate margin requirements **before placing an order**.  
It supports:

- Single-leg orders
- Multi-leg strategies using flexi baskets
- Hedge benefits from **existing portfolio positions**
- Hedge benefits across **basketed legs**

This API helps users understand:

- Total Margin
- SPAN Margin
- Exposure Margin
- Margin benefits from hedging

---

## Mandatory Rule (Critical)

> ⚠️ **`with_portfolio` MUST be set to `True` for accurate margin calculation**

The margin engine evaluates margin **only correctly** when existing portfolio positions are considered.  
Using `with_portfolio = False` should be treated as **inspection / analysis mode only**, not for real margin checks.

---

## Core Margin Flags

| Flag | Purpose |
|-----|--------|
| `with_portfolio` | Enables hedge benefits using existing portfolio positions (**required for accuracy**) |
| `with_legs` | Returns margin **per leg**, without grouping |
| `is_basket` | Groups orders together and applies basket-level margin logic |

---

## Margin Behavior Matrix (Corrected)

| Scenario | with_portfolio | with_legs | is_basket | Margin Meaning |
|--------|---------------|-----------|-----------|----------------|
| Single order (leg inspection) | ❌ | ✅ | ❌ | Individual leg margin only |
| Single order (accurate margin) | ✅ | ❌ | ❌ | Portfolio-aware margin |
| Flexi basket (strategy margin) | ✅ | ❌ | ✅ | Basket-level margin |
---

### Margin Interpretation (Important)

**`total_margin`** is the **final and authoritative margin** that will be **blocked for the trade**.

This value already accounts for:

1. Portfolio hedge benefits (if applicable)
2. Basket-level offsets
3. Strategy sizing via `multiplier`

All other fields (`span`, `exposure`, `opt_prem`, etc.) are **informational components** and **must not** be summed or used independently.

**Always rely on `total_margin` to determine the actual margin requirement for order placement.**

---

## Examples

Below are **reference examples** for both **single-order inspection** and **flexi basket strategy margin**.  
These examples are intentionally separated to avoid misuse.

---

## Example 1 — Single Order (Leg Inspection Only)

This example shows how to fetch margin for a **single option leg** in **inspection mode**.

> ⚠️ **Important**
>
> - This mode is **NOT** for accurate or tradable margin
> - Hedge benefits are **disabled**
> - Portfolio positions are **ignored**
> - Use only for analysis, debugging, or explaining margin components

### Use Case
- Understanding standalone margin of an option
- Explaining SPAN / exposure per leg
- Debugging strategy construction

### Python Example — ITM Call Buy (Inspection Mode)

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
from nubra_python_sdk.trading.trading_data import NubraTrader

# =========================================
# INIT SDK
# =========================================
nubra = InitNubraSdk(NubraEnv.UAT, env_creds=True)
trade = NubraTrader(nubra, version="V2")

# =========================================
# CONFIG
# =========================================
REF_ITM_CALL = 1755599   # Replace with valid UAT / PROD ref_id
LOT_QTY = 75

# =========================================
# SINGLE LEG — INSPECTION MODE
# =========================================
itm_call_payload = {
    "with_portfolio": False,   # Inspection mode only
    "with_legs": False,         # Required for per-leg margin
    "is_basket": False,        # No grouping
    "order_req": {
        "exchange": "NSE",
        "orders": [
            {
                "ref_id": REF_ITM_CALL,
                "order_type": "ORDER_TYPE_REGULAR",
                "price_type": "MARKET",
                "order_qty": LOT_QTY,
                "order_price": 0,
                "order_side": "ORDER_SIDE_BUY",
                "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
                "validity_type": "IOC",
                "request_type": "ORDER_REQUEST_NEW"
            }
        ]
    }
}

margin = trade.get_margin(itm_call_payload)
print(margin)
```

---

## Example 2 — Flexi Basket Margin Estimation

This example demonstrates a **flexi basket margin estimation**, which returns:

- Basket-level margin (with multiplier applied)

---

### Python Example — Flexi Basket with Leg Breakdown

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
from nubra_python_sdk.trading.trading_data import NubraTrader

# =========================================
# INIT SDK
# =========================================
nubra = InitNubraSdk(NubraEnv.UAT, env_creds=True)
trade = NubraTrader(nubra, version="V2")

# =========================================
# CONFIG
# =========================================
REF_ITM_CALL = 1755599   # Replace with valid UAT / PROD ref_id
REF_OTM_CALL = 1755633   # Replace with valid UAT / PROD ref_id
LOT_QTY = 75

# =========================================
# Flexi Basket 
# =========================================
flexi_basket_payload = {
    "with_portfolio": True,    # Portfolio-aware margin
    "with_legs": False,        # Disable leg-level margin breakdown
    "is_basket": True,         # Basket grouping enabled
    "order_req": {
        "exchange": "NSE",
        "orders": [
            {
                "ref_id": REF_ITM_CALL,
                "order_qty": LOT_QTY,
                "order_side": "ORDER_SIDE_BUY",
                "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC"
            },
            {
                "ref_id": REF_OTM_CALL,
                "order_qty": LOT_QTY,
                "order_side": "ORDER_SIDE_SELL",
                "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC"
            }
        ],
        "basket_params": {
            "order_side": "ORDER_SIDE_BUY",
            "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
            "price_type": "MARKET",
            "multiplier": 5
        }
    }
}

payload_dict = trade.get_margin(flexi_basket_payload)
print(payload_dict)
```

### Request Attribute

| Attribute | Type | Description |
| --- | --- | --- |
| with_portfolio | bool | Enables portfolio-aware margin calculation. Must be `True` for accurate margins |
| with_legs | bool | Returns per-leg margin breakdown when enabled |
| is_basket | bool | Enables basket-level margin logic and hedge recognition |
| exchange | string | Exchange on which the instruments are traded |
| orders | list | List of order legs used for margin calculation |
| basket_params | object | Parameters for basket strategies such as multiplier and order behavior |

---

### Response Structure

```python
class GetMarginResponse:
    span: int
    exposure: int
    total_margin: int
    delivery_margin: int
    opt_prem: int
    var: int
    net_span: int
    total_derivative_margin: int
    total_equity_margin: int
    margin_benefit: int
    leg_margin: Optional[List[LegMargin]]
    edis_auth_done: bool
    max_quantity: int
    message: Optional[str]


class LegMargin:
    ref_id: int
    span: int
    exposure: int
    total_margin: int
    delivery_margin: int
    opt_prem: int
    var: int
    net_span: int
    total_derivative_margin: Optional[int]
    total_equity_margin: Optional[int]
    margin_benefit: Optional[int]
```