# Place Multi Order

The Place Basket Order endpoint enables the simultaneous execution of multiple buy or sell orders across various instruments by grouping them into a single request.

```jsx
Method: POST
Endpoint: orders/v2/multi
```

### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2/multi' \
--header 'x-device-id: c554a9b8-2c35-49f3-a2b5-170fab22387e' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
--data '{
    "orders": [
        {
            "ref_id": 250486,
            "order_type": "ORDER_TYPE_STOPLOSS", 
            "order_qty": 4,
            "order_side": "ORDER_SIDE_BUY", 
            "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC", 
            "validity_type" : "DAY", 
            "price_type": "LIMIT", 
            "order_price": 283,
            "tag": tag,
            "algo_params": {    
                "trigger_price": 113
            }
        },
    ]
}'
```

### Payload

```jsx
[ {
    "ref_id": 250486,
    "order_type": "ORDER_TYPE_STOPLOSS", 
    "order_qty": 4,
    "order_side": "ORDER_SIDE_BUY", 
    "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC", 
    "validity_type" : "DAY", 
    "price_type": "LIMIT", 
    "order_price": 283,
    "tag": tag,
    "algo_params": {    
        "trigger_price": 113
    }
}]
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orders | array | Yes | Array of order objects |


### Response Structure

```jsx
[
{
  "order_id": 867,
  "client_code": "I0006I",
  "basket_id": 0,
  "ref_id": 250486,
  "order_source": "ORDER_SOURCE_NORMAL",
  "order_type": "ORDER_TYPE_STOPLOSS",
  "order_side": "ORDER_SIDE_BUY",
  "order_price": 283,
  "order_qty": 4,
  "filled_qty": 0,
  "avg_filled_price": 0,
  "order_status": "ORDER_STATUS_PENDING",
  "order_time": -6795364578871345152,
  "ack_time": null,
  "filled_time": null,
  "last_modified": null,
  "updated_by": 0,
  "ref_data": null,
  "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
  "display_name": "",
  "brokerage": null,
  "price_type": "LIMIT",
  "validity_type": "DAY",
  "exchange_order_id": 0,
  "execution_type": "",
  "tag": tag,
  "algo_params": {
    "leg_size": 0,
    "duration": 0,
    "trigger_price": 113,
    "max_prate": 0,
    "min_prate": 0,
    "benchmark_type": "",
    "benchmark_price": 0,
    "cleanup_price": 0
  }
}
]
```
## Response Attributes

| Attribute | Description |
|-----------|-------------|
| `orders` | List of order responses *(see [CreateOrderResponse](place-order.md#response-attributes))* |