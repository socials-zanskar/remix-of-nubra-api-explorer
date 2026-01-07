# UAT Environment

Nubra provides two environments for Python SDK development — **UAT** and **LIVE**.  
As an algorithmic developer, UAT is where you safely test your strategies without triggering real trades.

![UAT vs LIVE](../assets/icons/UAT Environment.png)

---

## What is UAT?

The **UAT (User Acceptance Testing) environment** is a dedicated sandbox used for:

- Building and testing strategies  
- Verifying authentication flows  
- Validating order placement, modification, and cancellation  
- Checking Python SDK integration with no financial risk  

UAT is fully isolated from LIVE and does **not** send orders to the exchange.

---

## UAT vs LIVE — Quick Difference Table

| Feature / Behavior               | UAT Environment                            | LIVE Environment                        |
|----------------------------------|---------------------------------------------|------------------------------------------|
| Execution Type                   | Simulated fills                             | Real exchange execution                  |
| Funds                            | Sandbox (virtual)                           | Actual trading balance                   |
| Market Impact                    | None                                        | Real orders, real impact                 |
| ref_id Values                    | Different from LIVE                         | Actual production ref_ids                |
| API Methods                      | Same as LIVE                                | Same as UAT                              |
| Risk Level                       | Zero risk                                   | Real financial risk                      |
| Use Case                         | Development & testing                       | Actual trading                           |

---

## How UAT Works

- Orders are executed using **simulated fills**  
- You are provided **sandbox funds**  
- Market data may differ slightly from LIVE  
- All actions are safe — nothing impacts your real trading account  
- Ideal for early development, debugging, and automated testing

---

## Important Notes for Developers

- **ref_id values are different between UAT and LIVE**  
  Always fetch instruments from the correct environment before placing orders.

- **Python SDK API calls remain identical**  
  Only the environment flag changes — all functions work the same.

- **No real money is used**  
  Use UAT to test execution logic without risk.

---

## Switching Between UAT and LIVE in Python SDK

The only change required is the environment parameter:

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# UAT (Testing)
nubra = InitNubraSdk(NubraEnv.UAT)

# LIVE (Production)
nubra = InitNubraSdk(NubraEnv.PROD)
```

Everything else — authentication, market data, orders — works the same.

---

## When Should You Use UAT?

Use UAT when you want to:

- Test strategy logic  
- Validate data subscriptions  
- Verify order workflows
- Ensure your script is stable before going LIVE  

Once your strategy behaves correctly in UAT, you can move confidently to LIVE.

