# Authentication

## Nubra Auth Flow

### API Endpoints

| Environment | Base URL |
|-------------|----------|
| UAT | `https://uatapi.nubra.io` |
| Production | `https://api.nubra.io` |

### Step 1: Send OTP

```jsx
Method: POST
Endpoint: sendphoneotp
```
#### cURL

```jsx
curl --location 'https://api.nubra.io/sendphoneotp' \
--header 'Content-Type: application/json' \
--data '{
    "phone": "0000000000",
    "skip_totp": "false"
}'
```

#### Payload

```json
{
  "phone": "0000000000",
  "skip_totp": false
}
```

#### Response

```json
{
  "attempts_left": 4,
  "email": "xyz@gmail.com",
  "expiry": 30,
  "flow": "LOGIN",
  "message": "OTP sent",
  "next": "VERIFY_MOBILE",
  "phone": "0000000000",
  "temp_token": "eyJh...zd0"
}
```

> Save the `temp_token` from the response. You'll need it in Step 2, along with a `device_id` (e.g., 00:1A:2B:3C:4D:5E).

### Step 2: If user wants to login using otp ( TOTP Enabled)
```jsx
Method: POST
Endpoint: sendphoneotp
```

#### cURL
```bash
curl --location 'https://api.nubra.io/sendphoneotp' \
--header 'x-temp-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRDb2RlIjoiSTAwMDY4IiwiZXhwIjoxNzYwMzYyODE2LCJvdHBSZXF1ZXN0VHlwZSI6Ik9UUF9SRVFVRVNUX1RPVFAiLCJzdWIiOiI4NzU3OTA5OTIzJCJ9.XSYQTBBzol-SWFG6OjzZ_CsAzuFJX6twgheUzn928vQ' \
--header 'Content-Type: application/json' \
--data '{
    "phone": "0000000000",
    "skip_totp": true
}'
```


**Headers**

- `x-temp-token`: *Paste the `temp_token` from Step 1*

#### Payload

```json
{
  "phone": "0000000000",
  "skip_totp": true
}
```

#### Response 

```json
{
  "attempts_left": 4,
  "email": "xyz@gmail.com",
  "expiry": 30,
  "flow": "LOGIN",
  "message": "OTP sent",
  "next": "VERIFY_MOBILE",
  "phone": "0000000000",
  "temp_token": "eyJh...zd0"
}
```

- `x-temp-token`: *Paste the `temp_token` from Step 1*

### Step 2: Verify OTP

```jsx
Method: POST
Endpoint: verifyphoneotp
```

#### cURL
```bash
curl --location 'https://api.nubra.io/verifyphoneotp' \
--header 'x-temp-token: eyJh...zd0' \
--header 'x-device-id: TS123' \
--header 'Content-Type: application/json' \
--data '{
    "phone": "0000000000",
    "otp": "664781"
}'
```


**Headers**

- `x-temp-token`: *Paste the `temp_token` from Step 1*
- `x-device-id`: *e.g. `12345mac`*

#### Payload

```json
{
  "phone": "0000000000",
  "otp": "341874"
}
```



#### Response 

```json
{
  "auth_token": "7a1171e6-790c-40fa-ae16-b71cfd19923f",
  "flow": "LOGIN",
  "message": "User Created Successfully",
  "next": "ENTER_MPIN"
}
```

> Save the `auth_token` from the response. This will be used as the Bearer token in Step 3.


### Step 3: Verify PIN

```jsx
Method: POST
Endpoint: verifypin
```

#### cURL
```bash
curl --location 'https://api.nubra.io/verifypin' \
--header 'x-device-id: TS123' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 7a1171e6-790c-40fa-ae16-b71cfd19923f' \
--data '{
    "pin":"1234"
}'
```

**Authorization**

- Type: **Bearer Token**
- Token: *Use the `auth_token` from Step 2*

**Headers**

- `x-device-id`: *Same device ID used in Step 2*
- **Make sure to remove or uncheck `x-temp-token`** in the headers.

#### Payload

```json
{
  "pin": "your_mpin"
}
```

#### Response

```json
{
  "email": "xyz@gmail.com",
  "message": "Login Successful",
  "next": "DASHBOARD",
  "phone": "0000000000",
  "session_token": "eyJh...6Pno",
  "userId": 224
}
```

> Copy the `session_token`. This will be used as the Bearer token to access all further API endpoints like data, trading, and portfolio. 

## TOTP Authentication

The TOTP login flow is a secondary authentication method that can be enabled or disabled after a client has logged in.
Once logged in, the client receives a session token, which is used as a bearer token to initiate the TOTP login flow.

### Step 1: Generate TOTP Secret

```jsx
Method: POST
Endpoint: /totp/generate-secret

```

#### cURL

```bash
curl --location '<https://api.nubra.io/totp/generate-secret>' \\
--header 'Authorization: Bearer {{session_token}}' \\
--header 'x-device-id: {{device_id}}'
```

Headers

- `Authorization`: Bearer `session_token` (from first-time login)
- `x-device-id`: Your device ID (e.g., `TS123`)

#### Response

```json
{
  {
    "data": {
        "secret_key": "BTZYQ6WQ3XSHXOWEMIZC5FTDKB6ODQJP",
        "qr_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAABlBMVEX///8AAABVwtN+R2mIrU++xzyRmap3jAAA4AlIkbD0EV8bHCc/0AsLCwsL5ErkJggg=="
    },
    "message": "Enable TOTP flow by verifying TOTP"
}}
```

> This endpoint returns a **TOTP secret**.
> 

     The client must save this secret and add it to an Authenticator App (e.g., Google      Authenticator or any other preferred TOTP-compatible app).

---

### Step 2: Enable TOTP

```jsx
Method: POST
Endpoint: /totp/enable

```

#### cURL

```bash
curl --location '<https://api.nubra.io/totp/enable/{{totp}}>' \\
--header 'Authorization: Bearer {{session_token}}' \\
--header 'x-device-id: {{device_id}}'

```
#### Payload

```json
{
  "mpin": "1234",
  "totp": "1234"
}
```


#### Response

```json
{
    "message": "TOTP verified successfully"
}

```

---

### Step 3: Login via TOTP

```jsx
Method: POST
Endpoint: /totp/login

```

#### cURL

```bash
curl --location '<https://api.nubra.io/totp/login>' \\
--header 'x-device-id: {{device_id}}' \\
--header 'Content-Type: application/json' \\
--data '{
  "email": "xyz@gmail.com",
  "totp": 847851
}'

```

#### Payload
```json
{
    "email": "xyz@gmail.com",
    // "phone": "0000000000",
    "totp": 307215
}

```

#### Response

```json
{
    "auth_token": "40e10d2e-fe48-4651-becb-7a97261d63cc",
    "flow": "LOGIN",
    "message": "User Created Successfully",
    "next": "ENTER_MPIN"
}

```

---

### Step 4: Verify PIN

```jsx
Method: POST
Endpoint: /verifypin

```

#### cURL

```bash
curl --location '<https://api.nubra.io/verifypin>' \
--header 'x-device-id: {{device_id}}' \
--header 'Authorization: Bearer 7a1171e6-790c-40fa-ae16-b71cfd19923f' \
--header 'Content-Type: application/json' \
--data '{
  "pin": "1234"
}'

```

#### Payload

```json
{
  "pin": "1234"
}

```

#### Response

```json
{
    "email": "kavya@zanskar.xyz",
    "message": "Login Successful",
    "next": "DASHBOARD",
    "phone": "000000000",
    "session_token": "eyJhbGciOi...Dz5T5dMRgY",
    "userId": 35
}
```

> Use this session token for accessing all protected APIs.

---

#### Disable TOTP

```jsx
Method: POST
Endpoint: /totp/disable

```

#### cURL

```bash
curl --location '<https://api.nubra.io/totp/disable>' \\
--header 'Authorization: Bearer {{session_token}}' \\
--header 'x-device-id: {{device_id}}'
--data '{
  "mpin": "1234"
}'

```
#### Payload

```json
{
  "mpin": "1234"
}
```

#### Response

```json
{
  "message": "Disabled TOTP successfully"
}
```