## Cancel Single Order by ID

Cancel an individual order directly using its unique order ID.

### Usage

=== "Python"
```python
from nubra_python_sdk.trading.trading_data import NubraTrader
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD

##using totp login and .env file 
#nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

trade = NubraTrader(nubra, version ="V2")

trade.cancel_order_by_id(999)

```

### Request Attributes
| Parameter | Type | Description |
| --- | --- | --- |
| `order_id` | `int` | The unique ID of the order you want to cancel. Must be a valid order placed earlier. |

### Response Structure 
```python
#Success
{'message': 'delete request pushed'}
```

## Cancel Multiple Orders by ID

Cancel several orders at once by passing a list of order IDs.

### Usage
=== "Python"
```python
from nubra_python_sdk.trading.trading_data import NubraTrader
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD
trade = NubraTrader(nubra, version = "V2")

trade.cancel_orders([794, 797])
```

| Parameter | Type | Description |
| --- | --- | --- |
| `order_ids` | `List[int]` | A list of order IDs you want to cancel. All IDs must correspond to valid pending orders. Maximum 10 orders can be cancelled at once |

### Response Structure
```python
#Success
{'message': 'delete request pushed'}
```
