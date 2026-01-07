# Funds

Provides live cash and margin breakdown including blocked funds, margin used, collateral pledged and available balance.

## Usage

=== "Python"
    ```python
    from nubra_python_sdk.portfolio.portfolio_data import NubraPortfolio
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # Initialize the Nubra SDK client
    # Use NubraEnv.UAT for testing or NubraEnv.PROD for production
    nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

    ##using totp login and .env file 
    #nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)
    
    portfolio = NubraPortfolio(nubra)

    # Initialize Funds
    result = portfolio.funds()
    ```

## Accessing Data

=== "Python"
    ```python

    # Funds and Margin Details
    print(f"Client Code: {result.port_funds_and_margin.client_code}")
    print(f"Start of Day Funds: {result.port_funds_and_margin.start_of_day_funds}")
    print(f"Cash Blocked for CNC Traded: {result.port_funds_and_margin.cash_blocked_cnc_traded}")
    print(f"Cash for CNC Traded & Open Positions: {result.port_funds_and_margin.cash_cnc_traded_and_open}")
    print(f"MTM for EQ IDAY + CNC: {result.port_funds_and_margin.mtm_eq_iday_cnc}")
    print(f"MTM for EQ Delivery: {result.port_funds_and_margin.mtm_eq_delivery}")
    print(f"Net Trading Amount: {result.port_funds_and_margin.net_trading_amount}")
    print(f"Net Withdrawal Amount: {result.port_funds_and_margin.net_withdrawal_amount}")
    print(f"Start of Day Collateral: {result.port_funds_and_margin.start_of_day_collateral}")
    print(f"Total Collateral: {result.port_funds_and_margin.total_collateral}")
    print(f"Net Margin Available: {result.port_funds_and_margin.net_margin_available}")
    ```

## Response Structure

```python
   
class PFMMessage:
    message: str
    port_funds_and_margin: PFMStruct
    
class PFMStruct:
    client_code: str
    start_of_day_funds: Optional[int]
    pay_in_credit: Optional[int]
    pay_out_debit: Optional[int] 
    net_derivative_prem_buy: Optional[int]
    net_derivative_prem_sell: Optional[int]
    net_derivative_prem: Optional[int]
    cash_blocked_cnc_traded: Optional[int] 
    cash_blocked_cnc_open: Optional[int]
    cash_blocked_deriv_open: Optional[int]
    cash_cnc_traded_and_open: Optional[int]
    mtm_deriv: Optional[int]
    mtm_eq_iday_cnc: Optional[int]
    mtm_eq_delivery: Optional[int]
    net_trading_amount: Optional[int]
    net_withdrawal_amount: Optional[int]
    total_payin_cash: Optional[int]
    start_of_day_collateral: Optional[int]
    iday_collateral_pledge: Optional[int]
    iday_collateral_pledge_sell: Optional[int]
    total_collateral: Optional[int]
    margin_used_deriv_traded: Optional[int]
    margin_block_deriv_open_order: Optional[int]
    margin_used_eq_iday: Optional[int]
    margin_blocked_eq_iday_open: Optional[int]
    net_margin_available: Optional[int]
    total_margin_blocked: Optional[int]
    derivative_margin_blocked: Optional[int]
    brokerage: Optional[int]
```

## Response Attributes

| Field | Description |
|-------|-------------|
| `message` | Status message of the funds and margin API response |
| `port_funds_and_margin.client_code` | Unique client code linked to the trading account |
| `port_funds_and_margin.start_of_day_funds` | Available cash balance at the start of the trading day |
| `port_funds_and_margin.pay_in_credit` | Funds credited from client's pay-in |
| `port_funds_and_margin.pay_out_debit` | Funds debited due to payout requests |
| `port_funds_and_margin.net_derivative_prem_buy` | Net premium paid for buying options contracts |
| `port_funds_and_margin.net_derivative_prem_sell` | Net premium received from selling options |
| `port_funds_and_margin.net_derivative_prem` | Net of premium buy and sell for derivatives |
| `port_funds_and_margin.cash_blocked_cnc_traded` | Cash blocked for CNC (delivery) trades placed |
| `port_funds_and_margin.cash_blocked_cnc_open` | Cash blocked for CNC trades that are still open |
| `port_funds_and_margin.cash_blocked_deriv_open` | Cash blocked for open derivative orders |
| `port_funds_and_margin.cash_cnc_traded_and_open` | Combined cash blocked for traded and open CNC orders |
| `port_funds_and_margin.mtm_deriv` | Mark-to-market PnL from derivative positions |
| `port_funds_and_margin.mtm_eq_iday_cnc` | MTM from intraday and CNC (equity) trades |
| `port_funds_and_margin.mtm_eq_delivery` | MTM for delivery-based equity positions |
| `port_funds_and_margin.net_trading_amount` | Net value of trades executed during the day |
| `port_funds_and_margin.net_withdrawal_amount` | Total amount withdrawn or requested to withdraw |
| `port_funds_and_margin.total_payin_cash` | Total pay-in cash received (if available) |
| `port_funds_and_margin.start_of_day_collateral` | Collateral value available at the start of the day |
| `port_funds_and_margin.iday_collateral_pledge` | Intraday margin received from pledged holdings |
| `port_funds_and_margin.iday_collateral_pledge_sell` | Margin received from intraday sale of pledged holdings |
| `port_funds_and_margin.total_collateral` | Total collateral margin currently available |
| `port_funds_and_margin.margin_used_deriv_traded` | Margin used for traded derivative positions |
| `port_funds_and_margin.margin_block_deriv_open_order` | Margin blocked for open derivative orders |
| `port_funds_and_margin.margin_used_eq_iday` | Margin used for intraday equity positions |
| `port_funds_and_margin.margin_blocked_eq_iday_open` | Margin blocked for open intraday equity orders |
| `port_funds_and_margin.net_margin_available` | Net margin still available for trading |
| `port_funds_and_margin.total_margin_blocked` | Total margin currently blocked across all segments |
| `port_funds_and_margin.derivative_margin_blocked` | Total margin currently blocked in derivative segment |
| `port_funds_and_margin.brokerage` | Brokerage |