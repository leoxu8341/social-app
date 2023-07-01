import {all, call, put, takeEvery} from 'redux-saga/effects';
import actions from './actions';
import {
    getProfileList,
    getProfile,
    postProfile,
    udpateProfile,
    getMyProfile
} from '../../api/profile.api';
import {
    getHobbiesList
} from '../../api/hobby.api';

export function* getHobbiesSaga(action) {
    try {
        const response = yield call(getHobbiesList);
        yield put(actions.hobbyListSuccess(response.data));
    } catch (e) {
        yield put(actions.hobbyListFailure(e));
    }
}

export function* getProfilesSaga(action) {
    try {
        const response = yield call(getProfileList, action.params);
        yield put(actions.profileListSuccess(response.data));
    } catch (e) {
        yield put(actions.profileListFailure(e));
    }
}

export function* postProfileSaga(action) {
    try {
        yield call(postProfile, action.data);
        yield put(actions.profilePostSuccess());
        yield put(actions.profileMyRequest());
    } catch (e) {
        yield put(actions.profilePostFailure(e));
    }
}

export function* updateProfileSaga(action) {
    try {
        yield call(udpateProfile, action.data);
        yield put(actions.profileUpdateSuccess());
        yield put(actions.profileMyRequest());
    } catch (e) {
        yield put(actions.profileUpdateFailure(e));
    }
}

export function* getProfileSaga(action) {
    try {
        const response = yield call(getProfile, action.id);
        yield put(actions.profileOneSuccess(response.data));
    } catch (e) {
        yield put(actions.profileOneFailure(e));
    }
}

export function* getMyProfileSaga(action) {
    try {
        const response = yield call(getMyProfile);
        yield put(actions.profileMySuccess(response.data));
    } catch (e) {
        yield put(actions.profileMyFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.PROFILE_LIST_REQUEST, getProfilesSaga),
        takeEvery(actions.PROFILE_ONE_REQUEST, getProfileSaga),
        takeEvery(actions.PROFILE_POST_REQUEST, postProfileSaga),
        takeEvery(actions.PROFILE_UPDATE_REQUEST, updateProfileSaga),
        takeEvery(actions.PROFILE_MY_REQUEST, getMyProfileSaga),
        takeEvery(actions.HOBBY_LIST_REQUEST, getHobbiesSaga)
    ]);
};