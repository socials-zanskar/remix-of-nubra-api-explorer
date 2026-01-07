# Cancel Order

## Cancel Order by ID

Cancel an individual order directly using its unique order ID.

```jsx
Method: DELETE
Endpoint: orders/{order_id}
```

### cURL
```bash
curl --location --request DELETE 'https://api.nubra.io/orders/{order_id}' \
--header 'x-device-id: {{x_device_id}}' \
--header 'Authorization: Bearer Bearer eyJh...6Pno' \
```

### Response Structure

```jsx
{"message":"delete request pushed"}
```

## Cancel Multiple Orders by ID

Cancel several orders at once by passing a list of order IDs.

```jsx
Method: POST
Endpoint: orders/cancel
```
### cURL
```bash
curl --location 'https://api.nubra.io/orders/cancel' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
    "orders": [
        {
            "order_id": 1234,
        }
    ]
}'
```

### Payload

```jsx
{
    "orders": [
        {
            "order_id": 1234,
        }
    ]
}
```

### Request Parameters

| Field | **Type** | **Description** |
| --- | --- | --- |
| `order_ids` | `List[int]` | A list of order IDs you want to cancel. All IDs must correspond to valid pending orders. |

### Response Structure

```jsx
{"message":"delete request pushed"}
``` 