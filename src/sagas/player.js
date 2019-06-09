import { select, takeLatest, fork, call, put, race, take } from 'redux-saga/effects'
import notes from 'app/notes'
import Audio from 'app/audio'
import { decodeNote } from '../utils'
import { delay } from './utils'

import {
  getCanvasSelectedNotes,
  getCanvasMeasure,
  getPlayerWaveType,
  getPlayerTempo,
  getPlayerIndicator,
  getPlayerNoteDuration
} from '../selectors'

import {
  resetIndicator,
  setWaveType,
  moveIndicator,
  stopTrack,
  PLAY_TRACK,
  STOP_TRACK,
  SELECT_NOTE,
  CHANGE_WAVE_TYPE
} from '../actions'


let audio

export const updateIndicator = function* (noteDuration, totalBeats) {
  while (true) {
    const indicator = yield select(getPlayerIndicator)
    yield call(delay, noteDuration)

    if (indicator < totalBeats - 1) {
      yield put(moveIndicator())
    } else {
      yield put(stopTrack())
    }
  }
}


// handlers
export const handlePlayTrack = function* () {
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const waveType = yield select(getPlayerWaveType)
  audio = new Audio(context, waveType)

  const selectedNotes = yield select(getCanvasSelectedNotes)

  const tempo = yield select(getPlayerTempo)
  const { bars, beats, splits } = yield select(getCanvasMeasure)
  const beatDuration = 60 / tempo
  const noteDuration = beatDuration / splits

  const beatsTotal = bars * beats * splits

  selectedNotes.keys().forEach(code => {
    console.log(code)

    // const [name, bar, beat, split] = decodeNote(code)
    // const freq = notes[name]
    //
    // const noteTime =
    //   (beats * bar * beatDuration) +
    //   (beat * beatDuration) +
    //   (split * noteDuration)
    //
    // audio.play(freq, noteTime, noteDuration)
  })

  yield race({
    update: call(updateIndicator, noteDuration, beatsTotal),
    cancel: take(STOP_TRACK)
  })
}

export const handleStopTrack = function* () {
  yield put(resetIndicator())
  audio.context.close()
}

export const handleSelectNote = function* (action) {
  const { code } = action.payload
  const { name } = decodeNote(code)
  const freq = notes[name]

  const noteDuration = yield select(getPlayerNoteDuration)
  const waveType = yield select(getPlayerWaveType)

  const context = new (window.AudioContext || window.webkitAudioContext)()
  const selectAudio = new Audio(context, waveType)

  selectAudio.play(freq, 0, noteDuration)
}

export const handleChangeWaveType = function* () {
  const WAVE_TYPES = ['sine', 'saw', 'square', 'triangle']

  const waveType = yield select(getPlayerWaveType)
  const currentIndex = WAVE_TYPES.indexOf(waveType)
  const nextIndex = currentIndex < WAVE_TYPES.length - 1
    ? currentIndex + 1 : 0

  yield put(setWaveType(WAVE_TYPES[nextIndex]))
}


// watchers
export const watchPlay = function* () {
  yield takeLatest(PLAY_TRACK, handlePlayTrack)
}

export const watchStop = function* () {
  yield takeLatest(STOP_TRACK, handleStopTrack)
}

export const watchSelectNote = function* () {
  yield takeLatest(SELECT_NOTE, handleSelectNote)
}

export const watchChangeWaveType = function* () {
  yield takeLatest(CHANGE_WAVE_TYPE, handleChangeWaveType)
}


const forked = [
  fork(watchPlay),
  fork(watchStop),
  fork(watchSelectNote),
  fork(watchChangeWaveType)
]


export default forked
