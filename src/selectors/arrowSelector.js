import { createSelector } from 'reselect'


export const getSelector = state => state.arrowSelector

export const getSelectorIsActive = createSelector(
  getSelector,
  selector => selector.get('isActive')
)

export const getSelectorPosition = createSelector(
  getSelector,
  selector => selector.get('position')
)
