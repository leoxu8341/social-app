import {all, call, put, takeEvery} from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import actions from './actions';
import {login, register} from '../../api/login.api';
import createNotification from '../../notification';
import {message} from 'antd';
import {history} from '../store';

const cookies = new Cookies();

export function* loginSaga(action) {
    try {
        const response = yield call(login, action.email, action.password);
       
        if (response.data.hasOwnProperty('api_token') && response.data.hasOwnProperty('user')) {
            yield call(() => cookies.set('app_token', response.data.api_token, {
                'path': '/',
                'maxAge': 604800
            }));
            
            yield call(() => cookies.set('app_user', response.data.user, {
                'path': '/',
                'maxAge': 604800
            }));

            yield put(actions.loginSuccess(response.data.user, response.data.api_token));
        }
    } catch (e) {
        yield put(actions.loginFailure(e.response.data));
        createNotification('error', 'Login Error', e.response.data.message);
    }
}

export function* registerSaga(action) {
    try {
        const response = yield call(register, action.email, action.password, action.first, action.last);
        if (response.data) {
            yield call(() => cookies.remove('app_token', {
                'path': '/'
            }));

            yield put(actions.registerSuccess(response.data));
            message.success(`User: ${action.username} created!`)

            setTimeout(() => {
                history.push('/login');
            }, 2000);
        }
    } catch (e) {
        yield put(actions.registerFailure(e.response.data));
        createNotification('error', 'Registration Error', e.response.data.message);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOGIN_REQUEST, loginSaga),
        takeEvery(actions.REGISTER_REQUEST, registerSaga)
    ]);
};