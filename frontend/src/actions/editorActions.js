import * as actionType from "./actionsTypes";

export const editorSave = (title, content) => dispatch => {
  const payload = {title, content}
  dispatch({type: actionType.EDITOR_SAVE, payload})
}

export const editorClean = () => dispatch => {
  dispatch({type: actionType.EDITOR_CLEAN})
}