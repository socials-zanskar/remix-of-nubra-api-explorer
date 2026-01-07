# Get FlexiOrder

## Get all Flexi order for the Day

Retrieve details of any specific basket order using its basket ID.

```jsx
Method: GET
Endpoint: orders/v2/basket
```

### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2/basket?tag=tag' \
--header 'x-device-id: 1234' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRDb2RlIj...ueAWA'
```

### Request Attribute
| Key      | Value      | Description |
| -----    | ---        | ---------   |
| tag      | string     |Indicates the tagged order|

### Response Structure
```jsx
[
  {
    "basket_id": 1266,
    "user_id": 0,
    "basket_name": "IDEA",
    "tag": tag,
    "orders": {
      "71068": {
        "order_side": "ORDER_SIDE_BUY",
        "buy_qty": 0,
        "sell_qty": 0,
        "buy_avg": 0,
        "sell_avg": 0,
        "display_name": "IDEA",
        "ref_data": {
          "ref_id": 71068,
          "zanskar_id": 70506,
          "lot_size": 1,
          "derivative_type": "STOCK"
        },
        "LTP": 658,
        "pnl": 0,
        "pnl_change": 0
      }
    },
    "basket_params": {
      "basket_strategy": "CUSTOM",
      "entry_price": 625,
      "exit_price": null,
      "stoploss_price": null,
      "entry_time": "2025-08-08T09:03:40.155578Z",
      "multiplier": 2,
      "momentum_trigger_price": null,
      "order_side": "ORDER_SIDE_BUY",
      "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
      "price_type": "LIMIT",
      "basket_status": "BASKET_STATUS_OPEN"
    },
    "LTP": 658,
    "pnl": 0,
    "pnl_change": 0,
    "exchange": "NSE"
  },
]
```