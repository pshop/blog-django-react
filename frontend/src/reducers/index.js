import { combineReducers } from 'redux';

import * as actionType from "../actions/actionsTypes"

import jwtDecode from 'jwt-decode'

const USERS_INITIAL_STATE = {
  users_list: [],
  current_user: {}
}

const LOGIN_INITIAL_STATE = {
  isSignedIn: null,
  userId : null,
}

const POSTS_INITIAL_STATE = {
  allPosts: [],
  userPosts: []
}

const EDITOR_INITIAL_STATE = {
  title:"",
  content:""
}

const GEO_INITIAL_STATE = {
  setup:[],
  counter:0,
  score:0,
  answers:[],
  type:''
}

const editorReducer = (state = EDITOR_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.EDITOR_SAVE:
      return {...state, title: action.payload.title, content: action.payload.content}
    case actionType.EDITOR_CLEAN:
      return EDITOR_INITIAL_STATE
    default:
      return state
  }
}

const postsReducer = (state = POSTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
      return {...state, allPosts: action.payload}
    case actionType.GET_USER_POSTS:
      return {...state, userPosts: action.payload}
    case actionType.DEL_POST:
      const postToDelete = state.userPosts.filter(post => {return post.id !== action.payload})
      return {...state, userPosts: postToDelete}
    case actionType.POST_POST:
      return state
    default:
      return state;
  }
};

const usersReducer = (state = USERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.GET_USER:
      return {...state, users_list: [...state.users_list, action.payload]}
    case actionType.GET_USER_INFOS:
      return {...state, current_user: action.payload}
    case actionType.DEL_USER_INFOS:
      return USERS_INITIAL_STATE
    default:
      return state;
  }
};

const loginReducer = (state = LOGIN_INITIAL_STATE, action)=>{
  switch (action.type) {
    case actionType.USER_LOGIN:
      const token = jwtDecode(action.payload.access)
      return {...state,
        isSignedIn: true,
        userId: token.user_id,
      }
    case actionType.USER_LOGOUT:
      return LOGIN_INITIAL_STATE
    default:
      return state
  }
}

const geoReducer = (state = GEO_INITIAL_STATE, action)=>{
  switch (action.type) {
    case actionType.GEOGRAPHY_SETUP:
      return {...state, setup: action.payload, counter: 0, score: 0}
    case actionType.GEO_INCREMENT_COUNTER:
      return {...state, counter: state.counter + 1}
    case actionType.GEO_ADD_ANSWER:
      return {...state, answers: [...state.answers, action.payload]}
    case actionType.GEO_INCREMENT_SCORE:
      return {...state, score: state.score + 1}
    case actionType.GEO_SET_TYPE:
      return {...state, type: action.payload}
    default:
      return state
  }
}

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  login: loginReducer,
  editor: editorReducer,
  geo: geoReducer,
});