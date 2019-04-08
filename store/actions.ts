import config from 'config'
import { RfqState } from '../types/RfqState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<RfqState, any> = {
  showModal ({ commit }) {
    commit(types.SET_DISPLAYED, true)
  },
  hideModal ({ commit }) {
    commit(types.SET_DISPLAYED, false)
  },
  send (context, { email, comment, amount, sku, name }) {
    return new Promise((resolve, reject) => {
      fetch(`${config.wholesale.endpoint}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({email: email, comment: comment, amount: amount, sku: sku, name: name})
      })
        .then(data => {
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}