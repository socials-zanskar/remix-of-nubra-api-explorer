# Get Margin – Individual Order

The **Get Margin API** allows you to estimate margin requirements **before placing a single order**.  
This endpoint can be used either in **inspection mode** (leg-level understanding) or **portfolio-aware mode** for accurate margin checks.

```jsx
Method: POST
Endpoint: orders/v2/margin_required
```

---

## Mandatory Rule (Critical)

> ⚠️ **`with_portfolio` MUST be set to `True` for accurate margin calculation**

When `with_portfolio` is set to `False`, the margin engine **ignores existing portfolio positions** and **does not apply hedge benefits**.  
This mode should be used **only for inspection, debugging, or explanation purposes**.

---

### cURL

```bash
curl --location --request POST 'https://api.nubra.io/orders/v2/margin_required' \
--header 'x-device-id: {{x_device_id}}' \
--header 'Authorization: Bearer {{session_token}}' \
--header 'Content-Type: application/json' \
--data '{
  "with_portfolio": true,
  "with_legs": false,
  "is_basket": false,
  "order_req": {
    "exchange": "NSE",
    "orders": [
      {
        "ref_id": 1755599,
        "order_type": "ORDER_TYPE_REGULAR",
        "price_type": "MARKET",
        "order_qty": 75,
        "order_price": 0,
        "order_side": "ORDER_SIDE_BUY",
        "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
        "validity_type": "IOC",
        "request_type": "ORDER_REQUEST_NEW"
      }
    ]
  }
}'
```

---

### Payload

```jsx
{
  "with_portfolio": true,
  "with_legs": false,
  "is_basket": false,
  "order_req": {
    "exchange": "NSE",
    "orders": [
      {
        "ref_id": 1755599,
        "order_type": "ORDER_TYPE_REGULAR",
        "price_type": "MARKET",
        "order_qty": 75,
        "order_price": 0,
        "order_side": "ORDER_SIDE_BUY",
        "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
        "validity_type": "IOC",
        "request_type": "ORDER_REQUEST_NEW"
      }
    ]
  }
}
```

---

## Request Parameters

| Field | Type | Description |
|------|------|-------------|
| `with_portfolio` | boolean | Enables portfolio-aware margin calculation (**required for accuracy**) |
| `with_legs` | boolean | Returns per-leg margin breakdown when enabled |
| `is_basket` | boolean | Indicates single-order margin calculation |
| `order_req` | object | Order request details |

---

## Margin Interpretation (Important)

- **`total_margin`** is the **final and authoritative margin** that will be blocked for the order.
- All other fields (`span`, `exposure`, `opt_prem`, etc.) are **informational components only**.
- **Do not sum individual margin fields**. Always rely on `total_margin`.

---

### Response Structure

```jsx
{
  "span": 52000,
  "exposure": 18000,
  "total_margin": 70000,
  "margin_benefit": 0,
  "leg_margin": null,
  "message": null
}
```

---

---

# Get Margin – Flexi Basket Order

The **Get Margin API** supports **Flexi Basket margin estimation**, allowing users to evaluate margin requirements for **multi-leg strategies** with hedge benefits applied **across basketed legs** and the **existing portfolio**.

This is the **recommended and correct mode** for strategy margin estimation.

```jsx
Method: POST
Endpoint: orders/v2/margin_required
```

---

## Mandatory Rule (Critical)

> ⚠️ **`with_portfolio` MUST be set to `True` for accurate basket margin calculation**

Flexi basket margin estimation relies on:
- Portfolio hedge benefits
- Basket-level offsets
- Strategy sizing via `multiplier`

Disabling `with_portfolio` will produce **incomplete and misleading results**.

---

### cURL

```bash
curl --location --request POST 'https://api.nubra.io/orders/v2/margin_required' \
--header 'x-device-id: {{x_device_id}}' \
--header 'Authorization: Bearer {{session_token}}' \
--header 'Content-Type: application/json' \
--data '{
  "with_portfolio": true,
  "with_legs": false,
  "is_basket": true,
  "order_req": {
    "exchange": "NSE",
    "orders": [
      {
        "ref_id": 1755599,
        "order_qty": 75,
        "order_side": "ORDER_SIDE_BUY",
        "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC"
      },
      {
        "ref_id": 1755633,
        "order_qty": 75,
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
}'
```

---

### Payload

```jsx
{
  "with_portfolio": true,
  "with_legs": false,
  "is_basket": true,
  "order_req": {
    "exchange": "NSE",
    "orders": [
      {
        "ref_id": 1755599,
        "order_qty": 75,
        "order_side": "ORDER_SIDE_BUY",
        "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC"
      },
      {
        "ref_id": 1755633,
        "order_qty": 75,
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
```

---

## Request Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| with_portfolio | boolean | Yes | Enables portfolio-aware margin calculation (**must be `true` for accurate results**) |
| with_legs | boolean | No | Returns leg-level margin breakup when enabled |
| is_basket | boolean | Yes | Enables basket-level margin logic |
| order_req | object | Yes | Order or basket request used for margin computation |

---

### Response Structure

```jsx
{
  "span": 0,
  "exposure": 0,
  "delivery_margin": 0,
  "total_margin": 8967952,
  "opt_prem": 0,
  "var": 0,
  "net_span": 0,
  "total_derivative_margin": 0,
  "total_equity_margin": 0,
  "message": "The quantity entered is not a multiple of current lots size. Ensure that the quantity entered is a multiple of 65 lots size",
  "margin_benefit": 0,
  "leg_margin": null,
  "edis_auth_done": true,
  "code": "ORDER_SERVICE_RMS_CASH_CHECK",
  "max_quantity": 0
}
---

## Margin Interpretation (Critical)

- **`total_margin`** is the **only margin value that matters** for order placement.
- Basket-level margin already accounts for:
  - Hedge benefits across legs
  - Portfolio offsets
  - Multiplier scaling
- Fields like `span`, `exposure`, and `margin_benefit` are **diagnostic only**.

---