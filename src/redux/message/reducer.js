import {fromJS} from 'immutable';
import actions from './actions';

const initState = new fromJS({
    loading: false,
    messages: [],
    error: null,
});

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actions.MESSAGE_LIST_REQUEST:
            return state.set('loading', true);
    
        case actions.MESSAGE_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('messages', action.payload);

        case actions.MESSAGE_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);

        default:
            return state;
    }
}
