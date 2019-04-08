# Wholesale Request module
Request for quotation (RFQ) integration to Vue Storefront

# Installation

```
git clone git@github.com:Interactivated/vsf-rfq-form.git vue-storefront/src/modules/wholesale-request
```

```
"wholesale": {
    "send_request_endpoint": "https://localhost:8080/api/ext/wholesale/send"
},
```

```
"extensions": {
    ...
    "wholesale": {
      "transport": {
        "from": "from@example.com",
        "to": "to@example.com",
        "host": "email-smtp.eu-west-1.amazonaws.com",
        "port": 465,
        "secure": true,
        "user": "",
        "pass": ""
      }
    }
  },
```