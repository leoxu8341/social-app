const actions = {

    REPORT_LOGIN_LIST_REQUEST: 'REPORT_LOGIN_LIST_REQUEST',
    REPORT_LOGIN_LIST_SUCCESS: 'REPORT_LOGIN_LIST_SUCCESS',
    REPORT_LOGIN_LIST_FAILURE: 'REPORT_LOGIN_LIST_FAILURE',

    reportLoginListRequest: (params) => ({
        type: actions.REPORT_LOGIN_LIST_REQUEST,
        params
    }),
    reportLoginListSuccess: (reports) => ({
        type: actions.REPORT_LOGIN_LIST_SUCCESS,
        payload: reports
    }),
    reportLoginListFailure: (error) => ({
        type: actions.REPORT_LOGIN_LIST_FAILURE,
        payload: [],
        error
    }),

    REPORT_PROFILE_LIST_REQUEST: 'REPORT_PROFILE_LIST_REQUEST',
    REPORT_PROFILE_LIST_SUCCESS: 'REPORT_PROFILE_LIST_SUCCESS',
    REPORT_PROFILE_LIST_FAILURE: 'REPORT_PROFILE_LIST_FAILURE',

    reportProfileListRequest: (params) => ({
        type: actions.REPORT_PROFILE_LIST_REQUEST,
        params
    }),
    reportProfileListSuccess: (reports) => ({
        type: actions.REPORT_PROFILE_LIST_SUCCESS,
        payload: reports
    }),
    reportProfileListFailure: (error) => ({
        type: actions.REPORT_PROFILE_LIST_FAILURE,
        payload: [],
        error
    }),

    REPORT_SENDER_LIST_REQUEST: 'REPORT_SENDER_LIST_REQUEST',
    REPORT_SENDER_LIST_SUCCESS: 'REPORT_SENDER_LIST_SUCCESS',
    REPORT_SENDER_LIST_FAILURE: 'REPORT_SENDER_LIST_FAILURE',

    reportSenderListRequest: (params) => ({
        type: actions.REPORT_SENDER_LIST_REQUEST,
        params
    }),
    reportSenderListSuccess: (reports) => ({
        type: actions.REPORT_SENDER_LIST_SUCCESS,
        payload: reports
    }),
    reportSenderListFailure: (error) => ({
        type: actions.REPORT_SENDER_LIST_FAILURE,
        payload: [],
        error
    }),

    REPORT_USER_LIST_REQUEST: 'REPORT_USER_LIST_REQUEST',
    REPORT_USER_LIST_SUCCESS: 'REPORT_USER_LIST_SUCCESS',
    REPORT_USER_LIST_FAILURE: 'REPORT_USER_LIST_FAILURE',

    reportUserListRequest: (params) => ({
        type: actions.REPORT_USER_LIST_REQUEST,
        params
    }),
    reportUserListSuccess: (reports) => ({
        type: actions.REPORT_USER_LIST_SUCCESS,
        payload: reports
    }),
    reportUserListFailure: (error) => ({
        type: actions.REPORT_USER_LIST_FAILURE,
        payload: [],
        error
    }),

    RESET_REPORT_STATE: 'RESET_REPORT_STATE',

    resetReportState: () => ({
        type: actions.RESET_REPORT_STATE
    }),

    REPORT_USER_PROFILE_VIEW_REQUEST: 'REPORT_USER_PROFILE_VIEW_REQUEST',
    REPORT_USER_PROFILE_VIEW_SUCCESS: 'REPORT_USER_PROFILE_VIEW_SUCCESS',
    REPORT_USER_PROFILE_VIEW_FAILURE: 'REPORT_USER_PROFILE_VIEW_FAILURE',

    reportUserProfileViewRequest: (id, params) => ({
        type: actions.REPORT_USER_PROFILE_VIEW_REQUEST,
        id,
        params
    }),
    reportUserProfileViewSuccess: (report) => ({
        type: actions.REPORT_USER_PROFILE_VIEW_SUCCESS,
        payload: report
    }),
    reportUserProfileViewFailure: (error) => ({
        type: actions.REPORT_USER_PROFILE_VIEW_FAILURE,
        payload: null,
        error
    }),
};

export default actions;