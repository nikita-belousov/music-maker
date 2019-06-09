import { eventChannel } from 'redux-saga'
import { fork, select, takeLatest, put, race, take, call } from 'redux-saga/effects'
import last from 'lodash/last'
import { encodeNote, decodeNote } from '../utils'
import notes from 'app/notes'
import { getCoordsFromCode } from './utils'

import {
  INIT_APP,
  ARROW_SELECTOR_SHOW,
  ARROW_SELECTOR_HIDE,
  SET_ARROW_SELECTOR,
  ARROW_SELECTOR_LEFT,
  ARROW_SELECTOR_RIGHT,
  ARROW_SELECTOR_UP,
  ARROW_SELECTOR_DOWN,
  ARROW_SELECTOR_PICK,
  selectNote,
  arrowSelectorLeft,
  arrowSelectorRight,
  arrowSelectorUp,
  arrowSelectorDown,
  arrowSelectorPick,
  setArrowSelector,
  setArrowSelectorPosition,
} from '../actions'

import {
  getCanvasMeasure,
  getSelectorPosition,
  getSelectorIsActive,
} from '../selectors'


export const keysEmitter = emitter => {
  const listener = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
      case 65:
        emitter(arrowSelectorLeft())
        break
      case 39:
			case 68:
        emitter(arrowSelectorRight())
        break
      case 38:
			case 87:
        emitter(arrowSelectorUp())
        break
      case 40:
			case 83:
        emitter(arrowSelectorDown())
        break
      case 13:
        emitter(arrowSelectorPick())
        break
      default:
        return
    }
  }

  document.addEventListener('keydown', listener)

  return () => {
    document.removeEventListener('keydown', listener)
  }
}


// handlers
export const handleInitApp = function* () {
  const highestNote = last(Object.keys(notes))
  const selectorPosition = encodeNote(highestNote, 0, 0, 0)

  yield put(setArrowSelector(selectorPosition))
}

export const handleArrowSelectorShow = function* () {
  const isActive = yield select(getSelectorIsActive)
  const keysChan = yield call(eventChannel, keysEmitter)

  const winner = yield race({
    keys: call(function* () {
      while (true) {
        const action = yield take(keysChan)
        yield put(action)
      }
    }),
    cancel: take(ARROW_SELECTOR_HIDE)
  })

  keysChan.close()
}

export const handleArrowSelectorRight = function* () {
  const currentPos = yield select(getSelectorPosition)
  const { name, bar, beat, split } = decodeNote(currentPos.get('code'))
  const { bars, beats, splits } = yield select(getCanvasMeasure)

  let newPos

  if (split < splits - 1) {
    newPos = encodeNote(name, bar, beat, split + 1)
  } else if (beat < beats - 1) {
    newPos = encodeNote(name, bar, beat + 1, 0)
  } else if (bar < bars - 1) {
    newPos = encodeNote(name, bar + 1, 0, 0)
  } else return

  yield put(setArrowSelector(newPos))
}

export const handleArrowSelectorLeft = function* () {
  const currentPos = yield select(getSelectorPosition)
  const { name, bar, beat, split } = decodeNote(currentPos.get('code'))
  const { bars, beats, splits } = yield select(getCanvasMeasure)

  let newPos

  if (split > 0) {
    newPos = encodeNote(name, bar, beat, split - 1)
  } else if (beat > 0) {
    newPos = encodeNote(name, bar, beat - 1, splits - 1)
  } else if (bar > 0) {
    newPos = encodeNote(name, bar - 1, beats - 1, splits - 1)
  } else return

  yield put(setArrowSelector(newPos))
}

export const handleArrowSelectorUp = function* () {
  const currentPos = yield select(getSelectorPosition)
  const { name, bar, beat, split } = decodeNote(currentPos.get('code'))
  const noteNames = Object.keys(notes)
  const i = noteNames.indexOf(name)

  let newPos

  if (i < noteNames.length - 1) {
    newPos = encodeNote(noteNames[i + 1], bar, beat, split)
  } else return

  yield put(setArrowSelector(newPos))
}

export const handleArrowSelectorDown = function* () {
  const currentPos = yield select(getSelectorPosition)
  const { name, bar, beat, split } = decodeNote(currentPos.get('code'))
  const noteNames = Object.keys(notes)
  const i = noteNames.indexOf(name)

  let newPos

  if (i > 0) {
    newPos = encodeNote(noteNames[i - 1], bar, beat, split)
  } else return

  yield put(setArrowSelector(newPos))
}

export const handleArrowSelectorSelect = function* () {
  const position = yield select(getSelectorPosition)
  yield put(selectNote(position.get('code')))
}

export const handleSetArrowSelector = function* (action) {
  const { code } = action.payload
  const coords = yield call(getCoordsFromCode, code)

  yield put(setArrowSelectorPosition(code, coords))
}


// watchers
export const watchInitApp = function* () {
  yield takeLatest(INIT_APP, handleInitApp)
}

export const watchToggleArrowSelector = function* () {
  yield takeLatest(ARROW_SELECTOR_SHOW, handleArrowSelectorShow)
}

export const watchArrowSelectorLeft = function* () {
  yield takeLatest(ARROW_SELECTOR_LEFT, handleArrowSelectorLeft)
}

export const watchArrowSelectorRight = function* () {
  yield takeLatest(ARROW_SELECTOR_RIGHT, handleArrowSelectorRight)
}

export const watchArrowSelectorUp = function* () {
  yield takeLatest(ARROW_SELECTOR_UP, handleArrowSelectorUp)
}

export const watchArrowSelectorDown = function* () {
  yield takeLatest(ARROW_SELECTOR_DOWN, handleArrowSelectorDown)
}

export const watchArrowSelectorSelect = function* () {
  yield takeLatest(ARROW_SELECTOR_PICK, handleArrowSelectorSelect)
}

export const watchSetArrowSelector = function* () {
  yield takeLatest(SET_ARROW_SELECTOR, handleSetArrowSelector)
}


const forked = [
  fork(watchInitApp),
  fork(watchToggleArrowSelector),
  fork(watchArrowSelectorLeft),
  fork(watchArrowSelectorRight),
  fork(watchArrowSelectorUp),
  fork(watchArrowSelectorDown),
  fork(watchArrowSelectorSelect),
  fork(watchSetArrowSelector),
]


export default forked
