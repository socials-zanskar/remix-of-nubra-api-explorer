# Market Quotes

The Market Quote API provides the order book for specified instruments. Nubra provides up to 20 levels of the order book.

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

    # Get quote for a single instrument
    quote = mdInstance.quote(ref_id=69353, levels=5)
    ```
###Accessing Data

=== "Python"
    ```python

    # Access the OrderBook through the orderBook attribute
    order_book = quote.orderBook
    print(f"  Reference ID: {order_book.ref_id}")
    print(f"  Timestamp: {order_book.timestamp}")
    print(f"  Last Traded Price: {order_book.last_traded_price}")
    print(f"  Last Traded Quantity: {order_book.last_traded_quantity}")
    print(f"  Volume: {order_book.volume}")
    print(f"  Bid Orders: {len(order_book.bid)} levels")
    print(f"  Ask Orders: {len(order_book.ask)} levels")

    # Print bid orders
    print("\nBid Orders:")
    for bid in order_book.bid:
        print(f"  Price: {bid.price}, Quantity: {bid.quantity}, Orders: {bid.num_orders}")

    # Print ask orders
    print("\nAsk Orders:")
    for ask in order_book.ask:
        print(f"  Price: {ask.price}, Quantity: {ask.quantity}, Orders: {ask.num_orders}")
    ```

## Request Parameters

=== "Python"
    | Parameter      | Type   | Description                          |
    |---------------|--------|--------------------------------------|
    | ref_id `required` | int | The instrument reference id received from Instrument API (e.g., "69353") |
    | levels `required`  | int | Depth of Bid/Ask Spread (0-20) |



## Response Structure

=== "Python"
    ```python
    # Response object structure
    class OrderBookWrapper:
        orderBook: OrderBook

    class OrderBook:
        ref_id: int                 # Reference ID of the instrument
        timestamp: int              # Timestamp in nanoseconds
        bid: List[OrderLevel]       # List of bid orders
        ask: List[OrderLevel]       # List of ask orders
        last_traded_price: int      # Last traded price
        last_traded_quantity: int   # Last traded quantity
        volume: int                 # Total volume traded for the day

    class OrderLevel:
        price: int                  # Price
        quantity: int               # Quantity
        num_orders: int             # Number of orders
    ```

## Response attributes

=== "Python"
    | Attribute | Description |
    |-----------|-------------|
    | orderBook | OrderBook object containing the market quote data |
    | orderBook.ref_id | Reference ID of the instrument |
    | orderBook.timestamp | Timestamp of the quote in nanoseconds |
    | orderBook.bid | List of BidAsk objects for bid orders, sorted by price in descending order |
    | orderBook.bid[].price | Price of the bid order |
    | orderBook.bid[].quantity | Quantity available at this bid price |
    | orderBook.bid[].num_orders | Number of orders at this bid price |
    | orderBook.ask | List of BidAsk objects for ask orders, sorted by price in ascending order |
    | orderBook.ask[].price | Price of the ask order |
    | orderBook.ask[].quantity | Quantity available at this ask price | 
    | orderBook.ask[].num_orders | Number of orders at this ask price |
    | orderBook.last_traded_price | Last traded price |
    | orderBook.last_traded_quantity | Last traded quantity |
    | orderBook.volume | Total volume traded for the day |

