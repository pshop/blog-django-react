import {axiosSetupGeography} from "../axiosApi/apiCalls";
import * as actionType from "./actionsTypes";


export const setupGeography = (
  nbTrials=10,
  continent=null,
  difficulty=3,
  exType='FTC') => async dispatch => {
    const response = await axiosSetupGeography(nbTrials, continent, difficulty, exType)
    if (response.status === 200){
        dispatch({type: actionType.GEOGRAPHY_SETUP, payload: response.data})
    }
}
