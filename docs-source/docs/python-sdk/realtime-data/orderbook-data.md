# Order Book Data
Subscribes to real-time market depth data. While received through `on_market_data`, can be filtered using the orderbook subscription.

##Usage

=== "Python"
    ```python
    from nubra_python_sdk.ticker import websocketdata
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
    

    # Initialize the Nubra SDK client
    nubra = InitNubraSdk(NubraEnv.UAT)

    # Define callback functions

    def on_orderbook_data(msg):
        print("[Orderbook] ", msg)

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_orderbook_data=on_orderbook_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
        )

    socket.connect()
    #Subscribe to different data types 
    socket.subscribe(["1746686"], data_type="orderbook")

    #Infinite loop on the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

| Attribute | Data Type | Description|
|----------|----------|----------|
| ref_ids | List[str] | List of reference IDs to subscribe to (e.g., ["1746686"]) |

Response:
```python
# Response object structure
class OrderBookWrapper:
    ref_id: int                   # Reference ID
    timestamp: int                # Timestamp in Epoch
    last_traded_price: int       # Last traded price
    last_traded_quantity: int     # Last traded quantity
    volume: int                   # Total volume

    # Bids (Buy Orders)
    bids: List[Orders]            # List of Order objects

    # Asks (Sell Orders)
    asks: List[Orders]            # List of Order objects

class Orders:
    price: int                  # Order price
    quantity: int                 # Total quantity at this price
    num_orders: int               # Number of orders at this price
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
6. Use the `on_market_data` callback as the primary data receiver, while using specific subscriptions to filter data types