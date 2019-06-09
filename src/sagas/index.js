import { all } from 'redux-saga/effects'

import notesCanvas from './notesCanvas'
import arrowSelector from './arrowSelector'
import player from './player'


const sagas = function* () {
  yield all([
    ...notesCanvas,
    ...arrowSelector,
    ...player,
  ])
}


export default sagas
