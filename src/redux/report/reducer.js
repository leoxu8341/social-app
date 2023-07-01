import {fromJS} from 'immutable';
import actions from './actions';

const initState = new fromJS({
    loading: false,
    oneLoading: false,
    logins: [],
    recentProfiles: [],
    senders: [],
    profileViewUsers: [],
    profileView: null,
    error: null,
    params: {
        pageIndex: 1,
        read: null
    },
});

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actions.REPORT_LOGIN_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex);
        case actions.REPORT_LOGIN_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('logins', action.payload);
        case actions.REPORT_LOGIN_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        case actions.REPORT_PROFILE_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex);
        case actions.REPORT_PROFILE_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('recentProfiles', action.payload);
        case actions.REPORT_PROFILE_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        case actions.REPORT_SENDER_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex)
                .setIn(['params', 'read'], action.params.read);
        case actions.REPORT_SENDER_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('senders', action.payload);
        case actions.REPORT_SENDER_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        case actions.REPORT_USER_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex);
        case actions.REPORT_USER_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('profileViewUsers', action.payload);
        case actions.REPORT_USER_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);
        
        case actions.REPORT_USER_PROFILE_VIEW_REQUEST:
            return state.set('oneLoading', true)
                .setIn(['params', 'pageIndex'], action.params.pageIndex)

        case actions.REPORT_USER_PROFILE_VIEW_SUCCESS:
            return state
                .set('oneLoading', false)
                .set('profileView', action.payload);

        case actions.REPORT_USER_PROFILE_VIEW_FAILURE:
            return state
                .set('oneLoading', false)
                .set('error', action.error);
        

        case actions.RESET_REPORT_STATE:
            return state = initState;

        default:
            return state;
    }
}
