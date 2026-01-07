# Holdings

Provides a detailed snapshot of all active holdings in the demat account, including invested value, current market value, day and overall PnL (both absolute and percentage), margin benefit, haircut, and pledge availability for each stock. Also includes client-level statistics such as total investment, net PnL, and daily PnL performance.

### Usage

=== "Python"
    ```python
    from nubra_python_sdk.portfolio.portfolio_data import NubraPortfolio
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

    # Initialize the portfolio 
    portfolio = NubraPortfolio(nubra)

    # Get holdings of portfolio 
    result = portfolio.holdings()
    ```

## Accessing Data

=== "Python"
    ```python
    
    # Portfolio Stats
    print(f"Client Code: {result.portfolio.client_code}")
    print(f"Invested Amount: {result.portfolio.holding_stats.invested_amount}")
    print(f"Total PnL: {result.portfolio.holding_stats.total_pnl}")
    print(f"Total PnL % Change: {result.portfolio.holding_stats.total_pnl_chg}")
    print(f"Day PnL: {result.portfolio.holding_stats.day_pnl}")
    print(f"Day PnL % Change: {result.portfolio.holding_stats.day_pnl_chg}")

    # First Holding Details
    print(f"\nSymbol: {result.portfolio.holdings[0].symbol}")
    print(f"Nubra Name: {result.portfolio.holdings[0].nubra_name}")
    print(f"Avg Price: {result.portfolio.holdings[0].avg_price}")
    print(f"Previous Close: {result.portfolio.holdings[0].prev_close}")
    print(f"Last Traded Price: {result.portfolio.holdings[0].last_traded_price}")
    print(f"Last Traded Price % Change: {result.portfolio.holdings[0].last_traded_price_change}")
    print(f"Invested Value: {result.portfolio.holdings[0].invested_value}")
    print(f"Current Value: {result.portfolio.holdings[0].current_value}")
    print(f"Margin Benefit: {result.portfolio.holdings[0].margin_benefit}")
    print(f"Haircut: {result.portfolio.holdings[0].haircut}")
    print(f"Net PnL: {result.portfolio.holdings[0].net_pnl}")
    print(f"Net PnL % Change: {result.portfolio.holdings[0].net_pnl_chg}")
    print(f"Day PnL: {result.portfolio.holdings[0].day_pnl}")
    ```

### Response Structure

```python
class HoldingsMessage:
    message: str
    portfolio: Portfolio

class Portfolio:
    client_code: str
    holding_stats: HoldingStats
    holdings: List[Holding]
    
class HoldingStats:
    invested_amount: Optional[int]
    current_value: Optional[int]
    total_pnl: Optional[int]
    total_pnl_chg: Optional[float]
    day_pnl: Optional[int]
    day_pnl_chg: Optional[float]
    
class Holding:
    ref_id: int 
    nubra_name: str
    displayName: str
    derivative_type: str
    strike_price: Optional[int]
    lot_size: Optional[int]
    exchange: str
    asset: str
    symbol: str
    quantity: int
    pledged_qty: Optional[int]
    t1_qty: Optional[int]
    avg_price: Optional[int]
    prev_close: Optional[int]
    last_traded_price: Optional[int]
    last_traded_price_change: Optional[float]
    invested_value: Optional[int]
    current_value: Optional[int]
    net_pnl: Optional[int]
    net_pnl_chg: Optional[float]
    day_pnl: Optional[int]
    haircut: Optional[float]
    margin_benefit: Optional[int]
    available_to_pledge: Optional[int]
    is_pledgeable : Optional[bool]
```

### Response Attributes

| Field | Description |
|-------|-------------|
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