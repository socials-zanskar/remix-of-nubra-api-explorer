# Historical Data

Historical Data API provides the candle data(Open, High, Low, Close) with timestamps for a given time period, for the given scrips, for a specifed candle duration. 

## Usage

=== "Python"
    ```python
    from nubra_python_sdk.marketdata.market_data import MarketData
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Initialize MarketData with the client
    mdInstance = MarketData(nubra)
    result = mdInstance.historical_data({
        "exchange": "NSE",
        "type": "STOCK",
        "values": ["ASIANPAINT", "TATAMOTORS"],
        "fields": ["close", "high", "low", "open", "cumulative_volume"],
        "startDate": "2025-04-19T11:01:57.000Z",
        "endDate": "2025-04-24T06:13:57.000Z",
        "interval": "1d",
        "intraDay": False, # If set to True, then startDate and endDate will be ignored, and the current date will be used.
        "realTime": False
    })

    ```

###Accessing Data

=== "Python"
    ```python
    # Access values only after checking data exists in any variable as based on request some fields may not have value
    print(f"Market Time: {result.market_time}")
    print(f"Message: {result.message}")

    for data in result.result:
        print(f"Exchange: {data.exchange}")
        print(f"Type: {data.type}")
        for stock_data in data.values:
            for symbol, values in stock_data.items():
                print(f"\n{symbol}:")
                print(f"  Close: {[{'timestamp': v.timestamp, 'value': v.value} for v in values.close]}")
                print(f"  High: {[{'timestamp': v.timestamp, 'value': v.value} for v in values.high]}")
                print(f"  Low: {[{'timestamp': v.timestamp, 'value': v.value} for v in values.low]}")
                print(f"  Open: {[{'timestamp': v.timestamp, 'value': v.value} for v in values.open]}")
                print(f"  Volume: {[{'timestamp': v.timestamp, 'value': v.value} for v in values.cumulative_volume]}")

    ```

## Request Parameters

=== "Python"
    | Attribute | Data Type | Description|
    |----------|----------|----------|
    | exchange| String | Exchange name (e.g., NSE, BSE) |
    | type | String| "STOCK", "INDEX" ,"OPT" , "FUT"|
    | values | Union[List[str], str])| One or more instrument symbols e.g. ["ASIANPAINT","TATAMOTORS"],["HDFCBANK25MAY2380CE"],["NIFTY2550822400PE"]|
    | fields | List[str]| One or more fields e.g.["open","high","low","close","tick_volume","cumulative_volume","cumulative_volume_premium","cumulative_oi","cumulative_call_oi","cumulative_put_oi","cumulative_fut_oi","l1bid","l1ask","theta","delta","gamma","vega","iv_bid","iv_ask","iv_mid","cumulative_volume_delta"] |
    | startDate | str| Start date time format eg. "2025-04-19T11:01:57.000Z"|
    | endDate | str| end date time format eg. "2025-04-24T06:13:57.000Z"|
    | interval | str| Interval can be "1s","1m","2m","3m","5m","15m","30m","1h","1d","1w","1mt" |
    | intraDay | bool| If True startDate is current date |
    | realTime | bool| To be declared |

### Notes
> Intervals less than 1 day → data for last 3 months

> Intervals 1 day or more → data for up to 10 years (stocks)

> **1s interval special case**  
> - Supported only for the **previous 7 days**  
> - `startDate` and `endDate` must fall on the **same calendar day**

(In PROD environment)

## Response Structure

=== "Python"
    ```python
    # Response object structure
    class MarketChartsResponse:
        market_time: str  # e.g. "2025-04-30T10:00:000Z"
        message: str      # e.g. "charts"
        result: List[ChartData]

    class ChartData:
        exchange: str     # e.g. "NSE"
        type: str         # e.g. "STOCK"
        values: List[Dict[str, StockChart]]

    class StockChart:
        open: Optional[List[TimeSeriesPoint]] 
        high: Optional[List[TimeSeriesPoint]]
        low: Optional[List[TimeSeriesPoint]] 
        close: Optional[List[TimeSeriesPoint]] 
        tick_volume: Optional[List[TimeSeriesPoint]] 
        theta: Optional[List[TickPoint]] 
        delta: Optional[List[TickPoint]] 
        gamma: Optional[List[TickPoint]] 
        vega: Optional[List[TickPoint]] 
        iv_bid: Optional[List[TickPoint]] 
        iv_ask: Optional[List[TickPoint]] 
        iv_mid: Optional[List[TickPoint]] 
        cumulative_volume: Optional[List[TimeSeriesPoint]] 
        cumulative_volume_delta: Optional[List[TickPoint]] 
        cumulative_volume_premium: Optional[List[TimeSeriesPoint]] 
        cumulative_oi: Optional[List[TimeSeriesPoint]] 
        cumulative_call_oi: Optional[List[TimeSeriesPoint]] 
        cumulative_put_oi : Optional[List[TimeSeriesPoint]] 
        cumulative_fut_oi: Optional[List[TimeSeriesPoint]] 
        l1bid: Optional[List[TimeSeriesPoint]] 
        l1ask: Optional[List[TimeSeriesPoint]] 

    class Tickpoint:
        timestamp: Optional[int] 
        value: Optional[float] 

    class TimeSeriesPoint:
        timestamp: int       # Timestamp in Epoch
        value: int         # Value at the timestamp
    ```


## Response attributes

=== "Python"
    | Attribute | Description |
    |-----------|-------------|
    | market_time | Current market time in ISO format |
    | message | Response message type (e.g. "charts") |
    | result | List of DataResult objects containing the historical data |
    | result[].exchange | Exchange name (e.g. "NSE") |
    | result[].type | Security type (e.g. "STOCK", "INDEX") |
    | result[].values | List of dictionaries containing data for each symbol |
    | result[].values[].{symbol} | SymbolData object containing OHLCV data for specific symbol |
    | result[].values[].{symbol}.{field} | List of DataPoint objects for each requested field |
    | result[].values[].{symbol}.{field}[].timestamp | Timestamp in nanoseconds |
    | result[].values[].{symbol}.{field}[].value | Value for the field at given timestamp |

