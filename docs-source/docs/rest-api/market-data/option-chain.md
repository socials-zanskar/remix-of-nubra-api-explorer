# Option Chain

Provides entire Option Chain of any Option Instrument. This includes OI, greeks, volume, top bid/ask and price data of all strikes of a particular underlying scrip.

```jsx
Method: GET
Endpoint: optionchains/{instrument}?exchange=NSE&expiry={expiry}
```
### cURL
```bash
curl --location --globoff 'https://api.nubra.io/optionchains/{instrument}?exchange=NSE&expiry={expiry}' \
--header 'x-device-id: TS123' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### Response Structure

```jsx
{
  "chain": {
    "asset": "NIFTY",
    "exchange": "NSE",
    "expiry": "20250626",
    "ce": [
      {
        "ref_id": 3069,
        "inst_id": 62205,
        "ts": 1749715212000000000,
        "sp": 2265000,
        "ls": 75,
        "ltp": 0,
        "ltpchg": null,
        "iv": null,
        "delta": 0.9884471,
        "gamma": 6.654546e-05,
        "theta": -1.111143,
        "vega": 1.4857718,
        "oi": 2700,
        "volume": 0
      }
    ],
    "pe": [
      {
        "ref_id": 3089,
        "inst_id": 62309,
        "ts": 1749715212000000000,
        "sp": 2320000,
        "ls": 75,
        "ltp": 189255,
        "ltpchg": -6.4760823,
        "iv": null,
        "delta": 0.9808698,
        "gamma": 8.9285655e-05,
        "theta": -1.4506115,
        "vega": 2.2921157,
        "oi": 58125,
        "volume": 375
      }
    ],
    "atm": 2495000,
    "cp": 2496260,
    "all_expiries": [
      "20250612",
      "20250619",
      "20250626"
    ]
  },
  "message": "option chains"
}
```

### Response Attributes

| **Fields** | **Description** |
| --- | --- |
| chain | OptionChain object containing the option chain data |
| chain.asset | Underlying asset symbol |
| chain.expiry | Expiry date of the options |
| chain.ce | List of Option objects for call options |
| chain.pe | List of Option objects for put options |
| chain.at_the_money_strike | At-the-money strike price |
| chain.current_price | Current price of underlying |
| chain.all_expiries | List of available expiry dates |
| chain.[ce/pe][].ref_id | Reference ID of the option |
| chain.[ce/pe][].timestamp | Timestamp in Epoch |
| chain.[ce/pe][].strike_price | Strike price |
| chain.[ce/pe][].lot_size | Lot size |
| chain.[ce/pe][].last_traded_price | Last traded price |
| chain.[ce/pe][].last_traded_price_change | Change in last traded price (percentage) |
| chain.[ce/pe][].iv | Implied volatility |
| chain.[ce/pe][].delta | Option delta |
| chain.[ce/pe][].gamma | Option gamma |
| chain.[ce/pe][].theta | Option theta |
| chain.[ce/pe][].vega | Option vega |
| chain.[ce/pe][].open_interest | Open interest |
| chain.[ce/pe][].volume | Trading volume |
| message | Response message | 