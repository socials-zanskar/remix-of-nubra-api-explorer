# Funds

Provides live cash and margin breakdown including blocked funds, margin used, collateral pledged and available balance.

```jsx
Method: GET
Endpoint: portfolio/user_funds_and_margin
```
### cURL
```bash
curl --location 'https://api.nubra.io/portfolio/user_funds_and_margin' \
--header 'x-device-id: TS123' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### Response Structure

```jsx
{
    "message": "portfolio and funds values fetched successfully",
    "port_funds_and_margin": {
        "client_code": "XXXXX",
        "start_of_day_funds": 2888888,
        "pay_in_credit": 0,
        "pay_out_debit": 0,
        "net_derivative_prem_buy": 5612625,
        "net_derivative_prem_sell": 5538000,
        "net_derivative_prem": -74625,
        "cash_blocked_cnc_traded": 1868,
        "cash_blocked_cnc_open": 0,
        "cash_blocked_deriv_open": 0,
        "cash_cnc_traded_and_open": 1868,
        "mtm_deriv": -74625,
        "mtm_eq_iday_cnc": -555,
        "mtm_eq_delivery": -222027,
        "net_trading_amount": 28680916,
        "net_withdrawal_amount": 23115099,
        "total_payin_cash": 0,
        "start_of_day_collateral": 0,
        "iday_collateral_pledge": 0,
        "iday_collateral_pledge_sell": 0,
        "total_collateral": 0,
        "margin_used_deriv_traded": 0,
        "margin_block_deriv_open_order": 0,
        "margin_used_eq_iday": 27817,
        "margin_blocked_eq_iday_open": 0,
        "net_margin_available": 28653099,
        "total_margin_blocked": 27817,
        "derivative_margin_blocked": 0,
        "brokerage": 18788
    }
}
```

### Response Attributes

| **Field** | **Description** |
| --- | --- |
| `message` | Response message |
| `portfolio.client_code` | Unique client code linked to the demat account |
| `portfolio.funds.available_balance` | Available cash balance for trading |
| `portfolio.funds.blocked_amount` | Amount blocked for pending orders |
| `portfolio.funds.margin_used` | Margin currently being used |
| `portfolio.funds.collateral_pledged` | Value of securities pledged as collateral |
| `portfolio.funds.total_balance` | Total account balance | 