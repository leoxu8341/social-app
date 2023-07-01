import {all} from 'redux-saga/effects';
import profileSagas from './profiles/saga';
import authSagas from './auth/saga';
import letterSagas from './letter/saga';
import reportSagas from './report/saga';

export default function* rootSaga(getState) {
    yield all([
        profileSagas(),
        authSagas(),
        letterSagas(),
        reportSagas(),
    ]);
}
