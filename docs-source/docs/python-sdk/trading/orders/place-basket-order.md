# Place Multi Order

The Place Multi Order endpoint enables the simultaneous execution of multiple buy or sell orders across various instruments by grouping them into a single request.

## Usage

=== "Python"
    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
    from nubra_python_sdk.trading.trading_data import NubraTrader
    from nubra_python_sdk.trading.trading_enum import (
        OrderSideEnum, 
        OrderTypeEnumV2,
        ValidityTypeEnumV2,
        PriceTypeEnumV2
        )

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    trade = NubraTrader(nubra, version= "V2")

    result = trade.multi_order([
        {   "ref_id": 250486,
            "order_type": "ORDER_TYPE_STOPLOSS", 
            "order_qty": 100,
            "order_side": "ORDER_SIDE_BUY", 
            "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC", 
            "validity_type" : "DAY", 
            "price_type": "LIMIT", 
            "order_price": 11400,
            "exchange": "NSE",
            "tag": "order_test",
            "algo_params": {
            "trigger_price": 11380
        }},
        {
            "ref_id": 69804,
            "order_type": "ORDER_TYPE_ICEBERG", 
            "order_qty": 100,
            "order_side": "ORDER_SIDE_BUY", 
            "order_delivery_type": "ORDER_DELIVERY_TYPE_CNC", 
            "validity_type" : "DAY", 
            "price_type": "LIMIT", 
            "order_price": 11400,
            "exchange": "NSE",
            "tag": "order_test",
            "algo_params": {
            "leg_size": 10 }}
    ])
    ```

## Accessing Data
=== "Python"
    ```python
    #Get Basket Information
    print(f"Basket ID: {result.basket_id}")
    print(f"User ID: {result.user_id}")
    print(f"Basket Name: {result.basket_name}")

    #Order 1 details
    print(f"Order 1 ID: {result.orders[0].order_id}")
    print(f"Exchange Order ID: {result.orders[0].exchange_order_id}")
    print(f"Ref ID: {result.orders[0].ref_id}")
    print(f"Display Name: {result.orders[0].display_name}")

    #Order 2 details
    print(f"Order 2 ID: {result.orders[1].order_id}")
    print(f"Exchange Order ID: {result.orders[1].exchange_order_id}")
    print(f"Ref ID: {result.orders[1].ref_id}")
    print(f"Display Name: {result.orders[1].display_name}")
    ```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| orders | array | Yes | Array of order objects |

Each order object in the array should contain:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ref_id | int | Yes | The instrument reference id received from Instrument API (e.g., "69353") |
| order_type | enum | Yes | ORDER_TYPE_REGULAR, ORDER_TYPE_STOPLOSS, ORDER_TYPE_ICEBERG |
| order_qty | int | Yes | Quantity of contracts or shares |
| order_side | enum | Yes | ORDER_SIDE_BUY or ORDER_SIDE_SELL |
| order_delivery_type | enum | Yes | ORDER_DELIVERY_TYPE_CNC, ORDER_DELIVERY_TYPE_IDAY|
| validity_type | enum | Yes | DAY, IOC | 
| price_type | enum| Yes | LIMIT, MARKET|
| order_price | int | Yes | The limit price for the order. The order will only execute at this price or better.Order_price is required in case of price_type = LIMIT (in paise)|
| exchange | enum | Yes | NSE, BSE |
| leg_size | int | No | Required for ICEBERG strategy to be passed in algo_params. The size of each visible portion (leg) of the order. This is the quantity that will be exposed to the market at one time.<br>Note: The total order quantity must be greater than the `leg_size` (and usually an integer multiple of `leg_size`).|
| trigger_price | int | No | Required only for STOPLOSS orders to be passed in algo_params. The price at which the stop order is triggered/activated. For a BUY stop-loss order, the trigger price must be less than or equal to the order price. For a SELL stop-loss order, the trigger price must be greater than or equal to the order price. (in paise)|
| tag | string | Optional | Helps you tag your order with unique name eg: order_test | 


## Response Structure
=== "Python"
    ```python
    class MultiOrderResponseV2:
        orders: List[CreateOrderResponseV2]

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
        benchmark_type: Optional[str] 
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

## Response Attributes

| Attribute | Description |
|-----------|-------------|
| `orders` | List of order responses *(see [CreateOrderResponse](place-order.md#response-attributes))* |
