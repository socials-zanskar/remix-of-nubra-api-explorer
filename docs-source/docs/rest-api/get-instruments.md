# Get Instruments

Retrieve instrument reference data for a specific date.

```jsx
Method:GET
Endpoint:refdata/refdata/{Date}?exchange=NSE
```

### cURL
```bash
curl --location 'https://api.nubra.io/refdata/refdata/2025-06-27?exchange=NSE' \
--header 'x-device-id: TS1234' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6IlRTMTIzNCIsImV4cCI6MTc1MTA1Mjc2MSwibG9naW5fbW9kZSI6InVzZXIiLCJzZXNzaW9uSWQiOiI4N2QxZDE5YS0zZTkyLTQ4MWItYTQ3OC1mMDA5MTVmNjMyNWQiLCJzdWIiOiJhYmhpbmF2Nzk0N0BnbWFpbC5jb20iLCJ1c2VySWQiOjIyNH0.l60cnTEUspV1PXhM7LMdrLPPB6ZXBWkZvROEwpYLYdE'
```

### Parameters
- `date` (path parameter): The date for which to retrieve instrument data in YYYY-MM-DD format

## Headers
- `x-device-id`: Device identifier
- `Authorization`: Bearer token for authentication

## Sample Response

```json
{
    "exchange": "NSE",
    "is_trading_on": true,
    "message": "refdata",
    "refdata": [
        {
            "ref_id": 739119,
            "strike_price": 2990000,
            "option_type": "CE",
            "token": 35187,
            "stock_name": "NIFTY2570329900CE",
            "series": "__",
            "zanskar_name": "OPT_NIFTY_20250703_CE_2990000",
            "lot_size": 75,
            "asset": "NIFTY",
            "expiry": 20250703,
            "exchange": "NSE",
            "derivative_type": "OPT",
            "isin": "N/A         ",
            "asset_type": "INDEX_FO",
            "tick_size": 5,
            "underlying_prev_close": 2554900
        }
    ]
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `is_trading_on` | boolean | Indicates if trading is active on the specified date |
| `message` | string | Response message |
| `refdata` | array | Array of instrument reference data |

### Instrument Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `ref_id` | integer | Unique reference ID for the instrument |
| `strike_price` | integer | Strike price for options |
| `option_type` | string | Option type (CE for Call, PE for Put) |
| `token` | integer | Token identifier |
| `stock_name` | string | Stock/instrument name |
| `series` | string | Series identifier |
| `zanskar_name` | string | Zanskar platform specific name |
| `lot_size` | integer | Lot size for the instrument |
| `asset` | string | Underlying asset name |
| `expiry` | integer | Expiry date in YYYYMMDD format |
| `exchange` | string | Exchange code (NSE, BSE, etc.) |
| `derivative_type` | string | Type of derivative (OPT for options) |
| `isin` | string | ISIN code |
| `asset_type` | string | Asset type classification |
| `tick_size` | integer | Minimum price movement |
| `underlying_prev_close` | integer | Previous closing price of underlying asset |




