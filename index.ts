// Read more about modules: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md
import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'rfq'
export const Example = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }]}
})
