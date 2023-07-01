import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_REPORT_LOGIN_LIST = '/reports/logins';
const GET_REPORT_PROFILE_LIST = '/reports/profiles';
const GET_REPORT_SENDERS = '/reports/senders/top';
const GET_REPORT_USERS = 'reports/users';
const GET_USERS_PROFILE_VIEW = '/reports/users/:id/profiles/view';


export const getReportLoginList = (params) => {
    let url = apiUrl + GET_REPORT_LOGIN_LIST;

    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }

   
    return (
        axios.get(url, {headers: {'Authorization': 'Bearer ' + cookies.get('app_token')}})
    );
};

export const getReportProfileList = (params) => {
    let url = apiUrl + GET_REPORT_PROFILE_LIST;

    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }

    return (
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } })
    );
};
export const getReportSenderList = (params) => {
    let url = apiUrl + GET_REPORT_SENDERS;


    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }

    if (params.read === true || params.read === false) {
        url += '&read=' + params.read;
    }

    return (
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } })
    );
};
export const getReportUsersList = (params) => {
    let url = apiUrl + GET_REPORT_USERS;

    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }

    return (
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } })
    );
};

export const getReportUserProfileView = (id, params) => {
    const baseUrl = apiUrl + GET_USERS_PROFILE_VIEW;
    let url = baseUrl.replace(':id', id);

    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }
    
    return axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token')}});
};