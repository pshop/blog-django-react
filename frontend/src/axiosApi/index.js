import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = 'http://127.0.0.1:8000/api/'


export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;

      // test for token presence, no point in sending a request if token isn't present
      if (localStorage.getItem('refresh_token') && error.response.status === 401 && error.response.statusText === "Unauthorized") {
          const refresh_token = localStorage.getItem('refresh_token');

          return axiosInstance
              .post('/token/refresh', {refresh: refresh_token})
              .then((response) => {

                  localStorage.setItem('access_token', response.data.access);
                  localStorage.setItem('refresh_token', response.data.refresh);

                  axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                  originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                  return axiosInstance(originalRequest);
              })
              .catch(err => {
                  console.log(err)
              });
      }
      // specific error handling done elsewhere
      return Promise.reject({...error});
  }
);

const axiosGet = axios.create({
  baseURL: baseURL
})

export default axiosInstance