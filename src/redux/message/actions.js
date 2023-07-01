const actions = {

    MESSAGE_LIST_REQUEST: 'MESSAGE_LIST_REQUEST',
    MESSAGE_LIST_SUCCESS: 'MESSAGE_LIST_SUCCESS',
    MESSAGE_LIST_FAILURE: 'MESSAGE_LIST_FAILURE',

    messageListRequest: (id) => ({
        type: actions.MESSAGE_LIST_REQUEST,
        id
    }),
    messageListSuccess: (messages) => ({
        type: actions.MESSAGE_LIST_SUCCESS,
        payload: messages
    }),
    messageListFailure: (error) => ({
        type: actions.MESSAGE_LIST_FAILURE,
        payload: [],
        error
    }),
    MESSAGE_POST_REQUEST: 'MESSAGE_POST_REQUEST',
    MESSAGE_POST_SUCCESS: 'MESSAGE_POST_SUCCESS',
    MESSAGE_POST_FAILURE: 'MESSAGE_POST_FAILURE',

    messagePostRequest: (id, body) => ({
        type: actions.MESSAGE_POST_REQUEST,
        id,
        body
    }),
    messagePostSuccess: () => ({
        type: actions.MESSAGE_POST_SUCCESS,
        payload: null
    }),
    messagePostFailure: (error) => ({
        type: actions.MESSAGE_POST_FAILURE,
        payload: null,
        error
    }),
    
};

export default actions;