import axios from "axios";

const api = axios.create({
  baseURL: "https://sgitjobs.com/dealslah/public/api/",
});

api.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
