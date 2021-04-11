import axios from 'axios'
import { getSession } from '~/helpers/session';
import {apiErrorHandler} from '~/helpers/apiErrorHandler'


const instance = axios.create({
  baseURL: 'http://31.133.50.50:8080/api'
})

instance.interceptors.request.use(function (config) {
  const session = getSession()
  if (session) config.headers['Authorization'] = `Bearer ${session.access_token}`
  return config;
}, function (error) {
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  apiErrorHandler(error)
  return Promise.reject(error);
});

export default instance
