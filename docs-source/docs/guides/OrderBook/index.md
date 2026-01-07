---
hide:
  - toc
  - navigation
---

# Realtime Orderbook Streaming

The orderbook is the **raw microstructure of the market**.

Every algo that optimises:

- entry quality
- slippage
- execution timing
- liquidity sensing

ultimately depends on **live bid–ask depth**, not just last traded price.

Nubra’s WebSocket Orderbook stream gives you **tick-by-tick depth updates** with deterministic structure, identical in **UAT and LIVE**.

---

# What Is the Orderbook?

## The 3 Layers of Market Truth

<div class="place-order">

  <!-- =======================
  1) LAST TRADE
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
    <h3><span class="po-index">1</span> Last Trade</h3>

    <p class="po-subtitle">What just happened</p>

    <p class="po-desc">
        Represents the most recent executed transaction in the market.
    </p>
    </div>

    <div class="po-options-grid">
      <div class="po-option po-regular">
        <code>LTP</code>
        <p class="po-option-desc">
          Last Traded Price (₹)
        </p>
      </div>

      <div class="po-option po-regular">
        <code>LTQ</code>
        <p class="po-option-desc">
          Quantity traded at the last price
        </p>
      </div>
    </div>

  </div>

  <!-- =======================
  2) BID DEPTH
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
    <h3><span class="po-index">2</span> Bid Depth</h3>

    <p class="po-subtitle">Buy-side liquidity</p>

    <p class="po-desc">
        Aggregated buy orders waiting in the market.
    </p>
    </div>

    <div class="po-options-grid">
      <div class="po-option po-buy">
        <code>price</code>
        <p class="po-option-desc">
          Bid price level
        </p>
      </div>

      <div class="po-option po-buy">
        <code>quantity</code>
        <p class="po-option-desc">
          Total buy quantity at that price
        </p>
      </div>

      <div class="po-option po-buy">
        <code>num_orders</code>
        <p class="po-option-desc">
          Number of active buy orders
        </p>
      </div>
    </div>

  </div>

  <!-- =======================
  3) ASK DEPTH
  ======================= -->
  <div class="po-pillar">

    <div class="po-header-card">
    <h3><span class="po-index">3</span> Ask Depth</h3>

    <p class="po-subtitle">Sell-side liquidity</p>

    <p class="po-desc">
        Aggregated sell orders waiting in the market.
    </p>
    </div>

    <div class="po-options-grid">
      <div class="po-option po-sell">
        <code>price</code>
        <p class="po-option-desc">
          Ask price level
        </p>
      </div>

      <div class="po-option po-sell">
        <code>quantity</code>
        <p class="po-option-desc">
          Total sell quantity at that price
        </p>
      </div>

      <div class="po-option po-sell">
        <code>num_orders</code>
        <p class="po-option-desc">
          Number of active sell orders
        </p>
      </div>
    </div>

  </div>

</div>

---

<div class="orderbook-visual-card">

  <!-- LEFT : GIF -->
  <div class="ob-visual-media">
    <img
      src="../../assets/guides/OrderBook/OrderBook.gif"
      alt="Realtime Orderbook Streaming via Nubra WebSocket"
    />
  </div>

  <!-- RIGHT : EXPLANATION -->
  <div class="ob-visual-text">
    <h3>Realtime Orderbook — Visualised</h3>

    <p>
      This is a <strong>live WebSocket orderbook</strong> rendered in real time using
      <code>matplotlib</code>.
    </p>

    <ul>
      <li>Tick-by-tick depth updates via Nubra WebSocket</li>
      <li>20 levels of <strong>Bid</strong> and <strong>Ask</strong> depth</li>
      <li>Prices converted from <strong>paise → rupees</strong></li>
      <li>No polling, no snapshots — pure streaming</li>
    </ul>

    <p class="ob-note">
      Ideal for execution analysis, liquidity sensing, and
      slippage-aware strategies.
    </p>
  </div>

</div>

## WebSocket OrderBook Stream and Visualization

Below is a ready-to-use example that streams a realtime 20-level orderbook over WebSocket and visualizes it using Matplotlib.

The WebSocket runs in a separate background thread so `socket.keep_running()` can receive data continuously without blocking the UI. Incoming ticks update a shared snapshot, while Matplotlib periodically reads this snapshot to redraw the orderbook.

Change the `REF_ID` to visualize the orderbook for any instrument.

```python
#!/usr/bin/env python3

import threading
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

from nubra_python_sdk.ticker import websocketdata
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv


# ============================================================
# CONFIG
# ============================================================

REF_ID = "1842210"
DEPTH = 20
UPDATE_MS = 300


# ============================================================
# Shared snapshot
# ============================================================

snapshot = {
    "ltp": "–",
    "ltq": "–",
    "volume": "–",
    "bids": [],
    "asks": [],
}

lock = threading.Lock()


# ============================================================
# WebSocket callback
# ============================================================

def on_orderbook_data(msg):
    with lock:
        snapshot["ltp"] = f"{msg.last_traded_price / 100:.2f}"
        snapshot["ltq"] = msg.last_traded_quantity
        snapshot["volume"] = msg.volume

        snapshot["bids"] = [
            (lvl.price / 100, lvl.quantity, lvl.num_orders)
            for lvl in msg.bids[:DEPTH]
        ]

        snapshot["asks"] = [
            (lvl.price / 100, lvl.quantity, lvl.num_orders)
            for lvl in msg.asks[:DEPTH]
        ]


def on_connect(msg):
    print("[WebSocket] Connected")


# ============================================================
# WebSocket thread
# ============================================================

def start_socket():
    nubra = InitNubraSdk(NubraEnv.UAT,env_creds=True)
    socket = websocketdata.NubraDataSocket(
        client=nubra,
        on_orderbook_data=on_orderbook_data,
        on_connect=on_connect,
    )
    socket.connect()
    socket.subscribe([REF_ID], data_type="orderbook")
    socket.keep_running()


threading.Thread(target=start_socket, daemon=True).start()


# ============================================================
# Matplotlib Layout (ULTRA COMPACT)
# ============================================================

plt.style.use("dark_background")
fig = plt.figure(figsize=(10, 6), facecolor="black")

# Header cards (shorter)
ax_ltp = fig.add_axes([0.05, 0.84, 0.25, 0.095])
ax_ltq = fig.add_axes([0.375, 0.84, 0.25, 0.095])
ax_vol = fig.add_axes([0.70, 0.84, 0.25, 0.095])

# Tables (taller)
ax_bid = fig.add_axes([0.05, 0.08, 0.42, 0.74])
ax_ask = fig.add_axes([0.53, 0.08, 0.42, 0.74])

for ax in (ax_ltp, ax_ltq, ax_vol, ax_bid, ax_ask):
    ax.axis("off")


# ============================================================
# UI helpers (SMALL TEXT)
# ============================================================

def draw_card(ax, title, value):
    ax.clear()
    ax.axis("off")

    ax.add_patch(
        plt.Rectangle(
            (0, 0), 1, 1,
            facecolor="#121212",
            edgecolor="#2a2a2a",
            linewidth=0.8
        )
    )

    ax.text(
        0.5, 0.62, title,
        ha="center", va="center",
        fontsize=8, color="#aaaaaa"
    )

    ax.text(
        0.5, 0.30, f"{value}",
        ha="center", va="center",
        fontsize=12, weight="bold", color="white"
    )


def draw_table(ax, title, rows, bg_color):
    ax.clear()
    ax.axis("off")

    ax.text(
        0.5, 0.985, title,
        ha="center", va="bottom",
        fontsize=9, weight="bold",
        transform=ax.transAxes
    )

    if not rows:
        rows = [["–", "–", "–"]]

    formatted = []
    for p, q, n in rows:
        price = f"{p:.2f}" if isinstance(p, (int, float)) else p
        formatted.append([price, q, n])

    table = ax.table(
        cellText=formatted,
        colLabels=["Price", "Qty", "Orders"],
        loc="center",
        cellLoc="center",
        colLoc="center",
    )

    table.scale(1, 1.05)

    for (row, col), cell in table.get_celld().items():
        cell.set_edgecolor("#2a2a2a")
        cell.set_linewidth(0.6)

        if row == 0:
            cell.set_facecolor("#1f1f1f")
            cell.set_text_props(color="white", weight="bold", fontsize=7)
        else:
            cell.set_facecolor(bg_color)
            cell.set_text_props(color="white", fontsize=7)

        cell.set_height(0.045)   # 🔥 fits 20 rows cleanly


# ============================================================
# UI Update Loop
# ============================================================

def update(_):
    with lock:
        ltp = snapshot["ltp"]
        ltq = snapshot["ltq"]
        vol = snapshot["volume"]
        bids = snapshot["bids"]
        asks = snapshot["asks"]

    draw_card(ax_ltp, "LTP", ltp)
    draw_card(ax_ltq, "LTQ", ltq)
    draw_card(ax_vol, "Volume", vol)

    draw_table(ax_bid, "Bid", bids, "#0f2f1b")
    draw_table(ax_ask, "Ask", asks, "#2f1414")


ani = FuncAnimation(
    fig,
    update,
    interval=UPDATE_MS,
    cache_frame_data=False
)

plt.show()
```