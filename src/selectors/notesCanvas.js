import { createSelector } from 'reselect'


export const getCanvas = state => state.notesCanvas

export const getCanvasMeasure = createSelector(
  getCanvas,
  canvas => ({
    bars: canvas.get('bars'),
    beats: canvas.get('beats'),
    splits: canvas.get('splits')
  })
)

export const getCanvasSelectedNotes = createSelector(
  getCanvas,
  canvas => canvas.get('selectedNotes')
)

export const getCanvasTool = createSelector(
  getCanvas,
  canvas => canvas.get('tool')
)
