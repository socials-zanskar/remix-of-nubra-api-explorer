---
hide:
  - toc
  - navigation
---

# UAT vs LIVE (PROD): Why Sandbox Testing Matters in Algo Trading

Algorithmic trading isn’t just about writing a strategy — it’s about **safely validating** that strategy before real money goes anywhere near the market.

This is why Nubra provides **two fully independent environments**:

- **UAT (User Acceptance Testing)** — a simulated sandbox  
- **LIVE / PROD** — the real exchange-connected environment  

Before deploying even a single line of automation into production, every serious algo trader, MFT/HFT engineer, or quant developer should deeply understand how these two environments differ.

---

# Visual Difference Between UAT and LIVE
<div class="uat-guide">
<div class="uat-compare-container">

  <div class="uat-column">
    <h3 class="uat-title"><strong>LIVE / PROD Environment</strong></h3>

    <div class="explain-box info">
      <strong>🟢 Green</strong> and <strong>🔴 red</strong> dots represent real bids and asks entering the exchange order book.  
      Each dot is an actual order modifying market depth — inserting, updating, or being filled on the real L2 book.
    </div>

    <div class="uat-gif-wrap">
      <figure class="gif-card">
        <img src="../../assets/guides/UAT/PROD.gif" alt="LIVE order book behavior"/>
      </figure>
    </div>

    <ul class="uat-points">
      <li>Orders go directly to the exchange</li>
      <li>The L2 order book updates in real time</li>
      <li>Your bids/offers affect liquidity & market depth</li>
      <li>All actions carry real financial risk</li>
    </ul>
  </div>

  <div class="uat-divider" aria-hidden="true"></div>

  <div class="uat-column">
    <h3 class="uat-title"><strong>UAT (Sandbox) Environment</strong></h3>

    <div class="explain-box tip">
      <strong>🔵 Blue</strong> dots represent simulated bid/ask activity.  
      These orders are <em>not sent</em> to the exchange — Nubra matches them internally.  
      No real trade occurs, and the exchange order book remains unchanged.
    </div>

    <div class="uat-gif-wrap">
      <figure class="gif-card">
        <img src="../../assets/guides/UAT/UAT.gif" alt="UAT simulated order book"/>
      </figure>
    </div>

    <ul class="uat-points">
      <li>Orders are internally matched by Nubra’s simulation engine</li>
      <li>The real market order book <em>does not change</em></li>
      <li>No exchange impact, no slippage, no missed trades</li>
      <li>Zero financial risk — perfect for experimentation</li>
    </ul>
  </div>

</div>
</div>
---

# Nubra UAT Environment

<div class="uat-guide">

  <div class="intro-split">

    <div class="intro-image">
      <img src="../../assets/guides/UAT/UATEnvironment.png" alt="UAT vs LIVE overview"/>
    </div>

    <div class="intro-text">
      <strong>Nubra’s UAT environment</strong> is purpose-built for safe, high-frequency, high-volume, risk-free testing.  
      It mirrors the behavior of LIVE APIs while ensuring your orders never reach the exchange.

      <br><br>

      Below is everything you need to know about how UAT works, how it differs from LIVE, and why professional algo traders rely on it before deploying real capital.
    </div>

  </div>

</div>

---

# How UAT Differs From LIVE (PROD)

UAT is not just a sandbox — it is a fully isolated environment designed for **complete freedom and zero consequences**.  
Here’s how the behavior changes:

| Aspect | UAT Environment | LIVE Environment |
|--------|-----------------|------------------|
| Execution Type | Simulated fills | Real exchange fills |
| Market Impact | None | Real orders affect orderbook |
| Funds | Virtual sandbox wallet | Actual trading balance |
| Order Routing | Internal matching engine | Exchange order book |
| Risk | Zero | Real financial risk |
| Order IDs | UAT-specific | Exchange + broker IDs |
| API Methods | Identical to LIVE | Identical to UAT |
| Use Case | Strategy testing & debugging | Real trading |

---

# Why Algo Traders Should Always Start in UAT
<div class="uat-guide">
<div class="uat-feature-grid">

  <div class="uat-feature-card">
    <div class="uat-feature-icon">
      <img src="../../assets/guides/UAT/Shield.png" alt="Zero Risk" />
    </div>
    <h3>Zero Financial Risk</h3>
    <ul class="uat-list">
      <li>Test big orders safely</li>
      <li>Run rapid-fire cancels</li>
      <li>Experiment with large spreads</li>
      <li>No real capital at risk</li>
    </ul>
  </div>

  <div class="uat-feature-card">
    <div class="uat-feature-icon">
      <img src="../../assets/guides/UAT/FakeMoney.png" alt="Zero Risk" />
    </div>
    <h3>No Capital Limits</h3>
    <ul class="uat-list">
      <li>Use unlimited virtual funds</li>
      <li>Simulate large order sizes</li>
      <li>Generate high trading volume</li>
      <li>Run stress-test scenarios</li>
    </ul>
  </div>

  <div class="uat-feature-card">
    <div class="uat-feature-icon">
      <img src="../../assets/guides/UAT/Lightning.png" alt="Zero Risk" />
    </div>
    <h3>High OPS for MFT/HFT</h3>
    <ul class="uat-list">
      <li>Run hundreds of ops/sec</li>
      <li>Perfect for cancel/replace loops</li>
      <li>Build scalping & market-making bots</li>
      <li>Simulate microstructure behavior</li>
    </ul>
  </div>

  <div class="uat-feature-card">
    <div class="uat-feature-icon">
      <img src="../../assets/guides/UAT/Dashboard.png" alt="Zero Risk" />
    </div>
    <h3>UAT Trade Dashboard</h3>
    <ul class="uat-list">
      <li>Track fills in real time</li>
      <li>Debug orders visually</li>
      <li>Reconcile P&L instantly</li>
      <li>Monitor strategy behavior</li>
    </ul>
  </div>

</div>
</div>
---

# How UAT Works Under the Hood

- Orders are filled using Nubra’s **internal matching engine**  
- Matching follows **price–time priority**, closely mirroring NSE logic 
- Latency is simulated  
- Liquidity is simulated  
- ref_id formats differ from LIVE

UAT is designed for **logical correctness**, not latency benchmarking.

---

# Switching Between UAT and LIVE in Code

Just change one line:

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(NubraEnv.UAT)   # For UAT
nubra = InitNubraSdk(NubraEnv.PROD)  # For LIVE
```