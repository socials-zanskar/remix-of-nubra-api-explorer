# Realtime Market Data with Websockets

This section covers the WebSocket API for real-time market data streaming. The Websocket connection provides seamless, low latency access to market data with a real-time connection between your system and the server. This enables users to receive continuous updates on stock prices, volume, and other market data directly from the server.

## Available WebSocket Streams

The Nubra WebSocket API supports multiple real-time market data streams.  
Each stream can be subscribed to independently and delivers structured updates through dedicated callbacks.

| Stream | Description |
|------|-------------|
| [Index Data](#1-index-data) | Live index and stock price updates including last traded value, volume, and change percentage. |
| [Option Chain Data](#2-option-chain-data) | Real-time option chain updates with strikes, Greeks, open interest, and volume for calls and puts. |
| [Order Book Data](#3-order-book-data) | Market depth data showing live bid/ask prices, quantities, and order counts. |
| [Greeks Data](#4-greeks-data) | Tick-level option Greeks including Delta, Gamma, Theta, Vega, and Implied Volatility. |
| [OHLCV Data](#5-ohlcv-data) | Time-based OHLCV candle data across multiple intervals (1m to monthly). |


## WebSocket Connection Setup

The WebSocket connection can be established using the `NubraDataSocket` class, which supports multiple data types and callbacks for different market data streams. All market data (stocks, indices, options, and orderbook) is received through the `on_market_data` callback, while specific data types can be filtered using the subscription method.

=== "Python"
    ```python
    from nubra_python_sdk.ticker import websocketdata
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD
    
    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Define callback functions
    def on_market_data(msg):
        # This callback receives all market data types
        print(f"[MarketData] {msg}")

    def on_index_data(msg):
        print(f"[INDEX] {msg}")

    def on_option_data(msg):
        print(f"[OPTION] {msg}")

    def on_orderbook_data(msg):
        print("[Orderbook] ", msg)

    def on_ohlcv_data(msg):
        print(f"[OHLCV] {msg}")

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
        on_market_data=on_market_data,
        on_index_data=on_index_data,
        on_option_data=on_option_data,
        on_orderbook_data=on_orderbook_data,
        on_ohlcv_data=on_ohlcv_data,
        on_greeks_data=on_greeks_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error,
        )

    socket.connect()
    #Subscribe to different data types
    socket.subscribe(["RELIANCE:20250626"], data_type="option",exchange ="BSE")
    socket.subscribe(["NIFTY", "HDFCBANK"], data_type="index", exchange ="NSE")
    socket.subscribe(["1746686"], data_type="orderbook")
    socket.subscribe(["NIFTY", "HDFCBANK"], data_type="ohlcv", interval = '10m', exchange ="NSE")
    socket.subscribe(["1058227"], data_type="greeks", exchange ="NSE")

    #The below method will block the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

> Note: In version 0.3.5, the new WebSocket endpoint is used by default. To use the older WebSocket endpoint on version 0.3.5, pass socket_v2 = false.
```python
# Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_market_data=on_market_data,
        on_index_data=on_index_data,
        on_option_data=on_option_data,
        on_orderbook_data=on_orderbook_data,
        on_ohlcv_data=on_ohlcv_data,
        on_greeks_data=on_greeks_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error,
        #socket_v2=False
        )
```

## Advance Usage
=== "Python"
    ```python
    # Start WebSocket in a separate thread
    import threading

    def run_websocket():
        socket.connect()
        # Subscribe to different data types
        socket.subscribe(["RELIANCE:20250626"], data_type="option")
        socket.subscribe(["NIFTY", "HDFCBANK"], data_type="index")
        socket.subscribe(["1746686"], data_type="orderbook")
        socket.keep_running()

    websocket_thread = threading.Thread(target=run_websocket)
    websocket_thread.daemon = True
    websocket_thread.start()
    ```

## Market Data

The `on_market_data` callback is the primary receiver for all market data types. It receives real-time updates for stocks, indices, options, and orderbook data through the following wrapper classes:
- `IndexDataWrapper` for stocks and index data
- `OptionChainWrapper` for option chain data
- `OrderBookWrapper` for orderbook data

The data can be filtered using specific subscriptions for each type as described in the Available Data Types section below.

## Available Data Types

The WebSocket API supports the following data types that can be filtered from the market data stream:

### 1. Index Data
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

### 2. Option Chain Data
Subscribes to real-time option chain data. While received through `on_market_data`, can be filtered using the option subscription.

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

    def on_option_data(msg):
        print(f"[OPTION] {msg}")

    def on_connect(msg):
        print("[status]", msg)

    def on_close(reason):
        print(f"Closed: {reason}")

    def on_error(err):
        print(f"Error: {err}")

    # Initialize WebSocket
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_option_data=on_option_data,
        on_connect=on_connect,
        on_close=on_close,
        on_error=on_error
        )

    socket.connect()
    #Subscribe to different data types
    socket.subscribe(["RELIANCE:20250626"], data_type="option", exchange ="NSE")

    #Infinite loop on the main thread. Nothing after this will run.
    #You have to use the pre-defined callbacks to manage subscriptions.
    socket.keep_running()
    ```

| Attribute | Data Type | Description|
|----------|----------|----------|
| symbols | List[str] | List of option symbols with expiry (e.g., ['RELIANCE:20250626']) |
| data_type | str | "option" |
| exchange | Optional[str]| eg., "NSE" , "BSE" ;if excahnge is not passed default is "NSE"|

Response:
```python
# Response object structure
class OptionChainWrapper:
    asset: str                    # Asset name (e.g., "RELIANCE")
    expiry: str                   # Expiry date in YYYYMMDD format
    at_the_money_strike: int      # At-the-money strike price
    current_price: int          # Current price of the underlying
    exchange: str               # eg. NSE, BSE

    # Call Options (CE)
    ce: List[OptionData]          # List of Call Option objects

    # Put Options (PE)
    pe: List[OptionData]          # List of Put Option objects

class OptionData:
    ref_id: int                                   # Reference ID               
    timestamp: int                                # Timestamp in Epoch
    strike_price: int                             # Strike price
    lot_size: int                                 # Lot size
    last_traded_price: Optional[int]            # Last traded price
    last_traded_price_change: Optional[float]     # Last traded price change
    iv: Optional[float]                           # Implied volatility
    delta: Optional[float]                        # Delta value
    gamma: Optional[float]                        # Gamma value
    theta: Optional[float]                        # Theta value
    vega: Optional[float]                         # Vega value
    volume: Optional[int]                         # Volume
    open_interest: Optional[int]                  # Open interest
    previous_open_interest: Optional[int]         # Open interest change
```

### 3. Order Book Data
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
### 4. Greeks Data

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

### 5. OHLCV Data

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

