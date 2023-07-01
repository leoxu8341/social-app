const actions = {

    PROFILE_LIST_REQUEST: 'PROFILE_LIST_REQUEST',
    PROFILE_LIST_SUCCESS: 'PROFILE_LIST_SUCCESS',
    PROFILE_LIST_FAILURE: 'PROFILE_LIST_FAILURE',

    profileListRequest: (params) => ({
        type: actions.PROFILE_LIST_REQUEST,
        params
    }),
    profileListSuccess: (profiles) => ({
        type: actions.PROFILE_LIST_SUCCESS,
        payload: profiles
    }),
    profileListFailure: (error) => ({
        type: actions.PROFILE_LIST_FAILURE,
        payload: [],
        error
    }),

    RESET_PROFILE_STATE: 'RESET_PROFILE_STATE',

    resetProfileState: () => ({
        type: actions.RESET_PROFILE_STATE
    }),

    PROFILE_ONE_REQUEST: 'PROFILE_ONE_REQUEST',
    PROFILE_ONE_SUCCESS: 'PROFILE_ONE_SUCCESS',
    PROFILE_ONE_FAILURE: 'PROFILE_ONE_FAILURE',

    profileOneRequest: (id) => ({
        type: actions.PROFILE_ONE_REQUEST,
        id
    }),
    profileOneSuccess: (profile) => ({
        type: actions.PROFILE_ONE_SUCCESS,
        payload: profile
    }),
    profileOneFailure: (error) => ({
        type: actions.PROFILE_ONE_FAILURE,
        payload: null,
        error
    }),
    // MESSAGE_POST_REQUEST: 'MESSAGE_POST_REQUEST',
    // MESSAGE_POST_FAILURE: 'MESSAGE_POST_FAILURE',

    // messagePostRequest: (message) => ({
    //     type: actions.MESSAGE_POST_REQUEST,
    //     message
    // }),
    // messagePostFailure: (error) => ({
    //     type: actions.MESSAGE_POST_FAILURE,
    //     payload: [],
    //     error
    // }),

    // MESSAGE_DELETE_REQUEST: 'MESSAGE_DELETE_REQUEST',
    // MESSAGE_DELETE_FAILURE: 'MESSAGE_DELETE_FAILURE',

    // messageDeleteRequest: (id) => ({
    //     type: actions.MESSAGE_DELETE_REQUEST,
    //     id
    // }),
    // messageDeleteFailure: (error) => ({
    //     type: actions.MESSAGE_DELETE_FAILURE,
    //     payload: [],
    //     error
    // })
};

export default actions;