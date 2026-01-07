# OHLCV Data

Subscribes to real-time **OHLCV (Open, High, Low, Close, Volume)** candle data for indices and stocks at a specified interval.  
Each update represents a completed candle bucket for the given interval.

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

    def on_ohlcv_data(msg):
        print(f"[OHLCV] {msg}")

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_ohlcv_data=on_ohlcv_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
        )

    socket.connect()
    #Subscribe to OHLCV data
    socket.subscribe(["NIFTY", "HDFCBANK"], data_type="ohlcv", interval="10m", exchange="NSE")

    #Infinite loop on the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

## Supported Intervals

The OHLCV WebSocket supports the following candle intervals:

### Minute Intervals
- `1m`
- `2m`
- `3m`
- `5m`
- `10m`
- `15m`
- `30m`

### Hourly Intervals
- `1h`
- `2h`
- `4h`

### Higher Timeframes
- `1d`  — Daily candle
- `1wk` — Weekly candle
- `1mt` — Monthly candle

> Note: The `interval` parameter must be passed exactly as listed above when subscribing to OHLCV data.

---

| Attribute | Data Type | Description |
|----------|----------|-------------|
| symbols | List[str] | List of index or stock symbols (e.g., ["NIFTY", "HDFCBANK"]) |
| data_type | str | "ohlcv" |
| interval | str | Candle interval (see supported intervals above) |
| exchange | Optional[str] | eg., "NSE", "BSE"; if exchange is not passed default is "NSE" |

Response:
```python
# Response object structure
class OhlcvDataWrapper:
    indexname: str               # Symbol (e.g., "NIFTY")
    exchange: str                # eg., NSE, BSE
    interval: str                # Candle interval
    timestamp: int               # Candle close timestamp in Epoch
    open: int                    # Open price
    high: int                    # High price
    low: int                     # Low price
    close: int                   # Close price
    bucket_volume: int           # Total traded volume within the current candle interval
    tick_volume: int             # Volume of the most recent tick update
    cumulative_volume: int       # Total traded volume for the entire trading session so far today
    bucket_timestamp: int        # Candle start timestamp in Epoch
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

