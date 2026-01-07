---
hide:
  - toc
  - navigation
---

# Instrument Tracker: The Starting Point of Your API Journey

The **Instrument Tracker** is the foundation of your entire API journey in India.

Every new contract, newly introduced expiry, strike, or even a brand-new index first enters the system through the **instrument master**. Before an instrument can be quoted, streamed, or traded, it must exist here.

Think of the Instrument Tracker as Nubra’s **single source of truth** for everything tradable.

It maintains a continuously updated master list of:

- Cash equities
- Futures
- Options
- Newly launched contracts and expiries

This master is refreshed automatically and made available locally via the SDK, ensuring your algorithms always work with **current and valid instruments**.

---

## Why the Instrument Tracker Matters

Every API interaction downstream depends on instrument data.

The response from the Instrument Tracker is used to extract critical identifiers required across the platform, such as:

- **`ref_id`** – Mandatory for market quotes, historical data, and WebSocket subscriptions  
- **`exchange`** – Used to route orders and queries correctly  
- **`lot_size`** – Required for valid order quantities  
- **`tick_size`** – Ensures price compliance when placing or modifying orders  

In addition, descriptive fields allow you to **query and filter instruments intelligently**, including:

- `stock_name`
- `derivative_type`
- `asset`
- `expiry`
- `strike_price`
- `option_type`

These fields enable precise selection of instruments — whether you’re scanning option chains, rolling expiries, selecting ATM strikes, or building automated strategy logic.

---

## Understanding Symbol Formats (Before You Go Further)

Before moving to the next section, it’s important to understand the **symbol formats used in the Indian markets**, especially for derivatives.

Nubra follows **standard NSE derivative symbol conventions**, meaning the symbols you see in the instrument master match exactly what traders and exchanges use.

Broadly, you’ll encounter two categories:

1. **Equity / Stock Tickers**
2. **Derivative Symbols (Weekly and Monthly Expiries)**

---

<div class="symbol-guide">
  <div class="symbol-grid">

    <div class="symbol-card">
      <h3>1️) Stock Tickers (Cash Market)</h3>

      <p>Stock tickers represent <strong>cash market equities</strong> and are typically simple and human-readable.</p>

      <p><strong>Examples:</strong></p>
      <ul>
        <li><code>HDFCBANK</code></li>
        <li><code>RELIANCE</code></li>
        <li><code>TCS</code></li>
      </ul>

      <p>These symbols:</p>
      <ul>
        <li>Do not contain expiries or strikes</li>
        <li>Always represent equity shares</li>
        <li>Use <code>derivative_type = STOCK</code></li>
      </ul>
    </div>

    <div class="symbol-card">
      <h3>2️) Weekly Option Symbol Format</h3>

      <p>Weekly options include <strong>exact expiry dates</strong> in the symbol.</p>

      <p><strong>Format</strong></p>
      <pre><code>&lt;UNDERLYING&gt;&lt;YY&gt;&lt;M&gt;&lt;DD&gt;&lt;STRIKE&gt;&lt;CE|PE&gt;</code></pre>

      <p><strong>Example</strong></p>
      <pre><code>NIFTY2610626000CE</code></pre>

      <p><strong>Breakdown:</strong></p>
      <ul>
        <li><code>NIFTY</code> → Underlying asset</li>
        <li><code>26</code> → Year (2026)</li>
        <li><code>1</code> → Month code (January)</li>
        <li><code>06</code> → Expiry day</li>
        <li><code>26000</code> → Strike price</li>
        <li><code>CE</code> → Option type (Call)</li>
      </ul>
    </div>

    <div class="symbol-card">
      <h3>3️) Monthly Option Symbol Format</h3>

      <p>Monthly options use <strong>month abbreviations</strong> instead of exact dates.</p>

      <p><strong>Format</strong></p>
      <pre><code>&lt;UNDERLYING&gt;&lt;YY&gt;&lt;MMM&gt;&lt;STRIKE&gt;&lt;CE|PE&gt;</code></pre>

      <p><strong>Example</strong></p>
      <pre><code>NIFTY26NOV25500CE
HDFCBANK26MAY2380CE</code></pre>

      <p><strong>Breakdown (for NIFTY26NOV25500CE):</strong></p>
      <ul>
        <li><code>NIFTY</code> → Underlying asset</li>
        <li><code>26</code> → Year (2026)</li>
        <li><code>NOV</code> → Expiry month (November)</li>
        <li><code>25500</code> → Strike price</li>
        <li><code>CE</code> → Option type (Call)</li>
      </ul>
    </div>

  </div>
</div>


---

## Available Methods in SDK

### Python

| Method | Description |
|------|------------|
| `get_ref_dataframe(exchange)` | Returns all tradable instruments as a pandas DataFrame |
| `get_instrument_by_ref_id(ref_id, exchange)` | Get instrument details by reference ID |
| `get_instrument_by_symbol(trading_symbol, exchange)` | Get instrument by Trading symbol eg `(HDFCBANK25MAY2380CE, TATAMOTORS, NIFTY2550822400PE)`|
| `get_instruments_by_pattern(filter_with_multiple_params)` | Get instruments by passing a pattern eg `[{"exchange": "NSE","asset": "NIFTY", "derivative_type": "OPT", "expiry":"20260127", "strike_price": "2600000", "option_type": "CE", "asset_type": "INDEX_FO"}]` |

---

At this point, you should be comfortable identifying instrument symbols and their formats.

These methods are the primary entry points for converting symbols into actionable system objects — especially for retrieving the `ref_id`, which is mandatory for market data queries, WebSocket subscriptions, and order placement.

---
## Basic Usage Examples

Below are a few common usage patterns showing the **code first** followed by the **actual response returned by the Instrument Tracker**.


### 1) Get Instrument by Reference ID (Cash Equity)

#### Code

```python
from nubra_python_sdk.refdata.instruments import InstrumentData
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(NubraEnv.UAT ,env_creds = True)
instruments = InstrumentData(nubra)
instrument = instruments.get_instrument_by_ref_id(1842210)
print(instrument)
```

#### Output

```
ref_id=1842210
strike_price=None
option_type='N/A'
token=2885
stock_name='RELIANCE'
nubra_name='STOCK_RELIANCE.NSECM'
lot_size=1
asset='RELIANCE'
expiry=None
exchange='NSE'
derivative_type='STOCK'
isin='INE002A01018'
asset_type='STOCKS'
tick_size=10
underlying_prev_close=154060
```

Cash market equities do not have expiry, strike price, or option type.

---

### 2) Get Instrument by Trading Symbol (BSE Equity)

#### Code

```python
from nubra_python_sdk.refdata.instruments import InstrumentData
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(NubraEnv.UAT ,env_creds = True)
instruments = InstrumentData(nubra)
instrument = instruments.get_instrument_by_symbol(
    "HDFCBANK",
    exchange="BSE"
)
print(instrument)
```

#### Output

```
ref_id=1883996
strike_price=None
option_type='N/A'
token=500180
stock_name='HDFCBANK'
nubra_name='STOCK_HDFCBANK_EQ_A.BSECM'
lot_size=1
asset='HDFCBANK'
expiry=None
exchange='BSE'
derivative_type='STOCK'
isin='INE040A01034'
asset_type='STOCKS'
tick_size=5
underlying_prev_close=100310
```

The same stock can have **different ref_ids across exchanges**, which is why `exchange` must be specified.

---

### 3) Get Instruments by Pattern (Weekly Index Option)

#### Code

```python
from nubra_python_sdk.refdata.instruments import InstrumentData
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(NubraEnv.UAT ,env_creds = True)
instruments = InstrumentData(nubra)
instruments = instruments.get_instruments_by_pattern([
    {
        "exchange": "NSE",
        "asset": "NIFTY",
        "derivative_type": "OPT",
        "expiry": "20251209",
        "strike_price": "2600000",
        "option_type": "CE",
        "asset_type": "INDEX_FO"
    }
])

print(instruments)
```

#### Output

```
[
  InstrumentDataWrapper(
    ref_id=1754182,
    option_type='CE',
    token=41903,
    stock_name='NIFTY25D0926000CE',
    nubra_name='OPT_NIFTY_20251209_CE_2600000',
    lot_size=75,
    asset='NIFTY',
    exchange='NSE',
    derivative_type='OPT',
    isin='N/A',
    asset_type='INDEX_FO',
    tick_size=5,
    underlying_prev_close=2618645,
    strike_price=2600000,
    expiry=20251209
  )
]
```

Pattern-based searches always return a **list**, even if only one instrument matches.  
Weekly options include **exact expiry dates** and scaled strike prices.

---

## Key Takeaways

Whether your objective is to:

- Fetch a **`ref_id`** for **order placement**
- Resolve **trading symbols** for **market data and WebSocket streaming**
- Identify **expiry, strike, lot size, or tick size** for strategy logic
- Or simply query instrument details for validation and analytics

The **Instrument Tracker** provides the foundational lookup layer that powers every downstream API interaction.