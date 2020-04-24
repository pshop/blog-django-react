import { combineReducers } from 'redux';
import {
  GET_USER,
  GET_POSTS,
  GET_USER_INFOS,
  DEL_USER_INFOS,
  USER_LOGIN_FAIL,
  USER_LOGIN, USER_LOGOUT
} from "../actions/actionsTypes";

import jwtDecode from 'jwt-decode'

const USERS_INITIAL_STATE = {
  users_list: [],
  current_user: {}
}

const LOGIN_INITIAL_STATE = {
  isSignedIn: null,
  userId : null,
}

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
};

const usersReducer = (state = USERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {...state, users_list: [...state.users_list, action.payload]}
    case GET_USER_INFOS:
      return {...state, current_user: action.payload}
    case DEL_USER_INFOS:
      return USERS_INITIAL_STATE
    default:
      return state;
  }
};

const loginReducer = (state = LOGIN_INITIAL_STATE, action)=>{
  switch (action.type) {
    case USER_LOGIN:
      const token = jwtDecode(action.payload.access)
      return {...state,
        isSignedIn: true,
        userId: token.user_id,
      }
    case USER_LOGOUT:
      console.log("LOGOUT compoenent")
      return LOGIN_INITIAL_STATE
    default:
      return state
  }
}

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  login: loginReducer,
});