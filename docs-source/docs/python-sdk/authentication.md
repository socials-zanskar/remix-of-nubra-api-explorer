# Authentication

The Nubra Python SDK uses an OTP-based as well as TOTP-based authentication in addition to a user-defined PIN. You'll need an active account with the Nubra Trading platform to get access to APIs.

## Client login flow

### OTP Authentication 

The authentication process requires the following:

1. A registered phone number with Nubra Trading platform
2. A one-time password received on your mobile number
3. Your MPIN (Mobile PIN) for authentication

The authentication is initiated automatically when you initialize Nubra SDK as in following code and you will be asked to enter the registered phone number and then OTP received on your registered number, followed by the MPIN. Re-login with OTP is required once every 7 days or until you logout, and MPIN will be asked everytime at the onset of your script execution when the `InitNubraSdk()` is called. 

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.PROD)  # or NubraEnv.UAT


#Logout Fully
nubra.logout()
```

> **Note**: If `logout` method is called, on next initialization of SDK you will have to go through the full authentication flow as defined above starting by entering phone number.

## TOTP Authentication

### Step-by-Step TOTP Flow using Nubra Python SDK

### 1. Generate TOTP Secret

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Set totp_login=True to use the TOTP-based login flow
nubra = InitNubraSdk(env=NubraEnv.PROD)  # Use PROD in production

secret = nubra.totp_generate_secret()
print("TOTP Secret:", secret)
```

> Add the secret in your Authenticator App.
> Returns new secret on every request.

---

### 2. Enable TOTP

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(env=NubraEnv.PROD)

# This will prompt you to enter the 6-digit TOTP from your app
nubra.totp_enable()

```

> This will ask for TOTP and MPIN.

> Once this is successful, your account is now secured with TOTP.

> You may be logged out after this. Use totp_login=True for all future logins.

---

### 3. Login using TOTP

```python
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(env=NubraEnv.PROD, totp_login=True)

```

> The SDK will automatically ask for Phone number and TOTP , then prompt for PIN.

> Once authenticated, you can use all other modules (market data, orders, etc.)

---

### Disable TOTP
```python

from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

nubra = InitNubraSdk(env=NubraEnv.PROD)

# This removes TOTP requirement from your account
nubra.totp_disable()

```
### Using .env for Authentication Inputs (Optional)
To improve security and avoid hardcoding credentials, you can store authentication details (like phone number, MPIN) in a .env file. The Nubra SDK automatically reads from this file if present.


    PHONE_NO= "0000000000"
    MPIN= "0000"


### Login using .env file 

    nubra = InitNubraSdk(NubraEnv.PROD ,env_creds = True)

(While initilaising pass env_creds = True ,The Nubra SDK automatically reads from this file if present.)
