import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const cookiesAPI = {
  setCookie: (name, value, options) => {
    return cookies.set(name, value, options);
  },
  getCookie: (name, options) => {
    return cookies.get(name, options);
  },
  removeCookie: (name, options) => {
    return cookies.remove(name, options);
  }
};

const api = axios.create({
  baseURL: __API_URL__
});

const request = (method, url, options = {}) => {
  const token = cookiesAPI.getCookie('token');
  const defaultHeaders = {};

  if(token) {
    defaultHeaders['Authorization'] = `Basic ${token}`;
  }

  options.headers = options.headers ? {...options.headers, defaultHeaders} : defaultHeaders;

  return api({
    method,
    url,
    ...options
  });
};

export default {
  get: (url, params, options) => {
    return request('GET', url, {
      params,
      ...options
    });
  },
  post: (url, data, options) => {
    return request('POST', url, {
      data,
      ...options
    });
  },
  ...cookiesAPI
};
