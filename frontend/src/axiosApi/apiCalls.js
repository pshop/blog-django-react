import axios from 'axios'

import axiosInstance, {baseURL} from "./index";

export const axiosGetPosts = () => {
  return axios.get(baseURL+'blogposts')
}

export const axiosPostPost = async  (title, content) => {
  try {
      const response = await axiosInstance.post('/blogposts', {
        title: title,
        content: content
      });
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + localStorage.getItem('access_token');
      return response
    } catch (e) {
      return e
    }
}

export const axiosGetUser = (id) => {
  return axios.get(baseURL+'user/public/'+id)
}

export const axiosLoginUser = async (username, password) => {
  try {
      const response = await axiosInstance.post('/token/obtain', {
        username: username,
        password: password
      });
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
      return response
    } catch (e) {
      return e
    }
}

export const axiosLogoutUser = async () => {
  try {
    const response = await axiosInstance.post('token/blacklist', {
      "refresh_token": localStorage.getItem("refresh_token")
    });
    console.log(response)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Autorization'] = null;
    return response
  } catch (e) {
    throw e
  }
}