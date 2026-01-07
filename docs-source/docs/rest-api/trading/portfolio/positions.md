# Positions

Returns open and closed positions across stocks, futures, and options. Includes key details like symbol, quantity, average prices, last traded price, order side, and a comprehensive PnL breakdown — including realised, unrealised, and total PnL with percentage changes.

```jsx
Method: GET
Endpoint: portfolio/positions
```

### cURL
```bash
curl --location 'https://api.nubra.io/portfolio/positions' \
--header 'x-device-id: TS123' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### Response Structure

```jsx
{
    "message": "positions",
    "portfolio": {
        "client_code": "XXXXXX",
        "position_stats": {
            "realised_pnl": 0,
            "unrealised_pnl": 0,
            "total_pnl": -75180,
            "total_pnl_chg": -35.191193
        },
        "stock_positions": [
            {
                "ref_id": 847854,
                "zanskar_name": "STOCK_YESBANK_EQ_A.BSECM",
                "display_name": "YESBANK",
                "derivative_type": "STOCK",
                "strike_price": 0,
                "lot_size": 1,
                "exchange": "BSE",
                "asset": "YESBANK",
                "symbol": "YESBANK",
                "product": "ORDER_DELIVERY_TYPE_CNC",
                "order_side": "BUY",
                "qty": 1,
                "ltp": 1853,
                "avg_price": 1868,
                "avg_buy_price": 1868,
                "avg_sell_price": 0,
                "pnl": -15,
                "pnl_chg": -0.8029979
            },
        ],
        "fut_positions": null,
        "opt_positions": null,
        "close_positions": [
            {
                "ref_id": 808198,
                "zanskar_name": "OPT_NIFTY_20250814_PE_2445000",
                "display_name": "NIFTY 14 Aug 24450 PE",
                "derivative_type": "OPT",
                "strike_price": 2445000,
                "lot_size": 75,
                "exchange": "NSE",
                "asset": "NIFTY",
                "symbol": "NIFTY2581424450PE",
                "product": "ORDER_DELIVERY_TYPE_IDAY",
                "order_side": "C",
                "qty": 225,
                "ltp": 15195,
                "avg_price": 12010,
                "avg_buy_price": 12473,
                "avg_sell_price": 12010,
                "pnl": -104175,
                "pnl_chg": 0
            }
        ]
    }
}
```

### Response Attributes

| **Field** | **Description** |
| --- | --- |
| `message` | Response message |
| `portfolio.client_code` | Unique client code linked to the demat account |
| `portfolio.position_stats.realised_pnl` | Realised profit or loss |
| `portfolio.position_stats.unrealised_pnl` | Unrealised profit or loss |
| `portfolio.position_stats.total_pnl` | Total profit or loss (absolute value) |
| `portfolio.position_stats.total_pnl_chg` | Total profit or loss percentage |
| `portfolio.stock_positions[].ref_id` | Internal reference ID for the instrument |
| `portfolio.stock_positions[].zanskar_name` | Full instrument name used by Nubra |
| `portfolio.stock_positions[].display_name` | Display name of the position shown in UI |
| `portfolio.stock_positions[].derivative_type` | Type of instrument (e.g., FUT, OPT, EQ) |
| `portfolio.stock_positions[].strike_price` | Strike price (if applicable) |
| `portfolio.stock_positions[].lot_size` | Lot size of the instrument |
| `portfolio.stock_positions[].exchange` | Exchange where the instrument is listed (e.g., NSE, BSE) |
| `portfolio.stock_positions[].asset` | Asset class (Equity, Derivative, etc.) |
| `portfolio.stock_positions[].symbol` | Trading symbol of the position |
| `portfolio.stock_positions[].product` | Product type (CNC, MIS, etc.) |
| `portfolio.stock_positions[].order_side` | Buy or Sell side |
| `portfolio.stock_positions[].quantity` | Total quantity in position |
| `portfolio.stock_positions[].last_traded_price` | Most recent traded price |
| `portfolio.stock_positions[].avg_price` | Average price of the position |
| `portfolio.stock_positions[].avg_buy_price` | Average buy price |
| `portfolio.stock_positions[].avg_sell_price` | Average sell price |
| `portfolio.stock_positions[].pnl` | Profit or loss for this position |
| `portfolio.stock_positions[].pnl_chg` | Profit/loss percentage | 