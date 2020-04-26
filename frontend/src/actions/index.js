import _ from 'lodash';
import {
  axiosGetPosts,
  axiosPostPost,
  axiosGetUser,
  axiosLoginUser,
  axiosLogoutUser,
} from "../axiosApi/apiCalls";

import jwtDecode from 'jwt-decode'

import * as actionType from "./actionsTypes"

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
  dispatch({type: actionType.GET_POSTS, payload: response.data})
}

export const postPost = (title, content) => async dispatch => {
  const response = await axiosPostPost(title, content)
  dispatch({type: actionType.POST_POST})
}

export const getUser = (id) => async dispatch => {
  const response = await axiosGetUser(id)
  dispatch({type: actionType.GET_USER, payload: response.data})
}

export const signIn = (username = "", password = "") => async dispatch => {
  let payload = null
  // if user already has a key stored
  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    payload = {access, refresh}
  } else {
    const response = await axiosLoginUser(username, password)
    if (response.data) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      if (response.status !== 200) {
        dispatch({type: actionType.USER_LOGIN_FAIL, payload: response})
        throw response
      } else {
        payload = {access: response.data.access, refresh: response.data.refresh}
      }
    }
  }
  if (payload) {
    dispatch({type: actionType.USER_LOGIN, payload})
    const response = await axiosGetUser(jwtDecode(payload.access).user_id)
    dispatch({type: actionType.GET_USER_INFOS, payload: response.data})
  } else {
    throw "An error occured"
  }
}

export const signOut = () => async dispatch => {
  const response = await axiosLogoutUser()
  if (response.status === 205){
    dispatch({type: actionType.USER_LOGOUT})
    dispatch({type: actionType.DEL_USER_INFOS})
  }
}