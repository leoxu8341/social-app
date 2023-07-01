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

    
};

export default actions;