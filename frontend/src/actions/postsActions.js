import {axiosGetPosts, axiosGetUserPosts, axiosPostPost,axiosDelUserPost} from "../axiosApi/apiCalls";
import * as actionType from "./actionsTypes";
import _ from "lodash";
import {getUser} from "./index";

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

export const delUserPost = (postId) => async dispatch => {
  await axiosDelUserPost(postId)
  dispatch({type:actionType.DEL_POST, payload: postId})
}

export const getUserPosts = (userId) => async dispatch => {
  const response = await axiosGetUserPosts(userId)
  if (typeof response.data !== 'string'){
    dispatch({type: actionType.GET_USER_POSTS, payload:response.data})
  }
}

export const postPost = (title, content) => async (dispatch, getState) => {
  const userId = getState().users.current_user.pk
  const response = await axiosPostPost(title, content)
  dispatch({type: actionType.POST_POST})
  dispatch(getUserPosts(userId))

}