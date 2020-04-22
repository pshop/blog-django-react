import _ from 'lodash';
import axios from 'axios'
import {baseURL} from "../axiosApi";


export const getPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(getPosts())
  _.chain(getState().posts)
    .map('author')
    .uniq()
    .forEach(id => dispatch(getUser(id)))
    .value()
}

export const getPosts = () => async dispatch => {
  const response = await axios.get(baseURL+'blogposts')
  dispatch({type: 'GET_POSTS', payload: response.data})
}

export const getUser = (id) => async dispatch => {
  const response = await axios.get(baseURL+'user/public/'+id)
  dispatch({type: 'GET_USER', payload: response.data})
}