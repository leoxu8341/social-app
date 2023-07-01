import {fromJS} from 'immutable';
import actions from './actions';

const initState = new fromJS({
    id: null,
    loading: false,
    oneLoading: false,
    profile: null,
    profiles: [],
    error: null,
    params: {
        pageIndex: 1
    },
});

export default function profileReducer(state = initState, action) {
    switch (action.type) {
        case actions.PROFILE_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex);
        case actions.PROFILE_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('profiles', action.payload);

        case actions.PROFILE_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        case actions.PROFILE_ONE_REQUEST:
            return state.set('oneLoading', true)
                .set('id', action.id);

        case actions.PROFILE_ONE_SUCCESS:
            return state
                .set('oneLoading', false)
                .set('profile', action.payload);

        case actions.PROFILE_ONE_FAILURE:
            return state
                .set('oneLoading', false)
                .set('error', action.error);

        case actions.RESET_PROFILE_STATE:
            return state = initState;

        default:
            return state;
    }
}
