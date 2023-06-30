import {Map} from 'immutable';
import actions from './actions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initState = new Map({
    apiToken: undefined === cookies.get('app_token') ? null : cookies.get('app_token'),
    loading: false,
    error: null,
    user: undefined === cookies.get('app_user') ? null : cookies.get('app_user')
});

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return state
                .set('loading', true);

        case actions.LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', action.user)
                .set('apiToken', action.token);

        case actions.REGISTER_REQUEST:
            return state
                .set('loading', true);
        case actions.REGISTER_FAILURE:
            return state
                .set('loading', false);

        case actions.REMOVE_ERRORS:
            return state
                .set('error', null);

        case actions.REGISTER_SUCCESS:
            return state
                .set('loading', false)
                .set('apiToken', null);

        case actions.LOGIN_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);

        case actions.RESET_LOGIN_STATE:
            return state = initState;

        case actions.LOGOUT_REQUEST:
            return state
                .set('loading', false)
                .set('apiToken', null)
                .set('error', null);

        default:
            return state;
    }
}
