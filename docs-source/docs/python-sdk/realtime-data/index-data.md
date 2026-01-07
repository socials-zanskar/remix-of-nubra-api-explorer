# Index Data
Subscribes to real-time data for market indices and stocks. While received through `on_market_data`, can be filtered using the index subscription.

## Usage

=== "Python"
    ```python
    from nubra_python_sdk.ticker import websocketdata
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


    # Initialize the Nubra SDK client
    nubra = InitNubraSdk(NubraEnv.UAT)

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Define callback functions

    def on_index_data(msg):
        print(f"[INDEX] {msg}")

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_index_data=on_index_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
        )

    socket.connect()
    #Subscribe to different data types
    socket.subscribe(["NIFTY", "BANKNIFTY"], data_type="index",exchange ="NSE")

    #Infinite loop on the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```


| Attribute | Data Type | Description|
|----------|----------|----------|
| symbols | List[str] | List of index symbols (e.g., ['NIFTY', 'BANKNIFTY']) |
| data_type | str | "index" |
| exchange | Optional[str]| eg., "NSE" , "BSE" ;if exchange is not passed default is "NSE"|

Response:
```python
# Response object structure
class IndexDataWrapper:
    indexname: str              # Symbol of the index (e.g., "NIFTY")
    exchange: str               # eg., NSE, BSE
    timestamp: int              # Timestamp in Epoch
    index_value: int            # Current index value
    volume: int                 # Trading volume
    changepercent: float        # Percentage change
    tick_volume: int            # Number of ticks
    prev_close: int             # Previous closing value
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