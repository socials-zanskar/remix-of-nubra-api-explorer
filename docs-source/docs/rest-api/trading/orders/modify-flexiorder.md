# Modify Flexi Basket

The Modify Flexi Basket API allows you to update basket-level execution parameters of an existing Flexi Basket without cancelling it.  
The basket is modified **in place**, and the `basket_id` remains unchanged.

```jsx
Method: PUT
Endpoint: orders/v2/basket/{basket_id}
```

---

### cURL

```bash
curl --location --request PUT 'https://api.nubra.io/orders/v2/basket/{basket_id}' \
--header 'x-device-id: {{x_device_id}}' \
--header 'Authorization: Bearer {{session_token}}' \
--header 'Content-Type: application/json' \
--data '{
  "exchange": "NSE",
  "basket_name": "ShortStraddleLimitTest",
  "tag": "entry_short_straddle_limit",
  "orders": [
    {
      "ref_id": 956870,
      "order_qty": 75,
      "order_side": "ORDER_SIDE_BUY"
    },
    {
      "ref_id": 956857,
      "order_qty": 75,
      "order_side": "ORDER_SIDE_BUY"
    }
  ],
  "basket_params": {
    "order_side": "ORDER_SIDE_BUY",
    "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
    "price_type": "LIMIT",
    "entry_price": 1245,
    "multiplier": 1,
    "entry_time": "2025-12-29T09:40:00.000Z"
  }
}'
```

---

### Payload

```jsx
{
  "exchange": "NSE",
  "basket_name": "ShortStraddleLimitTest",
  "tag": "entry_short_straddle_limit",
  "orders": [
    {
      "ref_id": 956870,
      "order_qty": 75,
      "order_side": "ORDER_SIDE_BUY"
    },
    {
      "ref_id": 956857,
      "order_qty": 75,
      "order_side": "ORDER_SIDE_BUY"
    }
  ],
  "basket_params": {
    "order_side": "ORDER_SIDE_BUY",
    "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
    "price_type": "LIMIT",
    "entry_price": 1245,
    "multiplier": 1,
    "entry_time": "2025-12-29T09:40:00.000Z"
  }
}
```

---

## Request Parameters

| Field | Type | Description |
|-------|------|-------------|
| `basket_id` | int | ID of the Flexi Basket to modify |
| `exchange` | string | Exchange on which the basket is placed |
| `basket_name` | string | Name of the Flexi basket |
| `tag` | string | Client-defined identifier for the basket |
| `orders` | array | Basket legs to be executed |
| `basket_params` | object | Basket-level execution parameters |

---

### orders[]

| Field | Type | Description |
|------|------|-------------|
| `ref_id` | int | Instrument reference ID |
| `order_qty` | int | Quantity per leg |
| `order_side` | string | BUY or SELL side |

> Basket legs must remain identical to the original basket.

---

### basket_params

| Field | Type | Description |
|------|------|-------------|
| `order_side` | string | Direction of the basket |
| `order_delivery_type` | string | CNC / IDAY |
| `price_type` | string | LIMIT or MARKET |
| `entry_price` | number | Updated basket entry price (required for LIMIT) |
| `multiplier` | int | Basket quantity multiplier |
| `entry_time` | string | Optional scheduled execution time (ISO format) |
| `exit_time` | string | Basket exit time |
| `exit_price` | number | Basket exit price |
| `stoploss_price` | number | Basket stoploss price |
| `momentum_trigger_price` | number | Momentum trigger price |

---

## Exit & Risk Parameter Modification Rules

> **Important:**  
> `exit_time` is **mandatory** if the user wants to modify **any** of the following parameters:
>
> - `exit_time`
> - `exit_price`
> - `stoploss_price`
> - `momentum_trigger_price`

These parameters can be modified **only if**:

1. `exit_time` was present in the **original basket creation payload**, and  
2. The basket type is **IDAY**.

If `exit_time` was **not specified during basket creation**, modification of exit-related or risk-related parameters is **not allowed**.


---

## Modification Rules Summary

| Parameter | Modification Allowed |
|---------|----------------------|
| Entry Price | ✅ Yes |
| Multiplier | ✅ Yes |
| Entry Time | ✅ Yes |
| Exit Time | ⚠️ Only if originally provided and IDAY |
| Exit Price | ⚠️ Requires `exit_time` and IDAY |
| Stoploss Price | ⚠️ Requires `exit_time` and IDAY |
| Momentum Trigger Price | ⚠️ Requires `exit_time` and IDAY |
| Basket Legs (`ref_id`) | ❌ No |
| Basket ID | ❌ No |

---

### Response Structure

```jsx
{
  "message": "basket mod request pushed"
}
```
