import {fork, all} from 'redux-saga/effects'
import { watchGetProfiles } from './profile_saga'
import { watchStationSaga } from './station_saga'

// import { userSaga1, userSaga2 } from "./users";
// import { accountSaga1, accountSaga2 } from "./accounts";


export default function* mySaga() {
  yield all([
  	
    // fork(getAllProducts),
    // fork(watchGetProducts),
    // fork(watchCheckout)
  ])
}