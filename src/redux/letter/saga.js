import {all, call, put, takeEvery} from 'redux-saga/effects';
import actions from './actions';
import {
    getLetterList,
    getLetter,
    postLetter
} from '../../api/letter.api';


export function* getLettersSaga(action) {
    try {
        const response = yield call(getLetterList, action.params);
        yield put(actions.letterListSuccess(response.data));
    } catch (e) {
        yield put(actions.letterListFailure(e));
    }
}

export function* postLetterSaga(action) {
    try {
        yield call(postLetter, action.receiver, action.subject, action.body);
        yield put(actions.letterPostSuccess());
    } catch (e) {
        yield put(actions.letterPostFailure(e));
    }
}

export function* getLetterSaga(action) {
    try {
        const response = yield call(getLetter, action.id);
        yield put(actions.letterOneSuccess(response.data));
    } catch (e) {
        yield put(actions.letterOneFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LETTER_LIST_REQUEST, getLettersSaga),
        takeEvery(actions.LETTER_ONE_REQUEST, getLetterSaga),
        takeEvery(actions.LETTER_POST_REQUEST, postLetterSaga)
    ]);
};