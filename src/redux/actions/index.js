import * as types from '../constants/ActionTypes'

export const toggleHasReply = (parentId) => ({type:types.TOGGLE_HAS_REPLIES, parentId})
export const toggleMinimized = (color) => ({type:types.TOGGLE_MINIMIZED,color})
export const toggleReply = (id) => ({type:types.TOGGLE_REPLY, id})
export const addComment = comment => ({type:types.ADD_COMMENT, comment})
export const deleteComment = id =>({type:types.DELETE_COMMENT, id})
export const getCommentByTime = time => ({type:types.GET_COMMENTS, time})
export const getTopCommentByTime = time => ({type:types.GET_TOP_COMMENT, time})
export const setCurrentTime = time => ({type:types.SET_CURRENT_TIME, time})

//* ------- REQUEST ACTIONS --------*//
export const requestCommentByPodcast = podcastid => ({type: types.REQUEST_COMMENTS_BY_PODCAST, podcastid})
export const requestAddComment = (comment) => ({type:types.REQUEST_ADD_COMMENT, comment})
export const requestUpvote = (id, inc) => ({type:types.REQUEST_UPVOTE, payload:{
    id,
    inc
}})

//* ------- RECEIVED ACTIONS --------*//
export const receivedCommentsByPodcast = (comments) => ({type:types.RECEIVED_COMMENTS_BY_PODCAST, comments})
export const receivedCommentsByPodcastError = (error) => ({type:types.RECEIVED_COMMENTS_BY_PODCAST_ERROR, error})
export const receivedNewComment = (comment) => ({type:types.RECEIVED_NEW_COMMENT, comment})
export const receivedUpvote = (id, inc) => ({type:types.RECEIVED_UPVOTE, id, inc})



export const setCurrentPlaybackMode = (mode) => ({
    type: types.SET_CURRENT_PLAYBACK_MODE,
    payload: mode
})