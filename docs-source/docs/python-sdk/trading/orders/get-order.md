## Get All Orders for the Day

Fetch a complete list of all orders placed during the trading day, along with their current status.

### Usage

=== "Python"
    ```python
    from nubra_python_sdk.trading.trading_data import NubraTrader
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)


    trade = NubraTrader(nubra,version="V2")

    result = trade.orders()

    ##filter live order
    #result = trade.orders(live = True)

    ##filter executed order
    #result = trade.orders(executed = True)

    ##filter order by tag 
    #result = trade.orders(tag=tag)
    ```


## Accessing Data

=== "Python"
    ```python

    # Order 1 details
    print(f"Order ID: {result.root[0].order_id}")
    print(f"Basket ID: {result.root[0].basket_id}")
    print(f"Order Price: {result.root[0].order_price}")
    print(f"Avg Filled Price: {result.root[0].avg_filled_price}")
    print(f"Last Traded Price: {result.root[0].last_traded_price}")
    print(f"Display Name: {result.root[0].display_name}")
    print(f"Exchange Order ID: {result.root[0].exchange_order_id}")
    print(f"Max Prate: {result.root[0].max_prate}")
    print(f"Ref ID: {result.root[0].ref_id}")

    # Order 2 details
    print(f"Order ID: {result.root[1].order_id}")
    print(f"Basket ID: {result.root[1].basket_id}")
    print(f"Order Price: {result.root[1].order_price}")
    print(f"Avg Filled Price: {result.root[1].avg_filled_price}")
    print(f"Last Traded Price: {result.root[1].last_traded_price}")
    print(f"Display Name: {result.root[1].display_name}")
    print(f"Exchange Order ID: {result.root[1].exchange_order_id}")
    print(f"Max Prate: {result.root[1].max_prate}")
    print(f"Ref ID: {result.root[1].ref_data.ref_id}")
    ```

### Request Attribute
| Attribute | Type | Description |
| --- | --- | --- |
| live | bool |  Indicates that the order is currently active in the market |
| executed | bool |Indicates that the order is executed in the market       |
| tag | string | Indicates tagged orders  |

### Response Structure

```python
class GetAllOrdersV2:
    root: List[CreateOrderResponseV2]

class CreateOrderResponseV2:
    order_id : int
    exchange: ExchangeEnum
    exchange_order_id: Optional[int]
    ref_id: int
    order_type: OrderTypeEnumV2
    order_side: OrderSideEnum
    order_price: int
    order_qty: int
    filled_qty: Optional[int]
    avg_filled_price: Optional[int]
    order_status: Optional[str]
    order_time: Optional[int]
    ack_time: Optional[int]
    filled_time: Optional[int]
    last_modified: Optional[int]
    ref_data: Optional[RefData]
    last_traded_price: Optional[int]
    order_delivery_type: DeliveryTypeEnum
    display_name: Optional[str]
    brokerage : Optional[float]
    price_type: PriceTypeEnumV2
    validity_type: ValidityTypeEnumV2
    execution_type: Optional[str]
    leg_size: Optional[int]
    duration: Optional[int]
    trigger_price: Optional[int]
    max_prate: Optional[int]
    tag: Optional[str]
    algo_params : Optional[AlgoParamsResponseV2]

class AlgoParamsResponseV2:
    leg_size: Optional[int]
    duration: Optional[int]
    trigger_price: Optional[int]
    max_prate : Optional[int]
    min_prate: Optional[int]
    benchmark_type: Optional[BenchMarkTypeV2]
    benchmark_price: Optional[int]
    cleanup_price: Optional[int]
    
class RefData
    ref_id: int
    option_type: Optional[str]
    token: Optional[int]
    stock_name: str
    nubra_name: str
    lot_size: Optional[int]
    asset: str
    exchange: str
    derivative_type: Optional[str]
```

### Response attribute 
| Field | Description |
| --- | --- |
| `root` | List of all orders placed for the day.  |


> Note:
Each order object inside the root list follows the same structure as the **Place Order** response, which includes attributes like `order_id`, `order_price`, `order_status`, `ref_data`, and more.

## Get Order by ID

Retrieve real-time status and details of any specific order using its order ID.

### Usage

=== "Python"
    ```python
    from nubra_python_sdk.trading.trading_data import NubraTrader
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    trade = NubraTrader(nubra, version= "V1")

    result = trade.get_order(795)
    ```

## Accessing Data

=== "Python"
    ```python
    # Top-level order details
    print(f"Order ID: {result.order_id}")
    print(f"Ref ID: {result.ref_id}")
    print(f"Average Filled Price: {result.avg_filled_price}")
    print(f"Order Price: {result.order_price}")
    print(f"Last Traded Price: {result.last_traded_price}")

    # Nested ref_data details
    print(f"Ref Data - Ref ID: {result.ref_data.ref_id}")
    print(f"Ref Data - Asset: {result.ref_data.asset}")
    print(f"Ref Data - Nubra Name: {result.ref_data.nubra_name}")
    ```

### Request Attribute
| Attribute | Type | Description |
| --- | --- | --- |
| `order_id` | int | Unique ID of the order to fetch |

### Response Structure

```python
class RefData:
    ref_id: int
    option_type: Optional[str]
    token: Optional[int]
    stock_name: str
    nubra_name: str
    lot_size: Optional[int]
    asset: str
    exchange: str
    derivative_type: Optional[str]

class GetOrderResponse(BaseModel):
    order_id: int
    exchange_order_id: Optional[int]
    ref_id: Optional[int]
    display_name: Optional[str]
    order_type: Optional[str]
    order_side: Optional[OrderSideEnum]
    order_price: Optional[int]
    order_qty: Optional[int]
    leg_size: Optional[int]
    filled_qty: Optional[int]
    avg_filled_price: Optional[int]
    order_status: Optional[OrderStatusEnum]
    last_modified: Optional[datetime]
    ref_data: Optional[RefData]
    last_traded_price: Optional[int] 
    order_delivery_type: Optional[DeliveryTypeEnum]
    execution_type: Optional[ExecutionTypeEnum]
    duration: Optional[int]
    max_prate: Optional[int]
    trigger_price: Optional[int]
```
## Response Attributes

| Attribute | Description |
|-----------|-------------|
| order_id | Unique ID of the order |
| exchange_order_id | order ID assigned by the exchange |
| ref_id | The instrument reference id received from Instrument API (e.g., "69353") |
| display_name | Represents the internal name of the traded instrument   |
| order_type | Type of order (Limit, Market) |
| order_side | Buy or Sell |
| order_price | Price at which order is placed (in paise)|
| order_qty | Total quantity ordered |
| leg_size | Size of each leg in the order |
| filled_qty | Quantity already filled |
| avg_filled_price | Average price of filled quantity (in paise)|
| order_status | Current status of the order |
| last_modified | Last modification time |
| last_traded_price | Last traded price of the instrument (in paise)|
| order_delivery_type | CNC, Intraday |
| max_prate | Max participation rate for execution logic | 
| execution_type | LIMIT, MARKET, STOPLOSS , ICEBERG |
| trigger_price | Trigger price for stop-loss orders |