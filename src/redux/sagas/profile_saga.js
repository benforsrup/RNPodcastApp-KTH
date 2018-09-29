import {  takeEvery } from 'redux-saga/effects'
import * as actions from '../constants/ActionTypes'

export function* getProfiles() {
  
}



export function* watchGetProfiles() {
  yield takeEvery(actions.REQUEST_PROFILES, getProfiles)
}