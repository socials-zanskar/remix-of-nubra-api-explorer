---
hide:
  - navigation
  - toc
---

# General FAQs
Below are the most common questions related to getting started with Nubra’s API ecosystem.
Click any question to expand the detailed answer.

---

## Getting Started

??? faq-question "What is the Nubra API and what can I do with it?"
    The Nubra API provides programmatic access to Nubra’s trading infrastructure.

    You can use it to:

    - Place, modify, and cancel orders  
    - Retrieve live and historical market data  
    - Access option chain analytics and Greeks  
    - Monitor portfolios, holdings, and funds  
    - Build, test, and deploy algorithmic trading strategies  

    It’s built to serve both individual traders and institutions seeking scalable trading automation.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I get started with the Nubra APIs?"
    Getting started with Nubra APIs is straightforward. You can begin by installing the Nubra Python SDK or connecting directly via REST APIs.

    The Python SDK provides a simplified interface for authentication, order management, and market data access.

    **Quick Start Steps:**

    1. Install Python (3.8 or above) and Visual Studio Code.  
    2. Install the Nubra SDK using:

        ```bash
        pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple nubra-sdk
        ```

    3. Initialize the SDK and authenticate using your registered phone number, OTP, and MPIN.  
    4. Start making API calls — place orders, access live market data, and build your automation scripts.

    A complete step-by-step guide is available at:  
    https://nubra.io/products/api/docs

    <br>

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Who can use the Nubra API (developers, traders, institutions)?"
    The Nubra API is designed for:

    - **Developers** building custom trading applications  
    - **Algorithmic traders** automating strategies  
    - **Institutions** integrating Nubra with internal trading systems  
    - **Fintech innovators** creating tools around live market data  

    Anyone with an active Nubra trading account can request API access.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Documentation & Support

??? faq-question "Where can I find the official Nubra API documentation and SDK setup guides?"
    The official Nubra API documentation and SDK setup guides are hosted on the Nubra website:

    https://nubra.io/products/api/docs/

    It includes:

    - Python SDK installation and usage instructions  
    - REST API endpoints with example requests/responses  
    - Authentication flow for both OTP and TOTP  
    - Trading, Market Data, and Portfolio API references  

    For direct help, email: **support@nubra.io**

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Which programming languages or SDKs are currently supported by Nubra APIs?"
    Nubra currently supports:

    - **Python SDK** – A high-level interface for fast development.  
    - **REST APIs** – For developers using JavaScript, Java, C#, Go, etc.

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
