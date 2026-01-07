# Modify Flexi Basket

The **Modify Flexi Basket API** allows you to update parameters of an existing Flexi basket order without cancelling and recreating it.  
This is useful for adjusting strategy-level parameters such as **entry price, exit price, stoploss, timing, or multiplier** after the basket has been created.

Flexi basket modification applies at the **basket level**, not individual child orders.

---

## Usage

=== "Python"
```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
from nubra_python_sdk.trading.trading_data import NubraTrader
from nubra_python_sdk.trading.trading_enum import (
    DeliveryTypeEnum,
    OrderSideEnum,
    PriceTypeEnumV2,
    ExchangeEnum
)

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.PROD, env_creds=True)
trade = NubraTrader(nubra, version="V2")

modify_payload = {
    "exchange": ExchangeEnum.NSE,
    "orders": [
        {"ref_id": 956890},
        {"ref_id": 956857}
    ],
    "basket_params": {
        "order_side": OrderSideEnum.ORDER_SIDE_BUY,
        "order_delivery_type": DeliveryTypeEnum.ORDER_DELIVERY_TYPE_IDAY,
        "price_type": PriceTypeEnumV2.LIMIT,
        "entry_price": 197900,
        "exit_price": 201900,
        "stoploss_price": 197000,
        "multiplier": 1,
        "entry_time": "2025-12-24T09:00:00.000Z",
        "exit_time": "2025-12-24T09:30:00.000Z"
    }
}

result = trade.mod_flexi_order(
    basket_id=12345,
    request=modify_payload
)

print(result)
```

---

## Request Parameters

### Path Parameters

| Field | Type | Description |
|------|------|-------------|
| `basket_id` | int | Unique ID of the Flexi basket to be modified |

---

### Request Body

#### Top-Level Fields

| Field | Type | Description |
|------|------|-------------|
| `exchange` | enum | Exchange of the basket (`NSE`, `BSE`) |
| `orders` | list | List of basket legs (identified by `ref_id`) |
| `basket_params` | object | Strategy-level parameters to modify |

---

#### Orders Object

| Field | Type | Description |
|------|------|-------------|
| `ref_id` | int | Nubra reference ID of the instrument |

> Order legs cannot be added or removed during modification.  
> Only existing legs can be referenced.

---

#### Basket Parameters (`basket_params`)

| Field | Type | Description |
|------|------|-------------|
| `order_side` | enum | BUY or SELL |
| `order_delivery_type` | enum | Intraday (IDAY) or CNC |
| `price_type` | enum | LIMIT or MARKET |
| `entry_price` | int | Updated basket entry price (in paise) |
| `exit_price` | int | Updated target price (in paise) |
| `stoploss_price` | int | Updated stoploss price (in paise) |
| `multiplier` | int | Strategy quantity multiplier |
| `entry_time` | string | Scheduled entry time (ISO 8601, UTC) |
| `exit_time` | string | Scheduled exit time (ISO 8601, UTC) |

---

## What Can Be Modified

| Parameter | IDAY | CNC |
|---------|------|-----|
| Entry Price | ✅ Yes | ✅ Yes |
| Multiplier | ✅ Yes | ✅ Yes |
| Exit Price | ✅ Yes* | ❌ No |
| Stoploss Price | ✅ Yes* | ❌ No |
| Exit Time | ✅ Yes | ❌ No |
| Entry Time | ✅ Yes | ✅ Yes |
| Order Side | ❌ No | ❌ No |
| Basket Legs | ❌ No | ❌ No |
| Exchange | ❌ No | ❌ No |

\* Exit price must have been provided in the **initial Flexi basket placement**.

---

## Time Handling (Important)

- All time fields (`entry_time`, `exit_time`) **must be provided in UTC**
- Convert local exchange time (IST) to UTC before sending the request

---

## Exit Price, Stoploss & Exit Time Rules

- `exit_price`, `stoploss_price`, and `exit_time` **can only be modified for IDAY baskets**
- These fields **cannot be modified for CNC baskets**
- `exit_price` and `stoploss_price` are modifiable **only if an exit price was set during initial basket placement**

---

## Entry Price & Multiplier Rules

- `entry_price` and `multiplier` **can be modified independently**
- These updates **do not require** an `exit_price` to be present in the initial basket

---

## Response Structure

=== "Python"
```python
# Success Response
{
    "message": "update request pushed"
}
```

---

## Important Notes

- Flexi basket modification operates at the **strategy level**
- Individual child orders inherit updated parameters automatically
- Ref IDs must match the **original basket legs**
- Entry/exit prices must align with the selected `price_type`
