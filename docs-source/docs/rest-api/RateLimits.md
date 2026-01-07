# Rate Limits & API Usage

This page outlines the rate limits and usage guidelines for Nubra’s REST and WebSocket APIs. Adhering to these limits is crucial for stable, uninterrupted algorithmic trading.

---

## API Rate Limits Summary

Nubra maintains separate limits for different API categories to ensure high-throughput trading and reliable market data streams.

| API Category | Limit | Notes |
| :--- | :--- | :--- |
| **Trading APIs (PROD)** | **10 operations/sec** | Standard / Unregistered Algo limit, enforced per IP address. Higher limits available upon Algo Registration. |
| **Trading APIs (UAT)** | **100 operations/sec** | Higher OPS cap for testing and simulation purposes. |
| **Historical Data (REST)** | **60 requests/min** | Intended for backtesting and analysis workloads. |
| **Live Market Data (WebSocket)** | **Weight-based limits** | Subscription limits are governed by a weight-based tier system. |

---

## Trading API Limits

The core trading APIs (placing, modifying, and canceling orders) are optimized for low-latency execution and are subject to exchange-defined constraints.

- **Standard Limit (Unregistered Algo):** Approximately **10 order operations per second (ops/sec)**.
- **UAT Environment Limit:** **100 ops/sec** for testing and dry runs.
- **Enforcement:** Limits are applied **per IP address**.
- **Note:** The 10 OPS limit is the recommended operational ceiling for unregistered algorithms to ensure stability and compliance.

---

## Algo Registration for Higher Limits

If your strategy requires throughput beyond **10 ops/sec**, the algorithm must be formally registered with the exchange via Nubra.

- **Process:** To initiate Algo Registration and discuss higher limits, contact **Nubra Support** at  
  [support@nubra.io](mailto:support@nubra.io)
- **Outcome:** Approved strategies may operate at higher OPS limits, subject to exchange and regulatory approval.

---

## Market Data Limits

Market data access is governed by separate rules for REST and WebSocket APIs.

### REST (Historical Data)

- Limited to **60 requests per minute**.

### WebSocket (Live Market Data)

- WebSocket subscriptions are governed by a **weight-based tier system**.
- Each WebSocket stream type consumes a predefined number of **weight points**.
- The **free tier** provides a capped amount of total weight per session.
- Clients may subscribe to any combination of streams as long as the **total session weight remains within the allowed limit**.
- Subscription requests exceeding the allowed weight are **rejected with an error**.
- Clients must **unsubscribe from existing streams** to free up weight before adding new subscriptions.

For detailed stream weights and tier limits, refer to the **WebSocket Subscription Tiers & Weights** documentation.

---