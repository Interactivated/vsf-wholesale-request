import { RfqState } from '../types/RfqState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<RfqState, any> = {
    displayed: (state) => state.displayed
}