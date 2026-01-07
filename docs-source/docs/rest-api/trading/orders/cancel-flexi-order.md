# Cancel Flexi Order

Cancel an individual order directly using its unique order ID.

```jsx
Method: POST
Endpoint: orders/v2/basket/{basket_id}
```

### cURL
```bash
curl --location --request POST 'https://api.nubra.io/orders/v2/basket/{basket_id}' \
--header 'x-device-id: {{x_device_id}}' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
--data '{
     "exchange" : "NSE"
}'
```
### Response Structure

```jsx
{'message': 'basket cancel request pushed'}
```
