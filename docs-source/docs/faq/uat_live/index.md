---
hide:
  - navigation
  - toc
---

# UAT & LIVE Environments FAQs
Below are the most common questions related to Nubra’s UAT sandbox environment, LIVE production environment, differences between them, environment switching, KYC sync issues, and UAT execution behavior.
Click any question to expand the detailed answer.

---

## Environment Comparison & Scope

??? faq-question "What is the difference between Nubra’s UAT and LIVE environments?"
    Nubra provides two distinct environments — **UAT (User Acceptance Testing)** and **LIVE**.

    - **UAT (Sandbox Environment):**  
      A safe, simulated environment designed for developers and traders to test code, validate API integrations, and practice trading workflows **without any real financial risk**.  
      Orders here are not sent to the exchange but matched internally by Nubra’s simulation engine.

    - **LIVE (Production Environment):**  
      This environment connects directly to the exchange, executing **real trades with real capital**.  
      Only tested and verified strategies should be deployed here.

    It’s strongly recommended that you **develop and validate all trading logic in UAT first** before moving to the LIVE environment.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What are the known UAT differences vs LIVE?"
    | Aspect | UAT Environment | LIVE Environment |
    | --- | --- | --- |
    | **Order Execution** | Simulated (internal matching engine) | Real-time exchange execution |
    | **Funds & Positions** | Virtual, not linked to real account | Real trading funds & positions |
    | **Latency & Speed** | Simulated | Actual exchange latency |
    | **KYC / Compliance** | Simplified replication | Fully verified |
    | **Risk Checks** | Soft validation | Real exchange risk checks |

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## UAT Credentials & Trading Behavior

??? faq-question "How do I create and use UAT credentials?"
    To access the UAT environment, you need to generate dedicated UAT credentials from your Nubra dashboard.

    **Steps:**

    1. Log in to [nubra.io](https://nubra.io/)
    2. Navigate to **Account Settings → Set up UAT Credentials**
    3. Your UAT account will use the **same registered mobile number** as your LIVE account
    4. Note your **MPIN** (visible in the UAT credentials section)

    Once created, initialize the SDK in UAT mode:

    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    nubra = InitNubraSdk(NubraEnv.UAT)
    ```

    Switch to LIVE by replacing `NubraEnv.UAT` with `NubraEnv.PROD`.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How realistic are order fills in the UAT environment?"
    UAT runs on Nubra’s **internal matching engine**, designed to replicate NSE’s **price–time priority** logic.

    - Orders fill based on simulated availability  
    - Matching logic mirrors live exchanges  
    - Latency & flow resemble live, but  
    - **Liquidity and slippage are not identical to live markets**

    UAT is ideal for logical testing, not latency benchmarking.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Should UAT show only UAT positions (not LIVE positions)?"
    **Currently, UAT may display positions from both UAT and LIVE.**

    This occurs because the portfolio service aggregates positions at the account level, and isolation is still being refined.

    **How to distinguish them:**

    - Track positions via **UAT order IDs** (different sequence format)
    - Filter positions client-side based on UAT session activity

    Nubra is actively working on environment segregation so UAT will show **only UAT positions** soon.

    For help with reconciliation or early access to segregation, contact **support@nubra.io**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Setup & Troubleshooting

??? faq-question "How do I switch my SDK between UAT and LIVE?"
    Switching environments is simple using the `NubraEnv` flag:

    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # For testing
    nubra = InitNubraSdk(NubraEnv.UAT)

    # For production
    nubra = InitNubraSdk(NubraEnv.PROD)
    ```

    For REST APIs, switch the **base URL** and use the corresponding credentials.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What happens if KYC data is missing or unsynced in UAT?"
    If your **KYC data isn’t synced** between LIVE and UAT, UAT authentication may fail.

    This occurs because UAT runs on a **separate sandbox database**, and your live profile is not replicated until you generate **UAT Credentials**.

    **Fix:**

    1. Go to **Account Settings → API Credentials**  
    2. Under **UAT Credentials**, click **Generate Credentials**  
    3. This creates a sandbox profile and UAT MPIN  
    4. Reinitialize SDK in UAT mode:

        ```python
        nubra = InitNubraSdk(NubraEnv.UAT)
        ```

    5. Retry your UAT requests

    UAT will sync essential profile/KYC details automatically.

    If issues persist, contact **support@nubra.io** for a manual reset.

    **Important:**  
    UAT and LIVE may use **different MPINs**. Keep them separate in your `.env`.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

Click any category to navigate directly to its FAQ group.

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../general/">
  <h4>General</h4>
  <p>Onboarding, basics, and core concepts.</p>
</a>

<a class="faq-mini-card" href="../authentication/">
  <h4>Authentication & Login</h4>
  <p>OTP, TOTP, token lifecycle, session handling, login issues.</p>
</a>

<a class="faq-mini-card" href="../uat_live/">
  <h4>UAT & LIVE</h4>
  <p>Environment differences, testing flows, credentials.</p>
</a>

<a class="faq-mini-card" href="../instruments/">
  <h4>Instruments & Reference Data</h4>
  <p>ref_ids, expiries, master files.</p>
</a>

<a class="faq-mini-card" href="../rate_limits/">
  <h4>Rate Limits & API Usage</h4>
  <p>REST/WebSocket caps, throttling.</p>
</a>

</div>
