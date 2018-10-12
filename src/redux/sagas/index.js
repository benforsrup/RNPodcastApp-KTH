import {fork, all} from 'redux-saga/effects'
import { watchPodcastSaga, watchAddCommentSaga } from './firebase_saga'


export default function* mySaga() {
  yield all([
    fork(watchPodcastSaga),
    fork(watchAddCommentSaga)
 
  ])
}