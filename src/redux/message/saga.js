import {all, call, put, takeEvery} from 'redux-saga/effects';
import actions from './actions';
import {
    getMessageList
} from '../../api/message.api';


export function* getMessagesSaga(action) {
    try {
        const response = yield call(getMessageList, action.id);
        yield put(actions.messageListSuccess(response.data));
    } catch (e) {
        yield put(actions.messageListFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.MESSAGE_LIST_REQUEST, getMessagesSaga)
    ]);
};