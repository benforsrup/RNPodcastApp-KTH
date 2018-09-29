import * as types from '../constants/ActionTypes'

export const toggleMinimized = (color) => ({type:types.TOGGLE_MINIMIZED,color})
export const addComment = comment => ({type:types.ADD_COMMENT, comment})
export const deleteComment = id =>({type:types.DELETE_COMMENT, id})
export const getCommentByTime = time => ({type:types.GET_COMMENTS, time})
export const getTopCommentByTime = time => ({type:types.GET_TOP_COMMENT, time})
export const setCurrentTime = time => ({type:types.SET_CURRENT_TIME, time})
export const addProfile = profile => ({ type: types.ADD_PROFILE, profile })
export const deleteProfile = id => ({ type: types.DELETE_PROFILE, id })

export const requestProfiles = () => ({type:types.REQUEST_PROFILES})
export const receivedProfiles = (profile) => ({type:types.RECEIVED_PROFILES, profile})


export const requestStartStations = string => ({type:types.REQUEST_START_STATIONS, string})
export const requestEndStations = string => ({type:types.REQUEST_END_STATIONS, string})

export const receivedStartStations = data =>({type:types.RECEIVED_START_STATIONS, data})
export const receivedEndStations = data =>({type:types.RECEIVED_END_STATIONS, data})


export const clearStations = () =>({type:types.CLEAR_STATIONS})
export const toggleVisible = () =>({type:types.TOGGLE_VISIBLE})

export const setStartStationQuery = (query) =>({type:types.SET_STARTSTATIONQUERY, query})
export const setEndStationQuery = (query) =>({type:types.SET_ENDSTATIONQUERY, query})