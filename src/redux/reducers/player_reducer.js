import { SET_CURRENT_TIME, TOGGLE_MINIMIZED} from '../constants/ActionTypes'

const initialState = {
  title:"",
  currentTime:0,
  isMinimized:""
}

export default function player(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return {
        ...state, currentTime: action.time
      }
    case TOGGLE_MINIMIZED:
      return {
        ...state, isMinimized: action.color
      }

    default:
      return state
  }
}