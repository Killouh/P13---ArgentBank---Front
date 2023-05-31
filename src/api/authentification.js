import axios from 'axios';
import { URL_LOGIN } from './api_url.js';

export async function loginUser(credientials) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL_LOGIN, credientials)
      const token = res.data.body.token
      console.log(token);
      if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      else delete axios.defaults.headers.common['Authorization']
      console.log(res.data)
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}