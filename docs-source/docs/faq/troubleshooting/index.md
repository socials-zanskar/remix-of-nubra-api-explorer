---
hide:
  - navigation
  - toc
---

# Troubleshooting & Errors FAQs
Below are the most common questions related to API errors, rejection codes, connection issues, and the process for requesting support or bug fixes.
Click any question to expand the detailed answer.

---

## Authentication & Account Errors (401, 403)

??? faq-question "Why am I seeing “Permission Denied” or “Insufficient Access” errors?"
    These errors generally mean:

    - Wrong credentials (using UAT creds in PROD or vice-versa)  
    - Access token expired  
    - IP not whitelisted  
    - KYC not fully synced  
    - Trading permission for the segment not enabled  

    Check your environment, token, and whitelist IPs. If KYC or trading permissions are missing, please contact **Nubra Support**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What should I do if I get “trading account not found” on order placement?"
    This happens when:

    - A LIVE order is attempted using **UAT credentials**  
    - Trading is not enabled for the specific exchange  
    - The user account isn’t mapped correctly  

    Double-check you are on **NubraEnv.PROD** and using active LIVE credentials.

    Inspect the full error response for additional context.

    **Please reach out to Nubra Support at support@nubra.io if the issue still persists**

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I test whether my access token is still active?"
    Call any authenticated endpoint such as:

    - `portfolio.funds()`  
    - `portfolio.positions()`  
    - `instruments`  

    If the token is expired, you will receive a **401**.

    For automation, Nubra strongly recommends **TOTP-based login + MPIN**, which offers stable long-lived sessions.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Order Rejection & Request Errors (400, 404)

??? faq-question "What should I do if I receive an “Invalid Inputs” or “Bad Request” error?"
    From Nubra’s side, these errors occur when the request payload does not match the required schema.

    Most common causes include:

    - Missing required fields (`ref_id`, `order_type`, `exchange`, `order_qty`)  
    - Wrong enum values  
    - Incorrect price units (should be in paise)  
    - Passing MODIFY/CANCEL inputs without required fields  
    - Using UAT ref_ids in PROD or vice-versa  

    Compare your request JSON with the exact schema in the API docs and validate against the examples.

    If the error persists, capture the **full request + response body** and share it with Nubra Support.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I interpret rejection_reason codes (e.g., ABOVE_AGGRESSOR_LIMIT, INSUFFICIENT_MARGIN)?"
    These codes come directly from the exchange:

    - **ABOVE_AGGRESSOR_LIMIT** → Your order price is too aggressive relative to current market bands  
    - **INSUFFICIENT_MARGIN** → Not enough funds for the requested order  
    - **PRICE_BAND_HIT** → LTP protection by the exchange  
    - **SHORT_OPTION_RESTRICTED** → Segment/permissions mismatch  

    You can cross-check by:

    - Comparing prices against LTP  
    - Checking your margin using the Funds API  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Why does my modify or cancel order call return a 400 or 404 error?"
    This is typically due to:

    - Missing modify parameters (e.g., missing `exchange`)  
    - Attempting to modify an order already **FILLED / CANCELLED / REJECTED**  
    - Wrong `order_id`  
    - Using order IDs from the wrong environment (UAT vs PROD mismatch)  

    Use `get_order()` to confirm the order’s status before modify/cancel.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What to do about intermittent order placement failures in LIVE?"
    Intermittent failures can be due to:

    - Exchange-level rejections  
    - Rate limits  
    - Network instability  
    - Momentary congestion  

    Best practices:

    - Retry with exponential backoff  
    - Log timestamps + request payloads  
    - Ensure IP whitelisting + stable connectivity  

    If repeated issues occur, share your logs with **support@nubra.io** so we can escalate with the exchange if required.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Connectivity & WebSocket Issues

??? faq-question "How do I debug WebSocket connection drops or disconnections?"
    WebSocket disconnects usually happen due to unstable networks, firewall restrictions, or missing reconnection logic.

    Nubra recommends:

    - Running the WebSocket in a **separate thread**  
    - Implementing **on_error** and **on_close** handlers  
    - Re-subscribing to symbols after reconnect  
    - Ensuring your **IP is whitelisted** (Account → API Credentials)  

    All best practices are documented in Nubra’s WebSocket section.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Reporting & Documentation Issues

??? faq-question "What’s the process to report an API issue or bug to Nubra support?"
    To help us investigate faster, include:

    - Full request body  
    - Full response body  
    - Timestamp  
    - Order ID (if applicable)  
    - WebSocket logs (if relevant)  

    Send it to **support@nubra.io** with the subject:  
    **API Issue – Detailed Logs Attached**

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How can I request a bug fix or doc correction for API examples?"
    If you find missing fields, incorrect samples, or SDK/doc discrepancies, email:

    📩 **support@nubra.io**  
    Subject: **API Documentation Correction Request**

    Please include:

    - URL of the page  
    - The sample/snippet needing correction  
    - Suggested fix (if known)  

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

[Browse all FAQs](../index.md){ .md-button }

<div class="faq-card-grid">

<a class="faq-mini-card" href="../troubleshooting/">
  <h4>Troubleshooting & Errors</h4>
  <p>Common API errors, WebSocket drops, and debugging.</p>
</a>

<a class="faq-mini-card" href="../integrations/">
  <h4>Integrations & Tools</h4>
  <p>Connecting to third-party platforms, available SDKs.</p>
</a>

<a class="faq-mini-card" href="../algo/">
  <h4>Algo Registration & Compliance</h4>
  <p>Sebi guidelines, registration workflow, approvals.</p>
</a>

</div>
