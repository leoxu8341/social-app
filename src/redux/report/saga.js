import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions from './actions'
import {
  getReportLoginList,
  getReportProfileList,
  getReportSenderList,
  getReportUsersList,
  getReportUserProfileView,
} from '../../api/report.api'

export function* getReportLoginListSaga(action) {
  try {
    const response = yield call(getReportLoginList, action.params)
    yield put(actions.reportLoginListSuccess(response.data))
  } catch (e) {
    yield put(actions.reportLoginListFailure(e))
  }
}

export function* getReportProfileListSaga(action) {
  try {
    const response = yield call(getReportProfileList, action.params)
    yield put(actions.reportProfileListSuccess(response.data))
  } catch (e) {
    yield put(actions.reportProfileListFailure(e))
  }
}

export function* getReportSenderListSaga(action) {
  try {
    const response = yield call(getReportSenderList, action.params)
    yield put(actions.reportSenderListSuccess(response.data))
  } catch (e) {
    yield put(actions.reportSenderListFailure(e))
  }
}

export function* getReportUsersListSaga(action) {
  try {
    const response = yield call(getReportUsersList, action.params)
    yield put(actions.reportUserListSuccess(response.data))
  } catch (e) {
    yield put(actions.reportUserListFailure(e))
  }
}

export function* getReportUserProfileViewSaga(action) {
  try {
    const response = yield call(getReportUserProfileView, action.id, action.params)
    yield put(actions.reportUserProfileViewSuccess(response.data))
  } catch (e) {
    yield put(actions.reportUserProfileViewFailure(e))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.REPORT_LOGIN_LIST_REQUEST, getReportLoginListSaga),
    takeEvery(actions.REPORT_PROFILE_LIST_REQUEST, getReportProfileListSaga),
    takeEvery(actions.REPORT_SENDER_LIST_REQUEST, getReportSenderListSaga),
    takeEvery(actions.REPORT_USER_LIST_REQUEST, getReportUsersListSaga),
    takeEvery(actions.REPORT_USER_PROFILE_VIEW_REQUEST, getReportUserProfileViewSaga),
  ])
}
