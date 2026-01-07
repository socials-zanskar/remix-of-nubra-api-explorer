# Place Flexi Order

The **Flexi Basket Order** allows you to place and execute a basket of trades as a single, unified strategy. 

It enables users to create multiple buy/sell legs across derivative (options) and define key execution parameters—like price type, stop loss, and target—at the basket level, rather than for each individual leg.

```jsx
Method: POST
Endpoint: orders/v2/basket
```

### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2/basket' \
--header 'x-device-id: TEST21234' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
--data '{
"exchange": "NSE",
"basket_name": "IDEA",
"tag": tag,
"orders": [
    {
        "ref_id": ref_id,
        "order_qty": 1,
        "order_side": "ORDER_SIDE_BUY"
    }
],
"basket_params": {
    "order_side": "ORDER_SIDE_BUY",
    "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
    "price_type": "MARKET",
    "multiplier": 2
}
}'
```

### Payload

```jsx
{
"exchange": "NSE",
"basket_name": "IDEA",
"tag": tag,
"orders": [
    {
        "ref_id": ref_id,
        "order_qty": 1,
        "order_side": "ORDER_SIDE_BUY"
    }
],
"basket_params": {
    "order_side": "ORDER_SIDE_BUY",
    "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
    "price_type": "LIMIT",
    "entry_price": limit_order_price,
    "multiplier": 2
}
}
```


### Response Structure

```jsx
{
  "basket_id": 1264,
  "user_id": 136,
  "basket_name": "IDEA",
  "tag": tag,
  "orders": [
    {
      "order_id": 11074,
      "client_code": "IN0002",
      "basket_id": 1264,
      "ref_id": 71068,
      "order_source": "ORDER_SOURCE_NORMAL",
      "order_type": "ORDER_TYPE_REGULAR",
      "order_side": "ORDER_SIDE_BUY",
      "order_price": 658,
      "order_qty": 2,
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
      "price_type": "MARKET",
      "validity_type": "IOC",
      "exchange_order_id": 0,
      "execution_type": "",
      "exchange": "NSE",
      "LTP": null
    }
  ],
  "basket_params": {
    "entry_price": null,
    "exit_price": null,
    "stoploss_price": null,
    "momentum_trigger_price": null
  },
  "LTP": 0,
  "pnl": 0,
  "pnl_change": 0
}
```

## Notes:
>The Flexi Basket order treats all included legs as one unit and applies price-based and time-based risk management at the basket level.

>Entry/exit decisions are evaluated across the net basket price, not individual instruments.

>Stop Loss and Target work in OCO (One Cancels Other) mode—only one will be executed.

>Exit time is a hard exit trigger and will close the basket if no other condition is met. ( 3:05pm is the default exit time for Intraday)

>Exit time can be passed in case of only Intraday order.

>Only legs from the same underlying asset are currently allowed. Cross-asset (e.g., NIFTY + BANKNIFTY) or cross-exchange (NSE + BSE) baskets are not supported at this time.

>Prices are specified in paise, not rupees (e.g., ₹150 = 15000).

>Multi-asset and modification support not supported in this version.

>Currently flexi basket order can't be modified.



## GOLDEN RULES: (irrespective of net buy/sell exposure)

>Stop loss price has to be less than Limit Price

>Target Price has to be greater than limit price

>Momentum trigger has to be lesser than target price

>Aggressive limit order - The limit price entered has to be greater than LTP

>Passive Limit order - The limit price entered has to be lesser than the LTP.