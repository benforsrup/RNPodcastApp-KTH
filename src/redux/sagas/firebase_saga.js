import { call, put, takeLatest } from "redux-saga/effects";
import firebase from 'react-native-firebase'
import * as actions from "../actions";
import * as types from '../constants/ActionTypes'
import { api } from '../../services'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getCommentsByPodcast(data) {
  let id = data.podcastid
  try {
    // do api call
    
    const data = yield call(api.fetchPodcasts, id);
    yield put(actions.receivedCommentsByPodcast(data));
  } catch (e) {
    console.log(e);
  }
}

function* addCommentToPodcast(data){
  let comment = data.comment
  try{
    const data = yield call(api.addComment, comment)
    
    if(!comment.isParent){
      yield put(actions.toggleHasReply(comment.parentid))
      
    }
    yield put(actions.receivedNewComment(data))
  }catch(e){
    console.log(e)
  }
}

function* addUpvote(data){
  console.log(data)
  let id = data.payload.id
  let inc = data.payload.inc
  yield call(api.upvote, id, inc)
  yield put(actions.receivedUpvote(id, inc))
}

export function* watchPodcastSaga() {
  yield takeLatest(types.REQUEST_COMMENTS_BY_PODCAST, getCommentsByPodcast);
}
export function* watchAddCommentSaga() {
  yield takeLatest(types.REQUEST_ADD_COMMENT, addCommentToPodcast);
}

export function* watchAddUpvote() {
  yield takeLatest(types.REQUEST_UPVOTE, addUpvote);
}

