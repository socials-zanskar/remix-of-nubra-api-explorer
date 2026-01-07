# Option Chain

Provides entire Option Chain of any Option Instrument. This includes OI, greeks, volume, top bid/ask and price data of all strikes of a particular underlying scrip.

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

    # Get option chain for an instrument
    result = mdInstance.option_chain("NIFTY",exchange="NSE") 
    ```

###Accessing Data

=== "Python"
    ```python

    # Access the chain data
    chain = result.chain
    print(f"Current Price: {chain.current_price}")
    print(f"ATM Strike: {chain.at_the_money_strike}")
    print(f"Available Expiries: {chain.all_expiries}")


    # Find and print ATM options
    print("\nATM Options:")
    atm_ce = next((opt for opt in chain.ce if opt.strike_price == chain.at_the_money_strike), None)
    atm_pe = next((opt for opt in chain.pe if opt.strike_price == chain.at_the_money_strike), None)

    if atm_ce:
        print("Call Option:")
        print(f"Ref Id: {atm_ce.ref_id}")
        print(f"Strike Price: {atm_ce.strike_price}")
        print(f"LTP: {atm_ce.last_traded_price}")
        print(f"LTP Change : {atm_ce.last_traded_price_change}")
        print(f"OI: {atm_ce.open_interest}")
        print(f"Volume: {atm_ce.volume}")
        print(f"Lot Size: {atm_ce.lot_size}")
        print(f"IV: {atm_ce.iv}")
        print(f"Delta: {atm_ce.delta}")
        print(f"Gamma: {atm_ce.gamma}")
        print(f"Theta: {atm_ce.theta}")
        print(f"Vega: {atm_ce.vega}")


    if atm_pe:
        print("\nPut Option:")
        print(f"Ref Id: {atm_pe.ref_id}")
        print(f"Strike Price: {atm_pe.strike_price}")
        print(f"LTP: {atm_pe.last_traded_price}")
        print(f"LTP Change : {atm_pe.last_traded_price_change}")
        print(f"OI: {atm_pe.open_interest}")
        print(f"Volume: {atm_pe.volume}")
        print(f"Lot Size: {atm_pe.lot_size}")
        print(f"IV: {atm_pe.iv}")
        print(f"Delta: {atm_pe.delta}")
        print(f"Gamma: {atm_pe.gamma}")
        print(f"Theta: {atm_pe.theta}")
        print(f"Vega: {atm_pe.vega}")
    ```


## Request Parameters

=== "Python"
    | Attribute | Data Type | Description|
    |----------|----------|----------|
    | instrument`required`| String | Underlying instrument symbol (e.g. "NIFTY") |
    | expiry | String | Expiry date in YYYYMMDD format (e.g. "20250508") |
    | exchange | String | "NSE" , "BSE" |


## Response Structure

=== "Python"
    ```python
    # Response object structure
    class OptionChainWrapper:
        chain: OptionChain
        message: str
        exchange: str

    class OptionChain:
        asset: str                    # Underlying asset symbol
        expiry: str                   # Expiry date
        ce: List[OptionData]          # Call options
        pe: List[OptionData]          # Put options
        at_the_money_strike: int      # At-the-money strike price
        current_price: int            # Current price of underlying
        all_expiries: List[str]       # Available expiry dates

    class OptionData:
        ref_id: int                     # Reference ID of the option
        timestamp: int                  # Timestamp in Epoch
        strike_price: int               # Strike price
        lot_size: int                   # Lot size
        last_traded_price: int          # Last traded price
        last_traded_price_change: float # Change in last traded price (percentage)
        iv: float                       # Implied volatility
        delta: float                    # Option delta
        gamma: float                    # Option gamma
        theta: float                    # Option theta
        vega: float                     # Option vega
        open_interest: int              # Open interest
        open_interest_change: float     # Open interest Change
        volume: int                     # Trading volume

    ```

## Response attributes

=== "Python"
    | Attribute | Description |
    |-----------|-------------|
    | chain | Option Chain object containing the option chain data |
    | chain.asset | Underlying asset symbol |
    | chain.expiry | Expiry date of the options |
    | chain.ce | List of Option objects for call options |
    | chain.pe | List of Option objects for put options |
    | chain.at_the_money_strike | At-the-money strike price |
    | chain.current_price | Current price of underlying |
    | chain.all_expiries | List of available expiry dates |
    | chain.[ce/pe][i].ref_id | Reference ID of the option |
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


