export const INIT_APP = 'INIT_APP'
export const initApp = () => ({
  type: INIT_APP
})

export const PLAY_TRACK = 'PLAY_TRACK'
export const playTrack = () => ({
  type: PLAY_TRACK
})

export const STOP_TRACK = 'STOP_TRACK'
export const stopTrack = () => ({
  type: STOP_TRACK
})

export const RESUME_TRACK = 'RESUME_TRACK'
export const resumeTrack = () => ({
  type: RESUME_TRACK
})

export const MOVE_INDICATOR = 'MOVE_INDICATOR'
export const moveIndicator = () => ({
  type: MOVE_INDICATOR
})

export const RESET_INDICATOR = 'RESET_INDICATOR'
export const resetIndicator = () => ({
  type: RESET_INDICATOR
})

export const SET_GRID_BARS = 'SET_GRID_BARS'
export const setGridBars = value => ({
  type: SET_GRID_BARS,
  payload: { value }
})

export const SET_GRID_BEATS = 'SET_GRID_BEATS'
export const setGridBeats = value => ({
  type: SET_GRID_BEATS,
  payload: { value }
})

export const SET_GRID_SPLITS = 'SET_GRID_SPLITS'
export const setGridSplits = value => ({
  type: SET_GRID_SPLITS,
  payload: { value }
})

export const SELECT_NOTE = 'SELECT_NOTE'
export const selectNote = code => ({
  type: SELECT_NOTE,
  payload: { code }
})

export const DESELECT_NOTE = 'DESELECT_NOTE'
export const deselectNote = code => ({
  type: DESELECT_NOTE,
  payload: { code }
})

export const ADD_NOTE_TO_GRID = 'ADD_NOTE_TO_GRID'
export const addNoteToGrid = (code, coords) => ({
  type: ADD_NOTE_TO_GRID,
  payload: { code, coords }
})

export const REMOVE_NOTE_FROM_GRID = 'REMOVE_NOTE_FROM_GRID'
export const removeNoteFromGrid = (code, coords) => ({
  type: REMOVE_NOTE_FROM_GRID,
  payload: { code, coords }
})

export const SET_TOOL = 'SET_TOOL'
export const setTool = tool => ({
  type: SET_TOOL,
  payload: { tool }
})

export const CHANGE_TEMPO = 'CHANGE_TEMPO'
export const changeTempo = value => ({
  type: CHANGE_TEMPO,
  payload: { value }
})

export const CHANGE_WAVE_TYPE = 'CHANGE_WAVE_TYPE'
export const changeWaveType = () => ({
  type: CHANGE_WAVE_TYPE
})

export const SET_WAVE_TYPE = 'SET_WAVE_TYPE'
export const setWaveType = type => ({
  type: SET_WAVE_TYPE,
  payload: { type }
})

export const SET_NOTE_DURATION = 'SET_NOTE_DURATION'
export const setNoteDuration = value => ({
  type: SET_NOTE_DURATION,
  payload: { value }
})

export const ARROW_SELECTOR_SHOW = 'ARROW_SELECTOR_SHOW'
export const arrowSelectorShow = () => ({
  type: ARROW_SELECTOR_SHOW
})

export const ARROW_SELECTOR_HIDE = 'ARROW_SELECTOR_HIDE'
export const arrowSelectorHide = () => ({
  type: ARROW_SELECTOR_HIDE
})

export const SET_ARROW_SELECTOR = 'SET_ARROW_SELECTOR'
export const setArrowSelector = code => ({
  type: SET_ARROW_SELECTOR,
  payload: { code }
})

export const SET_ARROW_SELECTOR_POSITION = 'SET_ARROW_SELECTOR_POSITION'
export const setArrowSelectorPosition = (code, coords) => ({
  type: SET_ARROW_SELECTOR_POSITION,
  payload: { code, coords }
})

export const ARROW_SELECTOR_LEFT = 'ARROW_SELECTOR_LEFT'
export const arrowSelectorLeft = () => ({
  type: ARROW_SELECTOR_LEFT
})

export const ARROW_SELECTOR_RIGHT = 'ARROW_SELECTOR_RIGHT'
export const arrowSelectorRight = () => ({
  type: ARROW_SELECTOR_RIGHT
})

export const ARROW_SELECTOR_UP = 'ARROW_SELECTOR_UP'
export const arrowSelectorUp = () => ({
  type: ARROW_SELECTOR_UP
})

export const ARROW_SELECTOR_DOWN = 'ARROW_SELECTOR_DOWN'
export const arrowSelectorDown = () => ({
  type: ARROW_SELECTOR_DOWN
})

export const ARROW_SELECTOR_PICK = 'ARROW_SELECTOR_PICK'
export const arrowSelectorPick = () => ({
  type: ARROW_SELECTOR_PICK
})

export const CLEAR_NOTES = 'CLEAR_NOTES'
export const clearNotes = () => ({
  type: CLEAR_NOTES
})
