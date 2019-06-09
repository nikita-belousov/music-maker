import { select, put, takeLatest, fork, call} from 'redux-saga/effects'
import { getGridSettings, getCoordsFromCode } from './utils'

import {
  getCanvasMeasure,
  getPlayerTempo
} from '../selectors'

import {
  setNoteDuration,
  addNoteToGrid,
  removeNoteFromGrid,
  INIT_APP,
  SET_GRID_BARS,
  SET_GRID_BEATS,
  SET_GRID_SPLITS,
  SELECT_NOTE,
  DESELECT_NOTE
} from '../actions'


export const updateNoteDuration = function* () {
  const tempo = yield select(getPlayerTempo)
  const { bar, beats, splits } = yield select(getCanvasMeasure)
  const beatDuration = 60 / tempo
  const noteDuration = beatDuration / splits

  yield put(setNoteDuration(noteDuration))
}


//handlers
export const handleInitApp = function* () {
  yield call(updateNoteDuration)
}

export const handleResize = function* () {
  yield call(updateNoteDuration)
}

export const handleSelectNote = function* (action) {
  const { code } = action.payload

  const { top, left } = yield call(getCoordsFromCode, code)
  yield put(addNoteToGrid(code, { top, left }))
}

export const handleDeselectNote = function* (action) {
  yield put(removeNoteFromGrid(action.payload.code))
}


// watchers
export const watchInitApp = function* () {
  yield takeLatest(INIT_APP, handleInitApp)
}

export const watchResize = function* () {
  yield takeLatest([
    SET_GRID_BARS,
    SET_GRID_BEATS,
    SET_GRID_SPLITS
  ], handleResize)
}

export const watchSelectNote = function* () {
  yield takeLatest(SELECT_NOTE, handleSelectNote)
}

export const watchDeselectNote = function* () {
  yield takeLatest(DESELECT_NOTE, handleDeselectNote)
}


const forked = [
  fork(watchInitApp),
  fork(watchResize),
  fork(watchSelectNote),
  fork(watchDeselectNote)
]


export default forked
