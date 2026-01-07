---
title: "Why One “Place Order” Is Not Enough"
summary: "Placing an order is only the starting point in algorithmic trading. This article explains why real-world execution requires order lifecycle management, validations, risk checks, retries, modifications, cancellations, and post-trade tracking."
tags: ["Algo Trading", "Order Management", "Trading APIs", "Execution", "Infrastructure"]
readTime: "6 min"
publishDate: "2026-01-04"
author: "Nubra Engineering"
---

### Understanding Modern Trading Order Types

If trading were simple, a single **Place Order** button would be enough.

But markets aren’t simple.

Liquidity shifts every second. Prices move faster than human reaction time. Large orders move the market against you. Risk must be automated, not manually managed. And real strategies often involve **multiple legs acting as one idea**, not isolated trades.

That’s why modern trading systems—like Nubra—support **multiple order types**, each designed to solve a specific execution problem.

---

## The Illusion of a “Simple Order”

At first glance, this sounds sufficient:

> “Buy 100 shares of X at ₹114.”

But what if:
- The price spikes suddenly?
- You want to buy **only after a breakout**?
- Your order size itself moves the market?
- You’re trading multiple instruments as one strategy?
- You need automatic stop-loss and exit logic?

A single “place order” can’t handle these realities.

---

## Order Types Are Tools, Not Features

Order types are not UI features.  
They are **execution tools**.

You *can* use a hammer for everything—but screws and precision work need different tools.

Each order type exists because traders face **different execution constraints**.

---

| 🟦 **Regular Order** | 🟨 **Stop-Loss Order** | 🟧 **Iceberg Order** |
|---------------------|----------------------|---------------------|
| **What it is**<br/>A straightforward buy or sell at a **LIMIT** or **MARKET** price. | **What it is**<br/>An order that activates **only when a trigger price is hit**.<br/><br/>_“Buy only if price crosses ₹113.80.”_ | **What it is**<br/>A large order split into smaller visible chunks (`leg_size`). |
| **When it works best**<br/>• You know the price you want<br/>• Normal trade sizes<br/>• Immediate or controlled execution | **Why it exists**<br/>Humans hesitate. Markets don’t.<br/><br/>• Enter breakouts<br/>• Exit losing trades automatically<br/>• Remove emotion | **Why it exists**<br/>Large visible orders:<br/>• Signal intent<br/>• Cause slippage<br/>• Invite front-running |
| **Benefits**<br/>• Simple and predictable<br/>• Full price control (LIMIT)<br/>• Instant execution (MARKET) | **Benefits**<br/>• Automated risk control<br/>• Ideal for breakouts<br/>• No constant monitoring | **Benefits**<br/>• Reduced market impact<br/>• Better average prices<br/>• Institutional-grade execution |
| **Limitations**<br/>• No built-in risk management<br/>• No automation<br/>• Poor for volatile markets | **Limitation**<br/>• Executes only after trigger | **Limitation**<br/>• Requires thoughtful leg sizing |



---
## Multi Order (Basket)

**Multi Order (Basket)** allows you to place multiple orders simultaneously without strategy-level optimization.  
Each order is executed independently, making it suitable for quick bulk placements where margin and risk are managed per order rather than across the basket.


| **Single Orders** | **Multi Order (Basket)** |
|------------------|--------------------------|
| ![Single Order](./SingleOrder.gif) | ![Multi Order](./MultiOrder.gif) |
| **What’s happening**<br/>Each order is sent individually to the exchange.<br/><br/>• Separate execution paths<br/>• Separate lifecycle<br/>• No shared context<br/><br/>**Impact**<br/>• No hedge awareness<br/>• No margin optimization<br/>• Strategy logic handled manually | **What’s happening**<br/>Multiple orders are submitted together in a single request.<br/><br/>• Orders travel together<br/>• Execution remains independent<br/>• Reduced API overhead<br/><br/>**Impact**<br/>• Faster submission<br/>• Cleaner execution flow<br/>• Still no shared risk or margin logic |

---

## Flexi Basket Order — Strategy-Level Trading

**Flexi Basket Order** lets you place and execute multiple orders together as one strategy.  
It optimizes execution, margin usage, and risk across all legs, enabling smoother entries and better capital efficiency—especially for multi-leg and hedged trades.


| ❌ **Without Flexi (Individual Orders)** | ✅ **With Flexi Basket (Net Strategy Execution)** |
|-----------------------------------------|--------------------------------------------------|
| ![Individual Orders](./IndividualOrder.gif) | ![Flexi Basket](./FlexiOrder.gif) |
| **What happens**<br/>Strategy legs are placed as separate orders.<br/><br/>• Each leg blocks margin independently<br/>• Exchange cannot recognize the hedge<br/>• Capital usage is high<br/>• Risk management is fragmented<br/><br/>**Result**<br/>Higher margin blocked, despite lower net risk | **What happens**<br/>All legs are submitted as **one strategy**.<br/><br/>• Exchange evaluates **net exposure**<br/>• Hedge benefits are applied automatically<br/>• Margin is optimized at basket level<br/><br/>**What Flexi does differently**<br/>• Risk applied at basket level<br/>• Margin calculated on net position<br/>• Legs executed as one idea<br/>• Supports OCO logic (stop-loss *or* target)<br/><br/>**Benefits**<br/>• Strategy-level risk control<br/>• One stop-loss, one target<br/>• Time-based exits<br/>• Cleaner P&L tracking<br/>• **Significant margin savings** |

---


## 🧠 Mental Model

| Think of it as…        | Order Type     |
|-----------------------|----------------|
| “Just buy/sell”       | Regular        |
| “Buy only if…”        | Stop-Loss      |
| “Hide my size”        | Iceberg        |
| “Execute many trades” | Multi Order    |
| “Execute an idea”     | Flexi Basket   |

---

## Final Takeaway

One order type is enough **only if markets never change**.

But markets:
- Move fast
- Punish visibility
- Reward automation
- Demand discipline
- Penalize inefficient capital usage

Different order types exist not because APIs are complex—but because **trading is**.

Modern platforms don’t give you more buttons.  
They give you **more control**.

---

## In Practice

If you’re building or trading seriously:

- Use **Regular Orders** for simplicity  
- **Stop-Loss Orders** for discipline  
- **Iceberg Orders** for scale  
- **Multi Orders** for speed  
- **Flexi Baskets** for strategy *and* margin efficiency  

That’s why **one “place order” is never enough**.
