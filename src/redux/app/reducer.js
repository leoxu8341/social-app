import { Map } from 'immutable'
import actions from './actions'

const initState = new Map({
  current: 'users',
})

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_SIDEBAR_KEY:
      return state.set('current', action.key)

    default:
      return state
  }
}
