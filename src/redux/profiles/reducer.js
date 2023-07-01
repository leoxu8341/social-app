import { fromJS } from 'immutable'
import actions from './actions'

const initState = new fromJS({
  id: null,
  loading: false,
  oneLoading: false,
  profile: null,
  profiles: [],
  error: null,
  myProfile: null,
  hobbies: [],
  hobbyLoading: false,
  params: {
    pageIndex: 1,
  },
})

export default function profileReducer(state = initState, action) {
  switch (action.type) {
    case actions.PROFILE_LIST_REQUEST:
      return state
        .set('loading', true)
        .setIn(['params', 'pageIndex'], action.params.pageIndex)
    case actions.PROFILE_LIST_SUCCESS:
      return state.set('loading', false).set('profiles', action.payload)

    case actions.PROFILE_LIST_FAILURE:
      return state.set('loading', false).set('error', action.error)
    case actions.PROFILE_ONE_REQUEST:
      return state.set('oneLoading', true).set('id', action.id)
    case actions.PROFILE_ONE_SUCCESS:
      return state.set('oneLoading', false).set('profile', action.payload)
    case actions.PROFILE_ONE_FAILURE:
      return state.set('oneLoading', false).set('error', action.error)
    case actions.PROFILE_MY_REQUEST:
      return state.set('oneLoading', true)
    case actions.PROFILE_MY_SUCCESS:
      return state.set('oneLoading', false).set('myProfile', action.payload)
    case actions.PROFILE_MY_FAILURE:
      return state.set('oneLoading', false).set('error', action.error)
    case actions.PROFILE_POST_REQUEST:
      return state.set('oneLoading', true)
    case actions.PROFILE_POST_SUCCESS:
      return state.set('oneLoading', false)
    case actions.PROFILE_POST_FAILURE:
      return state.set('oneLoading', false).set('error', action.error)
    case actions.PROFILE_UPDATE_REQUEST:
      return state.set('oneLoading', true)
    case actions.PROFILE_UPDATE_SUCCESS:
      return state.set('oneLoading', false)
    case actions.PROFILE_UPDATE_FAILURE:
      return state.set('oneLoading', false).set('error', action.error)
    case actions.RESET_PROFILE_STATE:
      return (state = initState)
    case actions.HOBBY_LIST_REQUEST:
      return state.set('hobbyLoading', true)
    case actions.HOBBY_LIST_SUCCESS:
      return state.set('hobbyLoading', false).set('hobbies', action.payload)

    case actions.HOBBY_LIST_FAILURE:
      return state.set('hobbyLoading', false).set('error', action.error)
    default:
      return state
  }
}
