import {fork, all} from 'redux-saga/effects'
import { watchPodcastSaga, watchAddCommentSaga, watchAddUpvote } from './firebase_saga'


export default function* mySaga() {
  yield all([
    fork(watchPodcastSaga),
    fork(watchAddCommentSaga),
    fork(watchAddUpvote)
  ])
}