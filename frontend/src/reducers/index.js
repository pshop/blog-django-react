import { combineReducers } from 'redux';
import {GET_USER, GET_POSTS, USER_LOGIN_FAIL, USER_LOGIN} from "../actions/actionsTypes";

import jwtDecode from 'jwt-decode'

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

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER:
      return [...state, action.payload]
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
    default:
      return state
  }
}

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  login: loginReducer,
});