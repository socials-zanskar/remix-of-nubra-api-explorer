---
hide:
  - toc
  - navigation
---

# Market Quotes: Real-Time Order Book Data

The **Market Quote API** provides real-time **order book snapshots** for specified instruments.

Each market quote includes:

- Bid and ask prices 
- Available quantities 
- Number of orders at each price level 
- Last traded price and volume  

Nubra supports up to **20 levels of depth** on both the bid and ask side, enabling advanced market microstructure and execution logic.


Market Quotes are typically used for:

- Price discovery
- Spread monitoring
- Liquidity analysis
- Execution and hedging strategies

---

## Basic Usage Example

### Code

```python
from nubra_python_sdk.marketdata.market_data import MarketData
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.UAT)

# Initialize MarketData
mdInstance = MarketData(nubra)

# Fetch market quote (up to 5 levels)
quote = mdInstance.quote(ref_id=1842210, levels=5)
```

The `ref_id` must be obtained from the **Instrument Tracker API**  
`levels` controls the bid/ask depth (0–20)

---

## Sample Market Quote Response

<div style="
  display: flex;
  gap: 24px;
  align-items: flex-start;
">

  <!-- LEFT: Code block -->
  <div style="flex: 1;">
    <pre style="margin-top: 0;"><code>
  orderBook=OrderBook(
    ref_id=1842210,
    timestamp=1765187999950452423,
    bid=[
      OrderLevel(price=153870, quantity=477, num_orders=2),
      OrderLevel(price=153850, quantity=5015, num_orders=3),
      OrderLevel(price=153840, quantity=2, num_orders=2),
      OrderLevel(price=153830, quantity=569, num_orders=2),
      OrderLevel(price=153820, quantity=505, num_orders=2)
    ],
    ask=[
      OrderLevel(price=153970, quantity=1, num_orders=1),
      OrderLevel(price=154000, quantity=5720, num_orders=12),
      OrderLevel(price=154010, quantity=1132, num_orders=5),
      OrderLevel(price=154050, quantity=9, num_orders=4),
      OrderLevel(price=154100, quantity=551, num_orders=11)
    ],
    last_traded_price=153990,
    last_traded_quantity=2,
    volume=1336450
  )
    </code></pre>
  </div>

  <!-- RIGHT: Image -->
  <div style="flex: 1;">
    <img src="../../assets/guides/Market Data/MarketQuote.png"
         alt="Order Book Visualization"
         style="
           width: 100%;
           border-radius: 10px;
           border: 1px solid var(--md-default-fg-color--lighter);
         " />

    <p style="
      margin-top: 8px;
      font-size: 13px;
      color: var(--md-default-fg-color--light);
      text-align: center;
    ">
      Visual representation of the same order book data
    </p>
  </div>

</div>

---

## Accessing Market Quote Data

```python
order_book = quote.orderBook

print(f"Reference ID: {order_book.ref_id}")
print(f"Timestamp: {order_book.timestamp}")
print(f"Last Traded Price: {order_book.last_traded_price}")
print(f"Last Traded Quantity: {order_book.last_traded_quantity}")
print(f"Volume: {order_book.volume}")
print(f"Bid Levels: {len(order_book.bid)}")
print(f"Ask Levels: {len(order_book.ask)}")
```

---

## Bid & Ask Levels

```python
print("Bid Orders:")
for bid in order_book.bid:
    print(f"Price: {bid.price}, Quantity: {bid.quantity}, Orders: {bid.num_orders}")

print("Ask Orders:")
for ask in order_book.ask:
    print(f"Price: {ask.price}, Quantity: {ask.quantity}, Orders: {ask.num_orders}")
```

Bid levels are ordered from **highest to lowest price**  
Ask levels are ordered from **lowest to highest price**

---

## Request Parameters

| Parameter | Type | Description |
|---------|------|-------------|
| `ref_id` | int | Instrument reference ID from Instrument Tracker |
| `levels` | int | Depth of bid/ask spread (0–20) |

---

## Response Structure

```python
class OrderBookWrapper:
    orderBook: OrderBook

class OrderBook:
    ref_id: int
    timestamp: int
    bid: List[OrderLevel]
    ask: List[OrderLevel]
    last_traded_price: int
    last_traded_quantity: int
    volume: int

class OrderLevel:
    price: int
    quantity: int
    num_orders: int
```

---

## Key Takeaways

- Market Quotes provide **real-time order book snapshots**
- Supports up to **20 depth levels**
- `ref_id` is mandatory and resolved via **Instrument Tracker**
- Ideal for **liquidity-aware and execution-focused strategies**
