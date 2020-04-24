import _ from 'lodash';
import {
  axiosGetPosts,
  axiosGetUser,
  axiosLoginUser
} from "../axiosApi/apiCalls";
import jwtDecode from 'jwt-decode'

import {baseURL, axiosInstance} from "../axiosApi";

import {GET_POSTS, GET_USER, USER_LOGIN, USER_LOGIN_FAIL} from "./actionsTypes";


export const getPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(getPosts())
  _.chain(getState().posts)
    .map('author')
    .uniq()
    .forEach(id => dispatch(getUser(id)))
    .value()
}

export const getPosts = () => async dispatch => {
  const response = await axiosGetPosts()
  dispatch({type: GET_POSTS, payload: response.data})
}

export const getUser = (id) => async dispatch => {
  const response = await axiosGetUser(id)
  dispatch({type: GET_USER, payload: response.data})
}

export const signIn = (username = "", password = "") => async dispatch => {

  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    const payload = {access, refresh}
    dispatch({type: USER_LOGIN, payload})
  } else {
    const response = await axiosLoginUser(username, password)
    if (response.data) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      if (response.status === 200) {
        dispatch({type: USER_LOGIN, payload: response.data})
      } else {
        dispatch({type: USER_LOGIN_FAIL, payload: response})
      }
    }


  }
  console.log("hello i guess")
}