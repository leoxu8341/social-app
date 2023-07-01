const actions = {
  LETTER_LIST_REQUEST: 'LETTER_LIST_REQUEST',
  LETTER_LIST_SUCCESS: 'LETTER_LIST_SUCCESS',
  LETTER_LIST_FAILURE: 'LETTER_LIST_FAILURE',

  letterListRequest: (params) => ({
    type: actions.LETTER_LIST_REQUEST,
    params,
  }),
  letterListSuccess: (letters) => ({
    type: actions.LETTER_LIST_SUCCESS,
    payload: letters,
  }),
  letterListFailure: (error) => ({
    type: actions.LETTER_LIST_FAILURE,
    payload: [],
    error,
  }),

  RESET_LETTER_STATE: 'RESET_LETTER_STATE',

  resetLETTERState: () => ({
    type: actions.RESET_LETTER_STATE,
  }),

  LETTER_ONE_REQUEST: 'LETTER_ONE_REQUEST',
  LETTER_ONE_SUCCESS: 'LETTER_ONE_SUCCESS',
  LETTER_ONE_FAILURE: 'LETTER_ONE_FAILURE',

  letterOneRequest: (id) => ({
    type: actions.LETTER_ONE_REQUEST,
    id,
  }),
  letterOneSuccess: (letter) => ({
    type: actions.LETTER_ONE_SUCCESS,
    payload: letter,
  }),
  letterOneFailure: (error) => ({
    type: actions.LETTER_ONE_FAILURE,
    payload: null,
    error,
  }),
  LETTER_POST_REQUEST: 'LETTER_POST_REQUEST',
  LETTER_POST_SUCCESS: 'LETTER_POST_SUCCESS',
  LETTER_POST_FAILURE: 'LETTER_POST_FAILURE',

  letterPostRequest: (receiver, subject, body) => ({
    type: actions.LETTER_POST_REQUEST,
    receiver,
    subject,
    body,
  }),
  letterPostSuccess: () => ({
    type: actions.LETTER_POST_SUCCESS,
    payload: null,
  }),
  letterPostFailure: (error) => ({
    type: actions.LETTER_POST_FAILURE,
    payload: null,
    error,
  }),

  LETTER_OPEN_REQUEST: 'LETTER_OPEN_REQUEST',
  LETTER_OPEN_SUCCESS: 'LETTER_OPEN_SUCCESS',
  LETTER_OPEN_FAILURE: 'LETTER_OPEN_FAILURE',
  letterOpenRequest: (id) => ({
    type: actions.LETTER_OPEN_REQUEST,
    id,
  }),
  letterOpenSuccess: () => ({
    type: actions.LETTER_OPEN_SUCCESS,
    payload: null,
  }),
  letterOpenFailure: (error) => ({
    type: actions.LETTER_OPEN_FAILURE,
    payload: null,
    error,
  }),
}

export default actions
