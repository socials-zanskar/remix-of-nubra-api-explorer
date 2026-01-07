---
hide:
  - navigation
  - toc
---

# Authentication & Login FAQs
Below are the most common questions related to authentication, OTP/TOTP login, token lifecycle, multi-session behavior, and automated login flows in Nubra’s API ecosystem.
Click any question to expand the detailed answer.

---

## Authentication Flow & Basics

??? faq-question "How does Nubra’s authentication and token flow work?"
    Nubra uses a **secure, multi-factor authentication** system that combines **OTP** (**One-Time Password**) or **TOTP** (**Time-based One-Time Password**) with an **MPIN (Mobile PIN)** for enhanced security.

    When you initialize the SDK, you’ll be prompted to authenticate before accessing any API endpoints.

    The authentication flow establishes a session and access token, which authorizes all subsequent API calls.

    Once authenticated, you can fetch market data, place orders, and access account information seamlessly.

    Example:

    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
    nubra = InitNubraSdk(NubraEnv.PROD)  # or NubraEnv.UAT
    ```

    This triggers the login sequence automatically — prompting for **registered phone number → OTP (or TOTP) → MPIN**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What are the redirect and postback URLs used for in authentication?"
    Redirect or postback URLs are **not applicable to the Python SDK** since the authentication flow occurs directly in the console or terminal.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I automate login or session renewal?"
    Yes — Nubra supports **environment-based authentication** and **TOTP-based automation**.

    ### Option 1: Using `.env` file

    You can store your credentials securely in a `.env` file to simplify the login process and avoid entering your phone number or MPIN each time.

    **Example `.env` file:**

    ```
    PHONE_NO="0000000000"
    MPIN="0000"
    ```

    **Initialize the SDK using environment credentials:**

    When you initialize the SDK with `env_creds=True`, the Nubra SDK automatically reads these values from the file.

    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    nubra = InitNubraSdk(NubraEnv.PROD, env_creds=True)
    ```

    This eliminates the need for interactive input each time.

    ### Option 2: Use TOTP (recommended for automation)

    Once TOTP is enabled, logins become non-interactive and can be scheduled or automated safely for trading bots or analytics scripts.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I use multiple concurrent login sessions with the same account?"
    You can maintain multiple sessions across different environments or scripts, but each **new login invalidates previous tokens**.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Token Lifecycle & Errors

??? faq-question "How long is an access token valid, and how can I refresh it?"
    Nubra uses two different types of tokens with different validity windows:

    ### 🔐 **Token Validity**
    - **Session Token:** Valid for **7 hours**
    - **Access Token:** Valid for **24 hours (1 day)**

    Once the access token expires, you must **re-login** using either OTP or TOTP to generate a fresh token pair.

    ### Token renewal options:
    - **OTP Login:** Re-login manually after token expiry.
    - **TOTP Login (recommended for automation):**
      Simply re-run your script; the SDK will request your latest 6-digit TOTP and generate new tokens.

    TOTP is strongly recommended for bots or cron-based scripts since it avoids SMS delays and ensures seamless renewals.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What does it mean if I receive a 'Token expired' or 'Invalid session' error?"
    These errors indicate that one of your tokens has become invalid.

    ### **Common causes**
    - **Session token expired (7 hours passed)**
    - **Access token expired (24 hours passed)**
    - Explicit logout using `nubra.logout()`
    - Login from another device or environment
    - System clock drift (for TOTP users)

    ### **Solution**
    Reinitialize the SDK and complete the login process again using OTP or TOTP.

    For long-running bots or scheduled jobs, use **TOTP login** to minimize manual intervention.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## OTP / TOTP Issues

??? faq-question "How do OTP and TOTP (Authenticator app) logins work?"
    Nubra offers two secure authentication modes:

    ### **1. OTP Authentication (default)**

    You’ll log in with:

    - Your **registered phone number**
    - A **6-digit OTP** sent via SMS
    - Your **MPIN**

    Re-login is required after your **24-hour access token** expires.

    Example:

    ```python
    nubra = InitNubraSdk(env=NubraEnv.PROD)
    ```

    ### **2. TOTP Authentication (recommended for automation)**

    TOTP uses a **rotating 6-digit code** from an authenticator app like Google Authenticator or Authy.

    **Setup Flow:**

    1. Generate TOTP secret  
        ```python
        secret = nubra.totp_generate_secret()
        print("TOTP Secret:", secret)
        ```
        Add this to your authenticator app.

    2. Enable TOTP  
        ```python
        nubra.totp_enable()
        ```

    3. Login using TOTP going forward  
        ```python
        nubra = InitNubraSdk(env=NubraEnv.PROD, totp_login=True)
        ```

    TOTP remains active until manually disabled.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I disable or reset TOTP authentication?"
    You can disable TOTP any time using:

    ```python
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv
    nubra = InitNubraSdk(env=NubraEnv.PROD)
    nubra.totp_disable()
    ```

    This removes the TOTP requirement and reverts your account back to OTP + MPIN login.

    If you lose your TOTP secret or device, contact **support@nubra.io** to reset authentication securely.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Why does TOTP sometimes fail even with the correct 6-digit code?"
    TOTP is time-based, and failures usually occur due to **clock drift** between your device and the Nubra servers.

    **Check the following:**
    - Ensure your system clock is synchronized  
    - Do not regenerate your TOTP secret after setup  
    - Confirm that your authenticator app is using the correct secret

    If issues persist, disable and re-enable TOTP or reach out to support at **support@nubra.io**

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
