import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_MESSAGE_LIST = '/letters/:id/messages';

export const getMessageList = (id) => {
    let baseUrl = apiUrl + GET_MESSAGE_LIST;
    let url = baseUrl.replace(':id', id);
   
    return (
        axios.get(url, {headers: {'Authorization': 'Bearer ' + cookies.get('app_token')}})
    );
};