import { Map, List } from 'immutable'
import { POINTER } from '../constants'

import {
  SET_GRID_BARS,
  SET_GRID_BEATS,
  SET_GRID_SPLITS,
  SET_GRID_CELL_WIDTH,
  SET_GRID_CELL_HEIGHT,
  ADD_NOTE_TO_GRID,
  REMOVE_NOTE_FROM_GRID,
  SET_TOOL,
  CLEAR_NOTES
} from '../actions'


const initialState = Map({
  bars: 4,
  beats: 4,
  splits: 2,
  selectedNotes: Map(),
  tool: POINTER,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_GRID_BARS:
      return state.set('bars', payload.value)
    case SET_GRID_BEATS:
      return state.set('beats', payload.value)
    case SET_GRID_SPLITS:
      return state.set('splits', payload.value)
    case ADD_NOTE_TO_GRID: {
      const { code, coords } = payload
      return state.update('selectedNotes', notes => notes.set(code, coords))
    }
    case REMOVE_NOTE_FROM_GRID: {
      const { code } = payload
      return state.update('selectedNotes', notes => notes.remove(code))
    }
    case SET_TOOL:
      return state.set('tool', payload.tool)
    case CLEAR_NOTES:
      return state.update('selectedNotes', notes => notes.clear())
    default:
      return state
  }
}
