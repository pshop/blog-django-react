import {axiosGetUser, axiosLoginUser, axiosLogoutUser} from "../axiosApi/apiCalls";
import * as actionType from "./actionsTypes";
import jwtDecode from "jwt-decode";

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