import axios from 'axios';
const params = {
    timeout: 15000,

  };
const http = axios.create(params);

export default http;