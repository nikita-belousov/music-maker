import { Map, List } from 'immutable'

import {
  PLAY_TRACK,
  STOP_TRACK,
  RESET_INDICATOR,
  MOVE_INDICATOR,
  CHANGE_TEMPO,
  SET_NOTE_DURATION,
  SET_WAVE_TYPE
} from '../actions'


const initialState = Map({
  isPlaying: false,
  indicator: 0,
  tempo: 120,
  noteDuration: null,
  waveType: 'sine'
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAY_TRACK:
      return state.set('isPlaying', true)
    case STOP_TRACK:
      return state.set('isPlaying', false)
    case RESET_INDICATOR:
      return state.set('indicator', 0)
    case MOVE_INDICATOR:
      return state.update('indicator', val => val + 1)
    case CHANGE_TEMPO:
      return state.set('tempo', parseInt(payload.value, 10))
    case SET_NOTE_DURATION:
      return state.set('noteDuration', payload.value)
    case SET_WAVE_TYPE:
      return state.set('waveType', payload.type)
    default:
      return state
  }
}
