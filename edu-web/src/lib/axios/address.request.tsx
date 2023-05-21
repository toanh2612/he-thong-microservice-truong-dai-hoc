import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_SCHEDULE,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

axiosInstance2.interceptors.request.use(
  function (req) {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance2.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) return Promise.reject(error.response);
    return null;
  }
);

export default axiosInstance2;
