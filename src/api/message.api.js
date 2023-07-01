import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_MESSAGE_LIST = '/letters/:id/messages';
const POST_MESSAGE = '/letters/:id/messages';

export const getMessageList = (id) => {
    let baseUrl = apiUrl + GET_MESSAGE_LIST;
    let url = baseUrl.replace(':id', id);
   
    return (
        axios.get(url, {headers: {'Authorization': 'Bearer ' + cookies.get('app_token')}})
    );
};

export const postMessage = (id, body) => {
    let baseUrl = apiUrl + POST_MESSAGE;
    let url = baseUrl.replace(':id', id);

    const value = {
        body
    }

    return axios.post(url, value, { headers: { 'Authorization': 'Bearer ' + cookies.get('app_token') } });
};