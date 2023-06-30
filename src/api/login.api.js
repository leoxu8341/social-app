import axios from 'axios';
import config from '../config/config';

const loginUrl = config.loginUrl;
const apiUrl = config.apiUrl;
const LOGIN = '/login';
const REGISTER = '/registration';

export const login = (email, password) => {
    const url = loginUrl + LOGIN;

    const value = {
        email: email,
        password: password
    };

    return axios.post(url, value);
};

export const register = (email, password, first, last) => {
    const url = loginUrl + REGISTER;

    const value = {
        email: email,
        first_name: first,
        last_name: last,
        password: password
    };

    return axios.post(url, value);
};