# REST API Overview

Nubra’s REST API provides a fast, secure, and scalable interface for developers building
trading systems, backend services, execution engines, or enterprise-grade market-data pipelines.
It exposes low-latency HTTP endpoints that allow complete programmatic access to Nubra’s
trading infrastructure.

The REST API is designed for reliability, consistency, and performance — enabling you to
build anything from automated trading strategies to large-scale institutional systems.

---

## Key Features

- **REST-like resource-based endpoints** using standard HTTP verbs  
- **Low-latency order execution** for regular, CO, flexi, and basket orders  
- **Comprehensive market data access** including quotes, Greeks, and historical data  
- **Portfolio & account data** including positions, holdings, and available funds  
- **Secure MPIN-based authentication** for all critical operations  
- **Consistent JSON request/response format** for seamless integration  
- **Language-agnostic** — works with Python, JavaScript, Go, Rust, Java, C#, and more  

---

## Who Is This API For?

The REST API is ideal for:

- Backend and server-side systems  
- Execution engines and OMS/RMS infrastructure  
- Institutional and proprietary trading desks  
- Traders who prefer raw HTTP APIs over SDK abstractions  
- Developers integrating Nubra into multi-language codebases  

If you need maximum control, custom orchestration, or advanced system-to-system automation,
the REST API is the right tool.

---

## Authentication Model

All REST requests require:

1. **API Key (client_id)**  
2. **MPIN-based session (MPIN → session token)**  

Once authenticated, you can generate session tokens and call any trading or market-data endpoint.

Authentication flow:

1. Login using user ID  
2. Submit MPIN securely  
3. Receive an encrypted session token  
4. Use the session token for all API requests in the `Authorization` header  

Detailed endpoints are available in the **Authentication** section.

---

## Market Data

Using the REST API, you can retrieve:

- Live market quotes  
- Greeks and option chain snapshots  
- Historical candles (OHLCV)  
- Order book data  
- Intraday and multi-day timeframes  

Market-data responses follow a consistent JSON structure designed for speed and easy parsing.

---

## Trading

The REST API supports:

- Placing new orders (all varieties)  
- Modifying price/quantity  
- Cancelling pending orders  
- Basket and multi-leg execution  
- Fetching complete order book and trade book  

All trading operations are validated and protected with session-level security.

---

## Portfolio & Funds

REST endpoints also expose:

- Current positions  
- Holding breakup with average buy price  
- Fund availability  
- Margin details  
- P&L data  

These endpoints allow complete portfolio lifecycle management for both live and automated trading.

---

## Rate Limits & Best Practices

To ensure stability and fair usage:

- All endpoints follow defined rate limits  
- Burst traffic is handled gracefully  
- Clients should cache non-live data where possible  
- Long-running strategies should refresh tokens proactively  

Details are documented alongside each endpoint group.

---

## Getting Started

To begin using the REST API:

1. Generate API credentials  
2. Authenticate using your MPIN  
3. Create a session token  
4. Start making HTTP requests to trading or data endpoints  

Sample request/response payloads are included in each endpoint’s documentation.

---

## Support

If you require help, guidance, or have questions about integration, feel free to contact:

**support@nubra.io**

Our team will be happy to assist you with API onboarding and usage.

