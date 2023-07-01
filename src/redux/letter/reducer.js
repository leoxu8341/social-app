import {fromJS} from 'immutable';
import actions from './actions';

const initState = new fromJS({
    loading: false,
    oneLoading: false,
    letter: null,
    letters: [],
    error: null,
    params: {
        pageIndex: 1,
        receiver: true
    },
});

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actions.LETTER_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex)
                .setIn(['params', 'receiver'], action.params.receiver);
    
      
        case actions.LETTER_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('letters', action.payload);

        case actions.LETTER_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        case actions.LETTER_ONE_REQUEST:
            return state.set('oneLoading', true)
                .set('id', action.id);

        case actions.LETTER_ONE_SUCCESS:
            return state
                .set('oneLoading', false)
                .set('letter', action.payload);

        case actions.LETTER_ONE_FAILURE:
            return state
                .set('oneLoading', false)
                .set('error', action.error);
        case actions.LETTER_POST_REQUEST:
            return state.set('oneLoading', true);

        case actions.LETTER_POST_SUCCESS:
            return state
                .set('oneLoading', false);

        case actions.LETTER_POST_FAILURE:
            return state
                .set('oneLoading', false)
                .set('error', action.error);
        case actions.LETTER_OPEN_REQUEST:
            return state.set('oneLoading', true);

        case actions.LETTER_OPEN_SUCCESS:
            return state
                .set('oneLoading', false);

        case actions.LETTER_OPEN_FAILURE:
            return state
                .set('oneLoading', false)
                .set('error', action.error);

        case actions.RESET_PROFILE_STATE:
            return state = initState;

        default:
            return state;
    }
}
