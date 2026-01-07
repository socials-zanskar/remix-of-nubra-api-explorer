# Historical Market Data

Historical Data API provides the candle data(Open, High, Low, Close) with timestamps for a given time period, for the given scrips, for a specifed candle duration.

```jsx
Method: POST
Endpoint: charts/timeseries
```
### cURL
```bash
curl --location 'https://api.nubra.io/charts/timeseries' \
--header 'x-device-id: TS123' \
--header 'Content-Type: text/plain' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
--data '{
   "query":[
      {
         "exchange":"NSE",
         "type":"STOCK",
         "values":[
            "ASIANPAINT"
         ],
         "fields":[
            "value"
         ],
         "startDate":"2025-02-12T03:45:00.000Z",
         "endDate":"2025-02-12T09:16:39.358Z",
         "interval":"1m",
         "intraDay":false,
         "realTime":false
      }
   ]
}
    '
```

**Payload**

```jsx
{
   "query":[
      {
         "exchange":"NSE",
         "type":"STOCK",
         "values":[
            "ASIANPAINT"
         ],
         "fields":[
            "value"
         ],
         "startDate":"2025-02-12T03:45:00.000Z",
         "endDate":"2025-02-12T09:16:39.358Z",
         "interval":"1m",
         "intraDay":false,
         "realTime":false
      }
   ]
}
```

### Request Parameters

| **Fields** | **Data Type** | **Description** |
| --- | --- | --- |
| exchange | String | Exchange name (e.g., NSE, BSE) |
| type | String | "STOCK", "INDEX" ,"OPT" , "FUT" |
| values | Union[List[str], str]) | One or more instrument symbols e.g. ["ASIANPAINT","NIFTY25JUL25000PE"] |
| fields | List[str]| One or more fields e.g.["open","high","low","close","tick_volume","cumulative_volume","cumulative_volume_premium","cumulative_oi","cumulative_call_oi","cumulative_put_oi","cumulative_fut_oi","l1bid","l1ask","theta","delta","gamma","vega","iv_bid","iv_ask","iv_mid","cumulative_volume_delta"] |
| startDate | str | Start date time format eg. "2025-04-19T11:01:57.000Z" |
| endDate | str | end date time format eg. "2025-04-24T06:13:57.000Z" |
| interval | str | Interval can be "1s , "1m","2m","3m","5m","15m","30m","1h","1d","1w","1mt" |
| intraDay | bool | If True startDate is current date |
| realTime | bool | To be declared |

Note:
Intervals less than 1 day → data for last 3 months
Intervals 1 day or more → data for up to 10 years (stocks)

**Response** 

```jsx
{
  "market_time": "2025-06-12T07:56:46.12844401Z",
  "message": "charts",
  "result": [
    {
      "exchange": "NSE",
      "type": "STOCK",
      "values": [
        {
          "ASIANPAINT": {
            "close": [
              { "ts": 1749699900000000000, "v": 225010 }
            ],
            "cumulative_volume": [
              { "ts": 1749699900000000000, "v": 1211686 }
            ],
            "open": [
              { "ts": 1749699900000000000, "v": 223900 }
            ]
        }
      ]
}
```

## Response attributes

| **Fields** | **Description** |
| --- | --- |
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