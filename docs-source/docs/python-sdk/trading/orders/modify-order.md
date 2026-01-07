# Modify Order

The Modify Order API allows you to adjust the price, quantity, order type, or validity of an existing pending order without canceling it.
 
## Usage

=== "Python"
```python
from nubra_python_sdk.trading.trading_data import NubraTrader
from nubra_python_sdk.start_sdk import InitNubraSdk, NubraEnv

# Initialize the Nubra SDK client
# Use NubraEnv.UAT for testing or NubraEnv.PROD for production
nubra = InitNubraSdk(NubraEnv.UAT)  # or NubraEnv.PROD
trade = NubraTrader(nubra, version ="V2")

##using totp login and .env file 
#nubra = InitNubraSdk(NubraEnv.UAT, totp_login= True ,env_creds = True)

result = trade.modify_order_v2(order_id=10132, request={
    "order_price":"197900",
    "order_qty":"1",
    "exchange":"NSE", 
    "order_type":"ORDER_TYPE_STOPLOSS",
    "algo_params": {
    "trigger_price": 11380
}})
print(result)
```

## Request Parameters

| Field | Type | Description |
|-------|------|-------------|
| `order_id` | int | ID of the order to modify |
| `order_qty` | int | Updated quantity |
| `order_price` | int | Updated price (in paise)|
| `trigger_price` | int | Price at which the order should be triggered (in paise)|
| `leg_size` | int | The size of each visible portion (leg) of the order |

> Algo param is required in case of ORDER_TYPE_STOPLOSS ( "trigger_price" ), ORDER_TYPE_ICEBERG ( "leg_size" )

## Execution Type Requirements

| Execution Type | Modification Allowed | Compulsory field |
|----------------|---------------------|---------|
| ORDER_TYPE_REGULAR (LIMIT) | `order_price`, `order_qty` | `order_price`,`order_qty`,`exchange`,`order_type`|
| ORDER_TYPE_ICEBERG | `order_price`, `order_qty`| `order_price`, `order_qty`,`leg_size`,`exchange`,`order_type`|
| ORDER_TYPE_STOPLOSS | `order_price`, `order_qty`, `trigger_price` | `order_price`, `order_qty`,`trigger_price`,`exchange`,`order_type`|

## Response Structure

=== "Python"
```python
 # Success Response
{'message': 'update request pushed'}
``` 