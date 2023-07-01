import axios from 'axios'
import config from '../config/config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const apiUrl = config.loginUrl
const GET_HOBBIES_LIST = '/hobbies'

export const getHobbiesList = () => {
  let url = apiUrl + GET_HOBBIES_LIST

  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + cookies.get('app_token') },
  })
}
