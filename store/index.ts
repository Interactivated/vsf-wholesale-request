import { Module } from 'vuex'
import { RfqState } from '../types/RfqState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'

export const module: Module<RfqState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}