import {all, call, put, takeEvery} from 'redux-saga/effects';
import actions from './actions';
import {
    getProfileList,
    getProfile
} from '../../api/profile.api';


export function* getProfilesSaga(action) {
    try {
        const response = yield call(getProfileList, action.params);
        yield put(actions.profileListSuccess(response.data));
    } catch (e) {
        yield put(actions.profileListFailure(e));
    }
}

// export function* postMessageSaga(action) {
//     try {
//         yield call(postMessage, action.message);
//     } catch (e) {
//         yield put(actions.messagePostFailure(e));
//     }
// }

export function* getProfileSaga(action) {
    try {
        const response = yield call(getProfile, action.id);
        yield put(actions.profileOneSuccess(response.data));
    } catch (e) {
        yield put(actions.profileOneFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.PROFILE_LIST_REQUEST, getProfilesSaga),
        takeEvery(actions.PROFILE_ONE_REQUEST, getProfileSaga),
        // takeEvery(actions.MESSAGE_DELETE_REQUEST, deleteMessageSaga)
    ]);
};