import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'

export const state = () => ({ ...baseState, type: 'articles' })

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
export const getters = { ...baseGetters }
