import { combineReducers } from 'redux';

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return action.payload;
    default:
      return state;
  }
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER':
      return [...state, action.payload]
    default:
      return state;
  }
};

export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});