import axios from 'axios'

import axiosInstance, {baseURL} from "./index";

export const axiosGetPosts = () => {
  return axios.get(baseURL+'blogposts')
}

export const axiosGetUser = (id) => {
  return axios.get(baseURL+'user/public/'+id)
}

export const axiosLoginUser = async (username, password) =>{
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