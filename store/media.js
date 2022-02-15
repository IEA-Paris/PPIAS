import {
  baseState,
  baseMutations,
  baseActions,
} from '~/assets/data/storeListModule'

export const state = () => ({ ...baseState, type: 'media' })

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
