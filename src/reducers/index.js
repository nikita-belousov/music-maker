import { combineReducers } from 'redux'

import notesCanvas from './notesCanvas'
import arrowSelector from './arrowSelector'
import player from './player'


export default combineReducers({
  notesCanvas,
  arrowSelector,
  player
})
