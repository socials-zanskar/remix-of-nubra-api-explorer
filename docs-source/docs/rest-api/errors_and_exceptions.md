# Errors & Exceptions

Nubra APIs return errors using a simple and consistent structure.  
All failures fall into one of two categories:

- **Client-side errors (HTTP 400)** — Problems with the request  
- **Server-side errors (HTTP 500)** — Unexpected failures on the backend/OMS  

This page explains how to interpret these responses and take corrective action.

---

## Error Response Format

All Nubra API errors follow the same JSON schema:

```json
{
  "error": "Description of the issue",
  "nubra_error_code": ""
}
```

### Fields

| Field | Type | Description |
|-------|-------|-------------|
| **error** | string | Human-readable explanation of the failure. |
| **nubra_error_code** | string | Reserved for future use. Currently empty (`""`). May be expanded later for error categories. |

---

## HTTP Status Codes

Nubra currently uses the following status codes across all APIs:

---

### 400 — Bad Request

The request is invalid or violates business rules.

Typical causes include:

- Missing required fields  
- Invalid or unsupported parameters  
- Wrong data types  
- Invalid `ref_id` or instrument  
- Exceeding quantity or price limits  
- Placing STOPLOSS order without trigger price  
- Invalid basket/flexi structure  
- Insufficient holdings (SELL)  
- Insufficient margin (if exposed)  
- Malformed JSON  

**Example**

```json
{
  "error": "You cannot place this trade as it exceeds the maximum order quantity limit of 100000000",
  "nubra_error_code": ""
}
```

---

### 500 — Internal Server Error

An unexpected failure occurred on Nubra’s backend or a connected OMS.

Typical causes:

- OMS unreachable or timed out  
- Internal validation or routing failure  
- Upstream data mismatch  
- Unexpected backend exception  

These errors are not caused by the user.  
Retrying after a short interval often resolves the issue.

---

## Recommended Client Handling

### For HTTP 400

- Validate input before sending  
- Ensure correct enum values (order types, price types, exchange codes)  
- Confirm correct instrument IDs  
- Respect quantity and price limits  

### For HTTP 500

- Retry after a short delay  
- Implement exponential backoff for automated systems  
- Log details for debugging  
```
