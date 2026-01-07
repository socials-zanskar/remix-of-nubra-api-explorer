# Greeks Data

Subscribes to real-time **option Greeks data** for a specific option contract.  
This stream provides continuous updates for option sensitivity metrics such as Delta, Gamma, Theta, Vega, and Implied Volatility.

##Usage

=== "Python"
    ```python
    from nubra_python_sdk.ticker import websocketdata
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


    # Initialize the Nubra SDK client
    nubra = InitNubraSdk(NubraEnv.UAT)

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Define callback functions

    def on_greeks_data(msg):
        print(f"[Greeks] {msg}")

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_greeks_data=on_greeks_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
        )

    socket.connect()
    #Subscribe to Greeks data using option ref_id
    socket.subscribe(["1058227"], data_type="greeks", exchange="NSE")

    #Infinite loop on the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

| Attribute | Data Type | Description |
|----------|----------|-------------|
| ref_ids | List[str] | List of option reference IDs (e.g., ["1058227"]) |
| data_type | str | "greeks" |
| exchange | Optional[str] | eg., "NSE", "BSE"; if exchange is not passed default is "NSE" |

Response:
```python
# Response object structure
class OptionData:
    ref_id: int                          # Option reference ID
    timestamp: int                       # Timestamp in Epoch
    strike_price: int                    # Strike price
    lot_size: int                        # Lot size
    last_traded_price: Optional[int]     # Last traded price
    last_traded_price_change: Optional[float]  # Last traded price change
    iv: Optional[float]                  # Implied volatility
    delta: Optional[float]               # Delta value
    gamma: Optional[float]               # Gamma value
    theta: Optional[float]               # Theta value
    vega: Optional[float]                # Vega value
    volume: Optional[int]                # Traded volume
    open_interest: Optional[int]         # Open interest
    previous_open_interest: Optional[int]# Previous open interest
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