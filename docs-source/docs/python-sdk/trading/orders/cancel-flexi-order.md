## Cancel Flexi Order by basket ID

Cancel a flexi order directly using its unique order ID.

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

trade.cancel_flexi_order(basked_id= basket_id, exchange= "exchange")
```

### Request Attributes
| Parameter   | Type         | Description                                  |
| ---         | ---          | ---                                          |
| `basket_id` | int          | The unique basket ID of the order            |
| `exchange`  | ExchangeEnum | "NSE","BSE"                                  |

### Response Structure 
```python
#Success
{'message': 'basket cancel request pushed'}
```
