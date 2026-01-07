# Holdings

Provides a detailed snapshot of all active holdings in the demat account, including invested value, current market value, day and overall PnL (both absolute and percentage), margin benefit, haircut, and pledge availability for each stock. Also includes client-level statistics such as total investment, net PnL, and daily PnL performance.

```jsx
Method: GET
Endpoint: portfolio/holdings
```
### cURL
```bash
curl --location 'https://api.nubra.io/portfolio/holdings' \
--header 'x-device-id: TS123' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

**Response Structure**

```jsx
{
    "message": "holdings",
    "portfolio": {
        "client_code": "ZRL001",
        "holding_stats": {
            "invested_amount": 743039,
            "current_value": 763165,
            "total_pnl": 20126,
            "total_pnl_chg": 2.7086062,
            "day_pnl": -31795,
            "day_pnl_chg": -3.9995723
        },
        "holdings": [
            {
                "ref_id": 83414,
                "nubra_name": "STOCK_TVSMOTOR.NSECM",
                "displayName": "TVSMOTOR",
                "derivative_type": "STOCK",
                "strike_price": 0,
                "lot_size": 1,
                "exchange": "NSE",
                "asset": "TVSMOTOR",
                "symbol": "TVSMOTOR",
                "qty": 1,
                "pledged_qty": 0,
                "t1_qty": 0,
                "avg_price": 245292,
                "prev_close": 273790,
                "ltp": 246625,
                "ltp_chg": -9.921838,
                "invested_value": 245292,
                "current_value": 246625,
                "net_pnl": 1333,
                "net_pnl_chg": 0.54343396,
                "day_pnl": -27165,
                "haircut": 14.93,
                "margin_benefit": 209803
                "available_to_pledge":1
                "is_pledgeable": true,
                "supported_exchanges": {
                    "BSE": 847854,
                    "NSE": 73082}
            }
        ]
    }
}
```

**Response Attributes**

| **Fields** | **Description** |
| --- | --- |
| `message` | Response message |
| `portfolio.client_code` | Unique client code linked to the demat account |
| `portfolio.holding_stats.invested_amount` | Total capital invested across all holdings |
| `portfolio.holding_stats.current_value` | Current market value of all holdings |
| `portfolio.holding_stats.total_pnl` | Total profit or loss (absolute value) |
| `portfolio.holding_stats.total_pnl_chg` | Total profit or loss percentage |
| `portfolio.holding_stats.day_pnl` | Intraday mark-to-market profit or loss |
| `portfolio.holding_stats.day_pnl_chg` | Intraday profit or loss percentage |
| `portfolio.holdings[].ref_id` | Internal reference ID for the instrument |
| `portfolio.holdings[].nubra_name` | Full instrument name used in Nubra |
| `portfolio.holdings[].displayName` | Display name of the holding shown in UI |
| `portfolio.holdings[].derivative_type` | Type of instrument (e.g., FUT, OPT, EQ) |
| `portfolio.holdings[].strike_price` | Strike price (if applicable) |
| `portfolio.holdings[].lot_size` | Lot size of the instrument |
| `portfolio.holdings[].exchange` | Exchange where the instrument is listed (e.g., NSE, BSE) |
| `portfolio.holdings[].asset` | Asset class (Equity, Derivative, etc.) |
| `portfolio.holdings[].symbol` | Trading symbol of the holding |
| `portfolio.holdings[].quantity` | Total quantity currently held |
| `portfolio.holdings[].pledged_qty` | Quantity pledged as collateral |
| `portfolio.holdings[].t1_qty` | T+1 unsettled quantity |
| `portfolio.holdings[].avg_price` | Average acquisition price |
| `portfolio.holdings[].prev_close` | Previous closing price |
| `portfolio.holdings[].last_traded_price` | Most recent traded price |
| `portfolio.holdings[].last_traded_price_change` | % change in LTP from previous close |
| `portfolio.holdings[].invested_value` | Total invested value in this holding |
| `portfolio.holdings[].current_value` | Current market value of this holding |
| `portfolio.holdings[].net_pnl` | Net profit or loss for this holding |
| `portfolio.holdings[].net_pnl_chg` | Net profit/loss percentage |
| `portfolio.holdings[].day_pnl` | Intraday profit or loss |
| `portfolio.holdings[].haircut` | Haircut percentage applied to pledged value |
| `portfolio.holdings[].margin_benefit` | Margin benefit available from pledge |
| `portfolio.holdings[].available_to_pledge` | Quantity that can still be pledged |
| `portfolio.holdings[].is_pledgeable` | Available to pledge |