import axios from 'axios'
import config from '../config/config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const apiUrl = config.apiUrl
const GET_LETTER_LIST = '/letters'
const POST_LETTER = '/letters/new'
const GET_ONE_LETTER = '/letters/:id'

export const getLetterList = (params) => {
  let url = apiUrl + GET_LETTER_LIST

  if (params.pageIndex) {
    url += '?page_index=' + params.pageIndex
  }

  if (params.receiver === true || params.receiver === false) {
    url += '&receiver=' + params.receiver
  }

  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + cookies.get('app_token') },
  })
}

export const postLetter = (receiver, subject, body) => {
  const url = apiUrl + POST_LETTER

  const value = {
    subject: subject,
    body: body,
    receiver_id: receiver,
  }

  return axios.post(url, value, {
    headers: { Authorization: 'Bearer ' + cookies.get('app_token') },
  })
}

export const openLetter = (id) => {
  const baseUrl = apiUrl + GET_ONE_LETTER
  let url = baseUrl.replace(':id', id)

  return axios.patch(
    url,
    {},
    { headers: { Authorization: 'Bearer ' + cookies.get('app_token') } }
  )
}

export const getLetter = (id) => {
  const baseUrl = apiUrl + GET_ONE_LETTER
  let url = baseUrl.replace(':id', id)

  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + cookies.get('app_token') },
  })
}
