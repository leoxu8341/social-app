const actions = {

    LETTER_LIST_REQUEST: 'LETTER_LIST_REQUEST',
    LETTER_LIST_SUCCESS: 'LETTER_LIST_SUCCESS',
    LETTER_LIST_FAILURE: 'LETTER_LIST_FAILURE',

    letterListRequest: (params) => ({
        type: actions.LETTER_LIST_REQUEST,
        params
    }),
    letterListSuccess: (letters) => ({
        type: actions.LETTER_LIST_SUCCESS,
        payload: letters
    }),
    letterListFailure: (error) => ({
        type: actions.LETTER_LIST_FAILURE,
        payload: [],
        error
    }),

    RESET_LETTER_STATE: 'RESET_LETTER_STATE',

    resetLETTERState: () => ({
        type: actions.RESET_LETTER_STATE
    }),

    LETTER_ONE_REQUEST: 'LETTER_ONE_REQUEST',
    LETTER_ONE_SUCCESS: 'LETTER_ONE_SUCCESS',
    LETTER_ONE_FAILURE: 'LETTER_ONE_FAILURE',

    letterOneRequest: (id) => ({
        type: actions.LETTER_ONE_REQUEST,
        id
    }),
    letterOneSuccess: (letter) => ({
        type: actions.LETTER_ONE_SUCCESS,
        payload: letter
    }),
    letterOneFailure: (error) => ({
        type: actions.LETTER_ONE_FAILURE,
        payload: null,
        error
    }),
    LETTER_POST_REQUEST: 'LETTER_POST_REQUEST',
    LETTER_POST_SUCCESS: 'LETTER_POST_SUCCESS',
    LETTER_POST_FAILURE: 'LETTER_POST_FAILURE',

    letterPostRequest: (receiver, subject, body) => ({
        type: actions.LETTER_POST_REQUEST,
        receiver,
        subject,
        body
    }),
    letterPostSuccess: () => ({
        type: actions.LETTER_POST_SUCCESS,
        payload: null
    }),
    letterPostFailure: (error) => ({
        type: actions.LETTER_POST_FAILURE,
        payload: null,
        error
    }),

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