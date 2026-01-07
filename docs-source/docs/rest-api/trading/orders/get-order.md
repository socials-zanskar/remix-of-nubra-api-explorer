# Get Order

## Get All Orders for the Day

Fetch a complete list of all orders placed during the trading day, along with their current status.

```jsx
Method: GET
Endpoint: orders/v2
```

### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2?live=1' \
--header 'x-devide-id: TS1234' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2?executed=1' \
--header 'x-devide-id: TS1234' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```
### cURL
```bash
curl --location 'https://api.nubra.io/orders/v2?tag=test_order' \
--header 'x-devide-id: TS1234' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```


### Request Attribute
| Key      | Value      | Description |
| -----    | ---        | ---------   |
| live     | 1          |  Indicates that the order is currently active in the market |
| executed | 1          |Indicates that the order is executed in the market       |
| tag      | string     |Indicates tagged orders    |

### Response Structure

```jsx
[
   {    "order_id": 225,
        "client_code": "UAT00006",
        "basket_id": 0,
        "ref_id": 77688,
        "order_source": "ORDER_SOURCE_NORMAL",
        "order_type": "ORDER_TYPE_MARKET",
        "order_side": "ORDER_SIDE_SELL",
        "order_price": 340,
        "order_qty": 1,
        "leg_size": 0,
        "filled_qty": 0,
        "avg_filled_price": 0,
        "order_status": "ORDER_STATUS_REJECTED",
        "order_time": 1750925087843665000,
        "ack_time": null,
        "filled_time": null,
        "last_modified": null,
        "updated_by": 0,
        "tag": tag,
        "ref_data": {
            "ref_id": 77688,
            "zanskar_id": 78171,
            "option_type": "N/A",
            "token": 10407,
            "stock_name": "KSHITIJPOL",
            "series": "EQ",
            "zanskar_name": "STOCK_KSHITIJPOL.NSECM",
            "lot_size": 1,
            "asset": "KSHITIJPOL",
            "exchange": "NSE",
            "derivative_type": "STOCK"
        },
        "LTP": null,
        "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC",
        "display_name": "KSHITIJPOL",
        "brokerage": null,
        "exchange_order_id": 0,
        "duration": 0,
        "trigger_price": 0,
        "execution_type": "STRATEGY_TYPE_MARKET",
        "max_prate": 0
    }
]
```

> Note: Each order object inside the root list follows the same structure as the Get Order by ID response, which includes attributes like order_id, order_price, order_status, ref_data, and more. 


## Get Order by ID

Retrieve real-time status and details of any specific order using its order ID.

```jsx
Method: GET
Endpoint: orders/{order_id}
```

### cURL
```bash
curl --location --globoff 'https://api.nubra.io/orders/{order_id}' \
--header 'x-devide-id: TS1234' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### Request Parameter

| Field | **Type** | **Description** |
| --- | --- | --- |
| `order_id` | int | Unique ID of the order to fetch |

### Response Structure

```jsx
{
    "order_id": 6261,
    "client_code": "I0004O",
    "basket_id": 0,
    "ref_id": 845232,
    "order_source": "ORDER_SOURCE_NORMAL",
    "order_type": "ORDER_TYPE_MARKET",
    "order_side": "ORDER_SIDE_BUY",
    "order_price": 137140,
    "order_qty": 1,
    "filled_qty": 1,
    "avg_filled_price": 137140,
    "order_status": "ORDER_STATUS_FILLED",
    "order_time": 1754631389913824000,
    "ack_time": 1754631389933258000,
    "filled_time": 1754631389933116000,
    "last_modified": 1754631389933116000,
    "updated_by": 0,
    "ref_data": {
        "ref_id": 845232,
        "zanskar_id": 40447,
        "option_type": "N/A",
        "token": 500325,
        "stock_name": "RELIANCE",
        "zanskar_name": "STOCK_RELIANCE_EQ_A.BSECM",
        "lot_size": 1,
        "asset": "RELIANCE",
        "exchange": "BSE",
        "derivative_type": "STOCK"
    },
    "order_delivery_type": "ORDER_DELIVERY_TYPE_IDAY",
    "display_name": "RELIANCE",
    "brokerage": null,
    "price_type": "MARKET",
    "validity_type": "IOC",
    "exchange_order_id": 1754631292814036301,
    "execution_type": "STRATEGY_TYPE_IOC",
    "exchange": "",
    "LTP": 136600
}
```

### Response Parameters

| **Field** | **Description** |
| --- | --- |
| order_id | Unique ID of the order |
| exchange_order_id | order ID assigned by the exchange |
| ref_id | The instrument reference id received from Instrument API (e.g., "69353") |
| display_name | Represents the internal name of the traded instrument |
| order_type | Type of order (Limit, Market) |
| order_side | Buy or Sell |
| order_price | Price at which order is placed |
| order_qty | Total quantity ordered |
| leg_size | Size of each leg in the order |
| filled_qty | Quantity already filled |
| avg_filled_price | Average price of filled quantity |
| order_status | Current status of the order |
| last_modified | Last modification time |
| last_traded_price | Last traded price of the instrument |
| order_delivery_type | CNC, Intraday |