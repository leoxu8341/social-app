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

    PROFILE_MY_REQUEST: 'PROFILE_MY_REQUEST',
    PROFILE_MY_SUCCESS: 'PROFILE_MY_SUCCESS',
    PROFILE_MY_FAILURE: 'PROFILE_MY_FAILURE',

    profileMyRequest: () => ({
        type: actions.PROFILE_MY_REQUEST
    }),
    profileMySuccess: (profile) => ({
        type: actions.PROFILE_MY_SUCCESS,
        payload: profile
    }),
    profileMyFailure: (error) => ({
        type: actions.PROFILE_MY_FAILURE,
        payload: null,
        error
    }),
    PROFILE_POST_REQUEST: 'PROFILE_POST_REQUEST',
    PROFILE_POST_SUCCESS: 'PROFILE_POST_SUCCESS',
    PROFILE_POST_FAILURE: 'PROFILE_POST_FAILURE',

    profilePostRequest: (data) => ({
        type: actions.PROFILE_POST_REQUEST,
        data
    }),
    profilePostSuccess: () => ({
        type: actions.PROFILE_POST_SUCCESS
    }),
    profilePostFailure: (error) => ({
        type: actions.PROFILE_POST_FAILURE,
        payload: null,
        error
    }),

    PROFILE_UPDATE_REQUEST: 'PROFILE_UPDATE_REQUEST',
    PROFILE_UPDATE_SUCCESS: 'PROFILE_UPDATE_SUCCESS',
    PROFILE_UPDATE_FAILURE: 'PROFILE_UPDATE_FAILURE',
    profileUpdateRequest: (data) => ({
        type: actions.PROFILE_UPDATE_REQUEST,
        data
    }),
    profileUpdateSuccess: () => ({
        type: actions.PROFILE_UPDATE_SUCCESS
    }),
    profileUpdateFailure: (error) => ({
        type: actions.PROFILE_UPDATE_FAILURE,
        payload: null,
        error
    }),

    HOBBY_LIST_REQUEST: 'HOBBY_LIST_REQUEST',
    HOBBY_LIST_SUCCESS: 'HOBBY_LIST_SUCCESS',
    HOBBY_LIST_FAILURE: 'HOBBY_LIST_FAILURE',

    hobbyListRequest: () => ({
        type: actions.HOBBY_LIST_REQUEST
    }),
    hobbyListSuccess: (hobbies) => ({
        type: actions.HOBBY_LIST_SUCCESS,
        payload: hobbies
    }),
    hobbyListFailure: (error) => ({
        type: actions.HOBBY_LIST_FAILURE,
        payload: [],
        error
    }),
};

export default actions;