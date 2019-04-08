# Wholesale Request module
Request for quotation (RFQ) integration to Vue Storefront

# Installation

```shell
git clone git@github.com:Interactivated/vsf-wholesale-request.git vue-storefront/src/modules/wholesale-request
```

```
"wholesale": {
    "endpoint": "https://localhost:8080/api/ext/wholesale"
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

Register:

```js
...
import { WholesaleRequest } from './wholesale-request';

export const registerModules: VueStorefrontModule[] = [
  ...,
  WholesaleRequest
]
```

in ``

```js
<template>
<wholesale-request />

<div class="row m0 add-to-buttons">
  <button @click="showWholesaleModal" class="bg-cl-mine-shaft button-full fs-medium fs-medium sans-serif py20 px10 brdr-none mt15 cl-white">Request an offer for large quantities</button>
</div>

</template>

<script>
...
import WholesaleRequest from '@vue-storefront/wholesale-request/components/Request.vue'

export default {
  components: {
    ...,
    WholesaleRequest
  },
  mixins: [... WholesaleRequest],
  ...
}
</script>
```
