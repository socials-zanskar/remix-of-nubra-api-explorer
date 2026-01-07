# Market Quotes

The Market Quote API provides market quotes for specified instruments.

```jsx
Method: GET
Endpoint: orderbooks/{ref_id}?levels={levels}
```

### cURL
```bash
curl --location --globoff 'https://api.nubra.io/orderbooks/{ref_id}?levels={levels}' \
--header 'x-device-id: TS123' \
--header 'Authorization: Bearer eyJh...6Pno' \
--data ''
```

### Response Structure

```jsx
{
  "orderBook": {
    "inst_id": 3045,
    "ref_id": 70115,
    "ts": 1749714670835214187,
    "bid": [
      { "p": 81065, "q": 142, "o": 3 }
    ],
    "ask": [
      { "p": 81080, "q": 79, "o": 2 }
    ],
    "ltp": 81080,
    "ltq": 9,
    "volume": 6565771
  }
}
```

### Response attributes

| **Fields** | **Description** |
| --- | --- |
| orderBook | OrderBook object containing the market quote data |
| orderBook.ref_id | Reference ID of the instrument |
| orderBook.timestamp | Timestamp of the quote in nanoseconds |
| orderBook.bid | List of BidAsk objects for bid orders, sorted by price in descending order |
| orderBook.bid[].price | Price of the bid order |
| orderBook.bid[].quantity | Quantity available at this bid price |
| orderBook.bid[].num_orders | Number of orders at this bid price |
| orderBook.ask | List of BidAsk objects for ask orders, sorted by price in ascending order |
| orderBook.ask[].price | Price of the ask order |
| orderBook.ask[].quantity | Quantity available at this ask price |
| orderBook.ask[].num_orders | Number of orders at this ask price |
| orderBook.last_traded_price | Last traded price |
| orderBook.last_traded_quantity | Last traded quantity |
| orderBook.volume | Total volume traded for the day | 