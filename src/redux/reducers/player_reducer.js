import { SET_CURRENT_TIME, TOGGLE_MINIMIZED, SET_CURRENT_PLAYBACK_MODE} from '../constants/ActionTypes'
import TrackPlayer from 'react-native-track-player';
 
const initialState = {
  title:"",
  playbackState:TrackPlayer.STATE_PAUSED,
  currentTime:0,
  isMinimized:"",
  currentPodcast:""
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
    case SET_CURRENT_PLAYBACK_MODE:
      return {
        ...state,
        playbackState:action.payload
      }

    default:
      return state
  }
}