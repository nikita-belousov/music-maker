import { createSelector } from 'reselect'


export const getPlayer = state => state.player

export const getPlayerIsPlaying = createSelector(
  getPlayer,
  player => player.get('isPlaying')
)

export const getPlayerIndicator = createSelector(
  getPlayer,
  player => player.get('indicator')
)

export const getPlayerTempo = createSelector(
  getPlayer,
  player => player.get('tempo')
)

export const getPlayerNoteDuration = createSelector(
  getPlayer,
  player => player.get('noteDuration')
)

export const getPlayerWaveType = createSelector(
  getPlayer,
  player => player.get('waveType')
)
