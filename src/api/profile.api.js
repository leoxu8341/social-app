import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_PROFILE_LIST = '/profiles';
const POST_PROFILE = '/profiles/self';
const UPDATE_PROFILE = '/profiles/self';
const GET_ONE_PROFILE = '/profiles/:id';

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

// export const postMessage = (message) => {
//     const url = apiUrl + POST_MESSAGE;

//     const value = {
//         message_body: message
//     };

//     return axios.post(url, value, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token')}});
// };

export const getProfile = (id) => {
    const baseUrl = apiUrl + GET_ONE_PROFILE;
    let url = baseUrl.replace(':id', id);
    
    return axios.get(url, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token')}});
};