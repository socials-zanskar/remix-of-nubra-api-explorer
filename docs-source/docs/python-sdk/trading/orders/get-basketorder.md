## Get Flexi Basket Order

Retrieve all Flexi basket orders created by the user, along with their current status, legs, pricing, and PnL information.

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

trade = NubraTrader(nubra, version= "V2")

trade.get_flexi_order()
```

### Response Structure
```python
class RefData:
    ref_id: int
    lot_size: int
    derivative_type: str

class Order:
    order_side: OrderSideEnum
    buy_qty: int
    sell_qty: int
    buy_avg: int
    sell_avg: int
    display_name: str
    ref_data: RefData
    last_traded_price: Optional[int] 
    pnl: int
    pnl_change: float

class BasketParams:
    basket_strategy: str
    entry_price: Optional[int]
    exit_price: Optional[int]
    stoploss_price: Optional[int]
    entry_time: datetime
    exit_time: Optional[datetime] 
    multiplier: Optional[int]
    momentum_trigger_price: Optional[int]
    order_side: OrderSideEnum
    order_delivery_type: DeliveryTypeEnum
    price_type: PriceTypeEnumV2
    basket_status: BasketStatusEnum

class Basket:
    basket_id: int
    user_id: int
    basket_name: str
    tag: str
    orders: Dict[str, Order]
    basket_params: BasketParams
    last_traded_price: Optional[int] 
    pnl: int
    pnl_change: float
    exchange: str

class BasketList:
    root: List[Basket]


class BasketStatusEnum(str, Enum):
    BASKET_STATUS_OPEN  = "BASKET_STATUS_OPEN"
    BASKET_STATUS_FILLED = "BASKET_STATUS_FILLED"
    BASKET_STATUS_REJECTED = "BASKET_STATUS_REJECTED"
    BASKET_STATUS_CANCELLED = "BASKET_STATUS_CANCELLED"
    BASKET_STATUS_PENDING = "BASKET_STATUS_PENDING"
    BASKET_STATUS_CLOSED = "BASKET_STATUS_CLOSED"
```