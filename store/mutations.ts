import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_DISPLAYED] (state, displayed) {
    state.displayed = displayed
  }
}