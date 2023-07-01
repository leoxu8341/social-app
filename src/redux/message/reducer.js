import { fromJS } from 'immutable'
import actions from './actions'

const initState = new fromJS({
  loading: false,
  messages: [],
  error: null,
  oneLoading: false,
})

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.MESSAGE_LIST_REQUEST:
      return state.set('loading', true)

    case actions.MESSAGE_LIST_SUCCESS:
      return state.set('loading', false).set('messages', action.payload)

    case actions.MESSAGE_LIST_FAILURE:
      return state.set('loading', false).set('error', action.error)

    case actions.MESSAGE_POST_REQUEST:
      return state.set('oneLoading', true)

    case actions.MESSAGE_POST_SUCCESS:
      return state.set('oneLoading', false)

    case actions.MESSAGE_POST_FAILURE:
      return state.set('oneLoading', false).set('error', action.error)

    default:
      return state
  }
}
