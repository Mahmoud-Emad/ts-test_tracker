import axios from 'axios';
import { authStore } from '../stores/users';

const noConfigs = () => {
  throw new Error(
    'Invalid config. Please fill the config.json file with the correct data',
  );
};

const http = axios.create( {
  baseURL: window.config ? window.config.SERVER_API_URL : noConfigs(),
  headers: {
    'Content-Type': 'application/json',
  },
} );

http.interceptors.request.use( ( config ) => {
  if ( authStore.isAuth() ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem( 'accessToken' )}`,
    };
  }
  return config;
} );

export default http;
