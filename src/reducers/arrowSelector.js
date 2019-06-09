import { Map, List } from 'immutable'

import {
  ARROW_SELECTOR_SHOW,
  ARROW_SELECTOR_HIDE,
  SET_ARROW_SELECTOR_POSITION,
} from '../actions'


const initialState = Map({
  isActive: false,
  position: Map({
    code: null,
    coords: null
  }),
})

export default (state = initialState, action) => {
  switch (action.type) {
    case ARROW_SELECTOR_SHOW:
      return state.set('isActive', true)
    case ARROW_SELECTOR_HIDE:
      return state.set('isActive', false)
    case SET_ARROW_SELECTOR_POSITION: {
      const { code, coords: { top, left } } = action.payload

      return state.set('position', Map({
        code,
        coords: Map({ top, left })
      }))
    }
    default:
      return state
  }
}
