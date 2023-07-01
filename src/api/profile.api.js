import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_PROFILE_LIST = '/profiles';
const POST_PROFILE = '/profiles/self';
const UPDATE_PROFILE = '/profiles/self';
const GET_ONE_PROFILE = '/profiles/:id';
const GET_MY_PROFILE = '/profiles/self';

export const getProfileList = (params) => {
    let url = apiUrl + GET_PROFILE_LIST;
    
    // if (params.pageLimit) {
    //     url += '?page_limit=' + params.pageLimit;
    // }

    if (params.pageIndex) {
        url += '?page_index=' + params.pageIndex;
    }

   
    return (
        axios.get(url, {headers: {'Authorization': 'Bearer ' + cookies.get('app_token')}})
    );
};

export const postProfile = (data) => {
    const url = apiUrl + POST_PROFILE;

    const value = data;

    return axios.post(url, value, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token')}});
};

export const udpateProfile = (data) => {
    const url = apiUrl + UPDATE_PROFILE;

    const value = data;

    return axios.put(url, value, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } });
};

export const getMyProfile = () => {
    const url = apiUrl + GET_MY_PROFILE;

    return axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } });
};

export const getProfile = (id) => {
    const baseUrl = apiUrl + GET_ONE_PROFILE;
    let url = baseUrl.replace(':id', id);
    
    return axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token')}});
};