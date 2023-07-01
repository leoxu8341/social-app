import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions from './actions'
import { getMessageList, postMessage } from '../../api/message.api'

export function* getMessagesSaga(action) {
  try {
    const response = yield call(getMessageList, action.id)
    let messages = []
    if (response.data && response.data.length > 0) {
      messages = response.data.reverse()
    }
    yield put(actions.messageListSuccess(messages))
  } catch (e) {
    yield put(actions.messageListFailure(e))
  }
}

export function* postMessageSaga(action) {
  try {
    const response = yield call(postMessage, action.id, action.body)
    yield put(actions.messagePostSuccess(response.data))
    yield put(actions.messageListRequest(action.id))
  } catch (e) {
    yield put(actions.messagePostFailure(e))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.MESSAGE_LIST_REQUEST, getMessagesSaga),
    takeEvery(actions.MESSAGE_POST_REQUEST, postMessageSaga),
  ])
}
