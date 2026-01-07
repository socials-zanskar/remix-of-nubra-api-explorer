---
hide:
  - toc
  - navigation
---

# Historical Data for Expired Options

Expired options are where **strategy truth is revealed**.

Unlike live markets, expired contracts provide **complete, finalised price paths** —
free from survivorship bias, rollovers, or regime ambiguity.

They are essential for:

- payoff validation
- Greek behaviour analysis
- decay modelling
- execution hindsight
- post-expiry forensics

Nubra’s Historical Data API allows you to query **fully expired option contracts**
with the *same structure* as live instruments.

---

# Why Expired Options Matter

## Option Symbol Formats (NSE)

<div class="place-order">

  <!-- =======================
  1) WEEKLY OPTIONS (JAN–SEP)
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
      <h3><span class="po-index">1</span> Weekly Options (Jan–Sep)</h3>
      <p class="po-subtitle">Numeric month encoding</p>
      <p class="po-desc">
        Weekly options expiring between January and September
        use a <strong>numeric month code</strong> in the symbol.
      </p>
    </div>

    <div class="po-options-stack">
      <div class="po-option po-format">
        <strong>Format</strong>
        <pre><code>&lt;UNDERLYING&gt;&lt;YY&gt;&lt;M&gt;&lt;DD&gt;&lt;STRIKE&gt;&lt;CE|PE&gt;</code></pre>
      </div>

      <div class="po-option po-example po-green">
        <strong>Example</strong>
        <pre><code>NIFTY2532426000CE</code></pre>
      </div>
    </div>

    <ul class="po-breakdown">
      <li><code>NIFTY</code> → Underlying</li>
      <li><code>25</code> → Year (2025)</li>
      <li><code>3</code> → Month (March)</li>
      <li><code>24</code> → Expiry day</li>
      <li><code>26000</code> → Strike</li>
      <li><code>CE</code> → Call option</li>
    </ul>

  </div>

  <!-- =======================
  2) WEEKLY OPTIONS (OCT–DEC)
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
      <h3><span class="po-index">2</span> Weekly Options (Oct–Dec)</h3>
      <p class="po-subtitle">Alphabet month encoding</p>
      <p class="po-desc">
        Weekly options expiring in the last quarter
        use <strong>alphabet month codes</strong>.
      </p>
    </div>

    <div class="po-options-stack">
      <div class="po-option po-format">
        <strong>Format</strong>
        <pre><code>&lt;UNDERLYING&gt;&lt;YY&gt;&lt;M&gt;&lt;DD&gt;&lt;STRIKE&gt;&lt;CE|PE&gt;</code></pre>
      </div>

      <div class="po-option po-example po-green">
        <strong>Example</strong>
        <pre><code>NIFTY25D1626000CE</code></pre>
      </div>
    </div>

    <ul class="po-breakdown">
      <li><code>D</code> → December</li>
      <li><code>N</code> → November</li>
      <li><code>O</code> → October</li>
    </ul>

  </div>

  <!-- =======================
  3) MONTHLY OPTIONS
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
      <h3><span class="po-index">3</span> Monthly Options</h3>
      <p class="po-subtitle">Standard monthly expiry</p>
      <p class="po-desc">
        Monthly options use a <strong>3-letter month abbreviation</strong>
        and do not include the expiry day.
      </p>
    </div>

    <div class="po-options-stack">
      <div class="po-option po-format">
        <strong>Format</strong>
        <pre><code>&lt;UNDERLYING&gt;&lt;YY&gt;&lt;MMM&gt;&lt;STRIKE&gt;&lt;CE|PE&gt;</code></pre>
      </div>

      <div class="po-option po-example po-red">
        <strong>Examples</strong>
        <pre><code>NIFTY26NOV25500CE
HDFCBANK26MAY2380CE</code></pre>
      </div>
    </div>

    <ul class="po-breakdown">
      <li><code>NOV</code> → November expiry</li>
      <li>No expiry day encoded</li>
      <li>Standard monthly contracts</li>
    </ul>

  </div>

</div>


---

## Historical Charting for Expired Options

Below is a **ready-to-use example** that fetches historical data for an
**expired options contract** and visualises:

- OHLC candlesticks
- cumulative volume
- Greeks in separate panels

Because the contract is expired:
- all data is complete
- no rollovers occur
- no real-time feeds are required

Simply change the `SYMBOL`, date range, or interval to analyse
any expired option.

```python
import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

from nubra_python_sdk.marketdata.market_data import MarketData
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


# ============================================================
# Nubra API
# ============================================================

nubra = InitNubraSdk(NubraEnv.PROD, env_creds=True)
md = MarketData(nubra)

SYMBOL = "NIFTY25DEC26000CE"

resp = md.historical_data({
    "exchange": "NSE",
    "type": "OPT",
    "values": [SYMBOL],
    "fields": [
        "open", "high", "low", "close",
        "cumulative_volume",
        "theta", "delta", "gamma", "iv_mid"
    ],
    "interval": "1d",
    "startDate": "2025-12-01T00:00:00.000Z",
    "endDate": "2025-12-30T00:00:00.000Z",
    "intraDay": False,
    "realTime": False
})


# ============================================================
# Helpers
# ============================================================

def ts_to_dt(ts):
    """Convert Nubra nanoseconds → datetime"""
    return pd.to_datetime(ts, unit="ns")


def series_to_df(series, col):
    if not series:
        return None
    return pd.DataFrame({
        "time": [ts_to_dt(x.timestamp) for x in series],
        col: [x.value for x in series],
    })


# ============================================================
# Parse Response
# ============================================================

chart = resp.result[0].values[0][SYMBOL]

df_price = pd.DataFrame({
    "time":  [ts_to_dt(x.timestamp) for x in chart.open],
    "open":  [x.value / 100 for x in chart.open],
    "high":  [x.value / 100 for x in chart.high],
    "low":   [x.value / 100 for x in chart.low],
    "close": [x.value / 100 for x in chart.close],
})

df_volume = series_to_df(chart.cumulative_volume, "volume")
df_delta  = series_to_df(chart.delta, "delta")
df_gamma  = series_to_df(chart.gamma, "gamma")
df_theta  = series_to_df(chart.theta, "theta")
df_iv     = series_to_df(chart.iv_mid, "iv")


# ============================================================
# Build Plotly Figure
# ============================================================

fig = make_subplots(
    rows=6,
    cols=1,
    shared_xaxes=True,
    vertical_spacing=0.02,
    row_heights=[0.44, 0.12, 0.11, 0.11, 0.11, 0.11],
    subplot_titles=[
        f"{SYMBOL} — OHLC",
        "Cumulative Volume",
        "Delta",
        "Gamma",
        "Theta",
        "Implied Volatility",
    ],
)

# OHLC
fig.add_trace(
    go.Candlestick(
        x=df_price["time"],
        open=df_price["open"],
        high=df_price["high"],
        low=df_price["low"],
        close=df_price["close"],
        increasing_line_color="#00c853",
        decreasing_line_color="#ff5252",
        name="OHLC",
    ),
    row=1, col=1
)

# Volume
if df_volume is not None:
    fig.add_trace(
        go.Bar(
            x=df_volume["time"],
            y=df_volume["volume"],
            marker_color="#546e7a",
            name="Volume",
        ),
        row=2, col=1
    )

# Greeks
if df_delta is not None:
    fig.add_trace(
        go.Scatter(
            x=df_delta["time"],
            y=df_delta["delta"],
            mode="lines+markers",
            name="Delta",
            line=dict(color="#42a5f5", width=2),
        ),
        row=3, col=1
    )

if df_gamma is not None:
    fig.add_trace(
        go.Scatter(
            x=df_gamma["time"],
            y=df_gamma["gamma"],
            mode="lines+markers",
            name="Gamma",
            line=dict(color="#ab47bc", width=2),
        ),
        row=4, col=1
    )

if df_theta is not None:
    fig.add_trace(
        go.Scatter(
            x=df_theta["time"],
            y=df_theta["theta"],
            mode="lines+markers",
            name="Theta",
            line=dict(color="#ffa726", width=2),
        ),
        row=5, col=1
    )

if df_iv is not None:
    fig.add_trace(
        go.Scatter(
            x=df_iv["time"],
            y=df_iv["iv"],
            mode="lines+markers",
            name="IV",
            line=dict(color="#26a69a", width=2),
        ),
        row=6, col=1
    )

fig.update_layout(
    template="plotly_dark",

    autosize=True,
    height=None,
    margin=dict(
        l=40,
        r=20,
        t=30,
        b=30
    ),

    hovermode="x unified",
    showlegend=False,
    xaxis_rangeslider_visible=False,
)



# ============================================================
# Render
# ============================================================

fig.show()
```
