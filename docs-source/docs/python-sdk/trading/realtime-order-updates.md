# Realtime Order Updates with Websockets

This section covers the WebSocket API for real-time order and trade updates. The Websocket connection provides instant notifications about order status changes, executions, and trade updates directly from the server.

## WebSocket Connection Setup

The WebSocket connection can be established using the `NubraDataSocket` class, which supports real-time order and trade updates through dedicated callbacks.

=== "Python"
    ```python
    from nubra_python_sdk.ticker import orderupdate
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Define callback functions
    def on_order_update(msg):
        # This callback receives real-time order status updates
        print(f"[OrderUpdate] {msg}")

    def on_trade_update(msg):
        # This callback receives real-time trade execution updates
        print(f"[TradeUpdate] {msg}")

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = orderupdate.OrderUpdate(
        client=nubra,
        on_order_update=on_order_update,
        on_trade_update=on_trade_update,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
    )
    socket.connect()
    #The below method will block the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

## Advance Usage
=== "Python"
    ```python
    # Start WebSocket in a separate thread
    import threading

    def run_websocket():
        socket.connect()
        socket.keep_running()

    websocket_thread = threading.Thread(target=run_websocket)
    websocket_thread.daemon = True
    websocket_thread.start()
    ```

## Order Updates

The `on_order_update` callback receives real-time updates about order status changes. This includes order placement, modification, cancellation, and status changes.

Response:
```python
# Response object structure
class OrderInfoWrapper:
    exchange: str                 # Exchange name
    exchange_order_id: Optional[int]  # Exchange order ID
    order_id: Optional[int]       # Internal order ID
    ref_id: Optional[int]         # Reference ID
    side: OrderSideEnum          # Order side (BUY/SELL)
    trade_qty: Optional[int]     #trade quantity
    trade_price : Optional[int]   #trade price
    order_type: str    # Type of order (LIMIT/MARKET)
    order_type_v2: Optional[str] #Type of order in v2
    strategy_type: Optional[str]  # Execution strategy type
    order_status: OrderStatusEnum    # Current order status
    order_qty: Optional[int]      # Order quantity
    order_price: Optional[int]  # Order price
    display_name: Optional[str]   # Display name
    last_modified: Optional[int]  # Last modified timestamp
    update_msg: Optional[str]     # Update message
    response_type: str           # Response type
    filled_qty: Optional[int]     # Filled quantity
    avg_price: Optional[int]    # Average price
    trigger_price: Optional[int]  # Trigger price (for stop orders)
    price_type: Optional[str]       #Price type: LIMIT/MARKET
    validity_type: Optional[str]    #Validity type: DAY/IOC
    leg_size: Optional[int]         #leg size
    algo duration: Optional[int]    #algo duaration
    max_prate: Optional[int]
    algo_params: Optional[AlgoParamsV2]
    asset_type: Optional[str]
    is_sor: Optional[bool]
    tag: Optional[str]              # Helps you tag your order with unique name eg: order_test
    request_type: Optional[OrderRequestTypeEnum]

class BasketWrapper:
    basket_id : int
    last_modified : int
    response_type: str
```

## Trade Updates

The `on_trade_update` callback receives real-time updates about trade executions. This includes partial fills, complete fills, and trade modifications.

Response:
```python
# Response object structure
class AckInfoWrapper:
    exchange: str                 # Exchange name
    exchange_order_id: Optional[int]  # Exchange order ID
    order_id: Optional[int]       # Internal order ID
    ref_id: Optional[int]         # Reference ID
    side: OrderSideEnum          # Order side (BUY/SELL)
    trade_qty: Optional[int]     #trade quantity
    trade_price : Optional[int]   #trade price
    order_type: OrderTypeEnum    # Type of order (LIMIT/MARKET)
    order_type_v2: Optional[str] #Type of order in v2
    strategy_type: ExecutionTypeEnum  # Execution strategy type
    order_status: OrderStatusEnum    # Current order status
    order_qty: Optional[int]      # Order quantity
    filled_qty: Optional[int]     # Filled quantity
    avg_price: Optional[int]    # Average price
    display_name: Optional[str]   # Display name
    last_modified: Optional[int]  # Last modified timestamp
    update_msg: Optional[str]     # Update message
    response_type: str           # Response type
    price_type: Optional[str]       #Price type: LIMIT/MARKET
    validity_type: Optional[str]    #Validity type: DAY/IOC
    leg_size: Optional[int]         #leg size
    algo duration: Optional[int]    #algo duaration
    max_prate: Optional[int]
    algo_params: Optional[AlgoParamsV2]
    asset_type: Optional[str]
    is_sor: Optional[bool]
    tag: Optional[str]              # Helps you tag your order with unique name eg: order_test
    request_type: Optional[OrderRequestTypeEnum]

class BasketWrapper:
    basket_id : int
    last_modified : int
    response_type: str
```

## Enums

The following enums are used in the order and trade update responses:

```python
class OrderSideEnum(str, Enum):
    ORDER_SIDE_BUY = "ORDER_SIDE_BUY"
    ORDER_SIDE_SELL = "ORDER_SIDE_SELL"

class OrderStatusEnum(str, Enum):
    ORDER_STATUS_PENDING = "ORDER_STATUS_PENDING"
    ORDER_STATUS_SENT = "ORDER_STATUS_SENT"
    ORDER_STATUS_OPEN = "ORDER_STATUS_OPEN"
    ORDER_STATUS_REJECTED = "ORDER_STATUS_REJECTED"
    ORDER_STATUS_CANCELLED = "ORDER_STATUS_CANCELLED"
    ORDER_STATUS_FILLED = "ORDER_STATUS_FILLED"
    ORDER_STATUS_EXPIRED = "ORDER_STATUS_EXPIRED"
    ORDER_STATUS_TRIGGERED = "ORDER_STATUS_TRIGGERED"
    ORDER_STATUS_PARTIAL_FILLED = "ORDER_STATUS_PARTIAL_FILLED"

class OrderRequestTypeEnum(str, Enum) :
    ORDER REQUEST NEW = "ORDER REQUEST NEW"
    ORDER_REQUEST_ MOD = "ORDER _REQUEST_MOD"
    ORDER REQUEST_ CANCEL = "ORDER REQUEST CANCEL"
```


## Error Handling

The WebSocket connection includes built-in error handling through the `on_error` callback. Common errors include:
- Connection failures
- Authentication errors
- Subscription errors
- Data parsing errors

## Best Practices

1. Always run WebSocket connections in a separate thread to prevent blocking the main application
2. Implement proper error handling using the provided callbacks
3. Use the `keep_running()` method to maintain the connection
4. Close the connection properly when done using the `close()` method
5. Monitor connection status using the `on_connect` and `on_close` callbacks
6. Keep track of order and trade states in your application to handle updates appropriately
7. Implement proper error handling for rejected orders and failed trades 