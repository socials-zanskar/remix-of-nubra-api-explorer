---
hide:
  - navigation
  - toc
---

# Instruments & Reference Data FAQs
Below are the most common questions related to Nubra’s instrument master, reference data, expiry checks, symbol formats, ref_id handling, and environment differences.
Click any question to expand the detailed answer.

---

## Instrument Master & Management

??? faq-question "How do I download the full instrument master?"
    Use the SDK’s `InstrumentData` helper to fetch the full instrument master as a pandas DataFrame and save it locally.

    Example (download + save CSV):

    ```python
    from nubra_python_sdk.refdata.instruments import InstrumentData
    from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

    # init client (UAT or PROD)
    nubra = InitNubraSdk(NubraEnv.UAT)

    instruments = InstrumentData(nubra)
    df = instruments.get_instruments_dataframe()    # pandas DataFrame
    print(f"Total instruments: {len(df)}")

    # Save to CSV locally
    df.to_csv("nubra_instruments_master.csv", index=False)
    ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What fields are included in the instrument master?"
    Typical fields (returned by the SDK / DataFrame) include:

    - `ref_id` — Nubra internal reference id (use this for market quote APIs)
    - `token` — token identifier (exchange token)
    - `stock_name` — trading symbol (human readable)
    - `nubra_name` — Nubra’s unique instrument name (e.g., `STOCK_HDFCBANK.NSECM`)
    - `exchange` — `NSE`, `BSE`, etc.
    - `asset` — underlying asset (e.g., `HDFCBANK`, `NIFTY`)
    - `asset_type` — `STOCK_FO`, `INDEX_FO`, `STOCKS`, etc.
    - `derivative_type` — `OPT`, `FUT`, `STOCK`
    - `expiry` — expiry date (YYYYMMDD or epoch depending on export); null for cash instruments
    - `strike_price` — numeric, null for non-options
    - `option_type` — `CE`, `PE`, or N/A
    - `lot_size` — contract lot size
    - `tick_size` — minimum price increment
    - `isin` — ISIN code
    - other meta fields (instrument status, segment, margin class)

    Use SDK helpers such as `get_instrument_by_ref_id()` or `get_instrument_by_symbol()` to avoid parsing symbols manually.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How do I refresh the instrument master?"
    See the recommended refresh strategy below:

    - **Refresh daily** before market open  
    - Refresh again after **weekly/monthly expiry rollovers**
    - Refresh when new series or symbols are introduced  
    - Refresh after corporate actions (lot/tick size changes)

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "How often should I refresh or regenerate the instrument master?"
    - **Default / Recommended:** refresh **once per trading day**, ideally **before market open**
    - **Refresh on demand:**
        - When new weekly series are listed  
        - After expiry rollovers  
        - After corporate actions that alter tick/lot sizes  

    For most workflows, one refresh per day is sufficient.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "Can I use the Get Instruments API without authentication?"
    - **Short answer:** **No — authentication is required.**
    - Why: Instrument master depends on the environment (UAT / PROD) and requires session context.

    The SDK-private refdata endpoint cannot be accessed anonymously.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Identifiers & Contract Symbols

??? faq-question "Are ref_ids the same in UAT and LIVE environments?"
    No — **ref_ids are different in UAT and PROD**.

    Example:

    | Environment | Symbol | ref_id |
    | --- | --- | --- |
    | **UAT** | NIFTY25NOV25500CE | `69353` |
    | **PROD** | NIFTY25NOV25500CE | `81462` |

    **Best Practices**

    - Never reuse or hardcode ref_ids across environments  
    - Always fetch instrument master per environment  
    - Maintain separate CSV files, e.g.:

        ```
        nubra_instruments_UAT.csv
        nubra_instruments_PROD.csv
        ```

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

??? faq-question "What is the format for weekly and monthly NSE option symbols?"
    Nubra follows standard NSE derivative symbol conventions.

    ---

    ### **Weekly Option Format**

    ```
    <UNDERLYING><YY><M><DD><STRIKE><CE|PE>
    ```

    Example:

    ```
    NIFTY25N1125500CE
    ```

    → Weekly contract for **NIFTY**, expiring **11 Nov 2025**, **25500 CE**.

    ---

    ### **Monthly Option Format**

    ```
    <UNDERLYING><YY><MMM><STRIKE><CE|PE>
    ```

    Example:

    ```
    NIFTY25NOV25500CE
    ```

    → Monthly contract for **NIFTY**, expiring **Nov 2025**, **25500 CE**.

    **Best Practice:** Prefer using structured fields from the instrument DataFrame instead of parsing text symbols.

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Contract Lifecycle

??? faq-question "How do I check if a contract or symbol has expired?"
    Nubra does **not** provide a direct API flag yet for expired instruments.

    Instead:

    - If a symbol is **missing** from the instrument master, it has **expired**.

    Expired contracts are removed from the current master list.

    Future updates may include lifecycle metadata (expiry flags, history, etc.).

    [Need more assistance?](https://nubra.io/support){.md-button .md-button--primary}

---

## Continue exploring related FAQs

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
