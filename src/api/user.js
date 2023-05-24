import axios from 'axios';
import { URL_PROFILE } from './api_url.js';

export async function profileUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(URL_PROFILE)
      resolve(res.data)
    } catch (error) {
      reject(error)
    }
  })
}

export async function userUpDate(userFirstLastName) {
  console.log(userFirstLastName)
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(URL_PROFILE, userFirstLastName)

      console.log(res)

      resolve(res.data)
    } catch (error) {
      console.log('error userUpDate')
      console.log(error)
      reject(error)
    }
  })
}