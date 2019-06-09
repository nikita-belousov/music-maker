import { select } from 'redux-saga/effects'
import { decodeNote } from '../utils'
import notes from '../notes'

import {
  getAppBars,
  getAppBeatsPerBar,
  getAppSplitBeats,
  getCanvasMeasure
} from '../selectors'


export const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getCoordsFromCode = function* (code) {
  const { bars, beats, splits } = yield select(getCanvasMeasure)
  const { name, bar, beat, split } = decodeNote(code)
  const noteNames = Object.keys(notes)
  const noteIndex = noteNames.indexOf(name)

  const top = noteNames.length - noteIndex - 1
  const left = (bar * beats * splits) + (beat * splits) + split

  return { top, left }
}
