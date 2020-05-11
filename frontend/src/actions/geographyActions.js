import {axiosSetupGeography} from "../axiosApi/apiCalls";
import * as actionType from "./actionsTypes";


export const setupGeography = (
  exType,
  nbTrials=12,
  continent=null,
  difficulty=3,) => async dispatch => {
    const response = await axiosSetupGeography(nbTrials, continent, difficulty, exType)
    if (response.status === 200){
        dispatch({type: actionType.GEOGRAPHY_SETUP, payload: response.data})
    }
}

export const incrementCounter = () => dispatch =>{
    dispatch({type: actionType.GEO_INCREMENT_COUNTER})
}

export const incrementScore = () => dispatch => {
    dispatch({type: actionType.GEO_INCREMENT_SCORE})
}

export const setType = (type) => dispatch => {
    dispatch({
        type: actionType.GEO_SET_TYPE,
        payload:type.toUpperCase()})
}

export const addAnswer = (country, answer) => dispatch => {
    dispatch({
        type: actionType.GEO_ADD_ANSWER,
        payload: {country, answer}
    })
}
