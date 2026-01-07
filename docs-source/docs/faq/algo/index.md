---
hide:
  - navigation
  - toc
---

# Algo Registration FAQs
Below are the most common questions related to SEBI-compliant algo registration, verification, modification, and compliance requirements on Nubra. 
Click any question to expand the detailed answer.

---

## Fundamentals (What, Why, and Who)

??? faq-question "What is Algo Registration, and why is it required?"
    Algo registration is the process by which an algorithm (or an algo product/API) is **formally registered** with the **exchange (via the broker)** and assigned an exchange **Algo-ID**. Registration is required to: enable auditability and tagging of algo orders, allow exchanges to monitor/kill rogue algos, and enforce OPS (orders-per-second) thresholds and RMS controls to protect retail investors and the market.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Who needs to register their algo?"
    Under SEBI and exchange (NSE/BSE) guidelines, **only algos that qualify as automated trading systems** — meaning they can place or modify **more than 10 orders per second per exchange per segment** — must be **registered and approved** before live trading.

    You **must register** your algo if:

    - Your system places, modifies, or cancels **10+ orders per second** automatically.
    - You use **automated order logic** (not manually triggered orders).
    - You intend to run strategies continuously or unattended during market hours.
    - You are distributing or offering the algo to other users or clients.
    - You’re integrating through **Nubra’s REST or WebSocket Trading APIs** for automated execution.

    ### 🔹 You **do not need registration** if:

    - You place or modify **less than 10 orders per second**, per exchange segment.
    - You’re using APIs for **manual or semi-automated trading** (e.g., execution assist tools, alerts, dashboards).
    - You’re in the **UAT / paper trading environment** and not executing live trades.

    Even if you fall below the 10 OPS threshold, Nubra **still recommends**:

    - **Static IP whitelisting** for security and traceability.
    - Using **Algo IDs** for organized tracking of strategies.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Does Nubra support SEBI-compliant algo registration for both brokers and clients?"
    Yes — brokers (including Nubra acting as a trading member) must follow exchange/SEBI implementation standards: empanel vendors, register API products, and register client/broker algos so each gets a unique Algo-ID. The broker remains responsible for orders placed via its APIs.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Registration & Lifecycle

??? faq-question "What documentation is required for algo registration?"
    Commonly required documents include: strategy write-up (whitebox/blackbox as applicable), RMS / risk controls write-up, system audit / auditor certificate, vendor empanelment proof (if third-party), and any annexures the exchange prescribes. Exchanges also ask for testing evidence and SOPs. Specific annexures/templates are published by each exchange.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How does a client register or whitelist an algo under their account?"
    To register and run an algo using Nubra’s APIs, clients must complete two key steps — **exchange registration** and **IP whitelisting** — both required under SEBI’s retail algo framework.

    ### 🔹 Step 1: Exchange Registration (via Broker)

    1. Submit the required documentation to Nubra (or your empanelled broker) — this typically includes:
        - **Strategy write-up / RMS details**
        - **Auditor or system certification**
        - **Broker authorization letter**
        - **Any vendor empanelment proof (if applicable)**
    2. Nubra reviews and forwards your algo details to the **exchange (NSE/BSE)**.
        - The exchange issues a **unique Algo ID**, which is mapped to your trading account.
        - This Algo ID is then used to tag all trades originating from your algo system.

    ### 🔹 Step 2: IP Whitelisting on Nubra Dashboard

    Once your UAT or LIVE credentials are active, go to:

    > Account Settings → API Credentials → Update Static IP

    Here, you’ll see fields for **Primary IP** and **Secondary IP** under **“Update Static IP”**.

    1. Enter your **static public IP address(es)** — these are the IPs of your trading or algo server.
        - **Primary IP** → your main system/server that will access the Nubra API.
        - **Secondary IP** → backup or failover IP (optional).
    2. Click **“Update.”**
        
        Nubra will now restrict all REST and WebSocket API access for your account to these IP addresses.
        
    3. All algo orders from non-whitelisted IPs will be rejected to ensure compliance with **exchange security norms**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How does Nubra verify whether an algo is approved before execution?"
    Nubra maintains a registry mapping registered Algo IDs to clients/vendors and block or flag order flows if an Algo ID is missing or if OPS thresholds are exceeded. Exchanges provide tagging mechanisms and expect brokers to prevent unregistered >10 OPS flows. Brokers also test algos in exchange simulation environments prior to go-live.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can a registered algo be modified or versioned after approval?"
    Yes — but material changes to logic must be notified to the exchange and registrations updated. Brokers are expected to report modifications and maintain version/audit trails. 

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Testing & Compliance

??? faq-question "Does Nubra provide a sandbox for algo testing prior to registration?"
    Nubra’s **UAT sandbox** is fully aligned with the exchange testing environment —

    you can use it for **strategy backtesting and pre-registration validation** before seeking exchange approval.

    > 🧠 In other words, you should first build and test your strategy in Nubra UAT (our simulation layer).
    > Once it’s stable, you can submit it for broker review and exchange registration.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Are separate registrations needed for each strategy or one for all?"
    Yes, exchanges expect each distinct algorithm/product to be registered and assigned its own Algo ID. If you change the logic materially, that change is reportable/subject to re-registration updates.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I ensure my strategy complies with exchange and broker risk checks?"
    **Best practices:**

    - Follow exchange RMS templates and SOPs: provide strategy + RMS write-ups.
    - Run exhaustive tests in simulated environment and keep audit logs.
    - Implement kill-switch and throttling, static IP + API key whitelisting, two-factor auth/OAuth as required.
    - Ensure auditability: store order/timestamp logs for at least 5 years (exchange requirement).
    - Coordinate with your broker (Nubra) for pre-submission checks to reduce rework.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

Click any category to navigate directly to its FAQ group.

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../troubleshooting/">
  <h4>Troubleshooting & Errors</h4>
  <p>Common API errors WebSocket drops, and debugging.</p>
</a>

<a class="faq-mini-card" href="../integrations/">
  <h4>Integrations & Tools</h4>
  <p>Connecting to third-party platforms, available SDKs (Python, Node.js)</p>
</a>

<a class="faq-mini-card" href="../algo/">
  <h4>Algo Registration & Compliance</h4>
  <p>Sebi guidelines, registration workflow, approvals, documentation</p>
</a>

</div>
