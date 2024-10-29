import axios from "axios";

const api = axios.create({
    baseURL:'http://172.30.60.55:3030'
});

export default api;