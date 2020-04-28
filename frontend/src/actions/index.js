import _ from 'lodash';
import {
  axiosGetPosts,
  axiosGetUserPosts,
  axiosPostPost,
  axiosGetUser,
  axiosLoginUser,
  axiosLogoutUser,
} from "../axiosApi/apiCalls";

import jwtDecode from 'jwt-decode'

import * as actionType from "./actionsTypes"

export const getPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(getPosts())
  _.chain(getState().posts.allPosts)
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

export const getUserPosts = (userId) => async dispatch => {
  const response = await axiosGetUserPosts(userId)
  if (typeof response.data !== 'string'){
    dispatch({type: actionType.GET_USER_POSTS, payload:response.data})
  }
}

export const getUser = (id) => async dispatch => {
  const response = await axiosGetUser(id)
  dispatch({type: actionType.GET_USER, payload: response.data})
}

export const signIn = (username = "", password = "") => async dispatch => {
  let payload = null
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  // if user already has a key stored
  if (refresh_token && refresh_token !== "undefined") {
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    payload = {access, refresh}
  } else if (username !== "" && password !== "") {
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
  }
}

export const signOut = () => async dispatch => {
  const response = await axiosLogoutUser()
  if (response.status === 205){
    dispatch({type: actionType.USER_LOGOUT})
    dispatch({type: actionType.DEL_USER_INFOS})
  }
}