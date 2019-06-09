import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './MenuBar.module.css'
import { Container } from '..'
import { POINTER, BRUSH, ERASER } from 'app/constants'

import {
  playTrack,
  stopTrack,
  setGridBars,
  setGridBeats,
  setGridSplits,
  setTool,
  changeTempo,
  changeWaveType,
} from 'app/actions'

import {
  getCanvasTool,
  getCanvasMeasure,
  getPlayerIsPlaying,
  getPlayerTempo,
  getPlayerWaveType
} from 'app/selectors'


let MenuBar = class extends Component {
  componentDidUpdate(prevProps, prevState) {
    for (let prop in prevProps) {
      if (prevProps[prop] !== this.props[prop]) {
        console.log(prevProps[prop], this.props[prop])
      }
    }
  }

  render() {
    const {
      isPlaying,
      gridMeasure,
      brushMode,
      tool,
      tempo,
      waveType,
      playTrack,
      stopTrack,
      setGridBars,
      setGridBeats,
      setGridSplits,
      setTool,
      changeTempo,
      changeWaveType,
    } = this.props

    const { bars, beats, splits } = gridMeasure

    const Setting = ({ label, children }) => (
      <div className={style.setting}>
        <div className={style.label}>
          {label}
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    )

    const ChangeValueSetting = ({
      value,
      label,
      onAdd,
      onRemove,
      min,
      max
    }) => (
      <Setting label={label}>
        <div className={style.value}>
          {value}
        </div>
        <div className={style.change}>
          <button
            className={classNames({
              [style.add]: true,
              [style.isDisabled]: value === max
            })}
            onClick={onAdd}
          >
            <FontAwesomeIcon icon="plus" />
          </button>
          <button
            className={classNames({
              [style.remove]: true,
              [style.isDisabled]: value === min
            })}
            onClick={onRemove}
          >
            <FontAwesomeIcon icon="minus" />
          </button>
        </div>
      </Setting>
    )

    const Tool = ({
      title,
      icon,
      isActive,
      onClick
    }) => {
      const cls = classNames({
        [style.tool]: true,
        [style.isActive]: isActive
      })

      return (
        <div className={cls}>
          <button
            className={style.toolButton}
            title={title}
            onClick={!isActive ? onClick : undefined}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        </div>
      )
    }

    const PlayButton = ({ isPlaying, onPlay, onStop }) => (
      <button
        className={style.playButton}
        onClick={isPlaying ? onStop : onPlay}
      >
        <FontAwesomeIcon icon={`${isPlaying ? 'stop' : 'play'}-circle`} />
      </button>
    )

    const WaveType = ({ type, onChange }) => {
      const icon = require(`../../assets/images/waves/${type}.svg`)

      return (
        <div className={style.waveType}>
          <div
            className={style.icon}
            style={{ backgroundImage: `url(${icon})` }}
            onClick={onChange}
          />
        </div>
      )
    }

    return (
      <div className={style.wrapper}>
        <div className={style.menuBar}>
          <Container>
            <div className={style.inner}>
              <div className={style.settings}>
                <div className={style.settingsGroup}>
                  <WaveType
                    type={waveType}
                    onChange={changeWaveType}
                  />
                  <Setting label="Tempo">
                    <div className={style.tempoWrapper}>
                      <input
                        onChange={e => changeTempo(e.target.value)}
                        name="tempo"
                        type="range"
                        value={tempo}
                        min={20}
                        max={220}
                        step={1}
                      />
                      <label
                        className={style.tempoValue}
                        htmlFor="tempo"
                      >
                        {tempo}
                      </label>
                    </div>
                  </Setting>
                </div>
                <div className={style.settingsGroup}>
                  <ChangeValueSetting
                    value={bars}
                    label="Overall bars"
                    onAdd={() => setGridBars(bars + 1)}
                    onRemove={() => setGridBars(bars - 1)}
                    min={1}
                    max={10}
                  />
                  <ChangeValueSetting
                    value={beats}
                    label="Beats per bar"
                    onAdd={() => setGridBeats(beats + 1)}
                    onRemove={() => setGridBeats(beats - 1)}
                    min={1}
                    max={8}
                  />
                  <ChangeValueSetting
                    value={splits}
                    label="Split beats"
                    onAdd={() => setGridSplits(splits + 1)}
                    onRemove={() => setGridSplits(splits - 1)}
                    min={1}
                    max={6}
                  />
                  <Setting label="Tools">
                    <Fragment>
                      <Tool
                        title="Pointer"
                        icon="mouse-pointer"
                        isActive={tool === POINTER}
                        onClick={() => setTool(POINTER)}
                      />
                      <Tool
                        title="Brush"
                        icon="paint-brush"
                        isActive={tool === BRUSH}
                        onClick={() => setTool(BRUSH)}
                      />
                      <Tool
                        title="Eraser"
                        icon="eraser"
                        isActive={tool === ERASER}
                        onClick={() => setTool(ERASER)}
                      />
                    </Fragment>
                  </Setting>
                </div>
              </div>
              <div className={style.playWrapper}>
                <PlayButton
                  isPlaying={isPlaying}
                  onPlay={playTrack}
                  onStop={stopTrack}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

MenuBar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  gridMeasure: PropTypes.object.isRequired,
  tempo: PropTypes.number.isRequired,
  waveType: PropTypes.string.isRequired,
  playTrack: PropTypes.func.isRequired,
  stopTrack: PropTypes.func.isRequired,
  setGridBars: PropTypes.func.isRequired,
  setGridBeats: PropTypes.func.isRequired,
  setGridSplits: PropTypes.func.isRequired,
  setTool: PropTypes.func.isRequired,
  changeTempo: PropTypes.func.isRequired,
  changeWaveType: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isPlaying: getPlayerIsPlaying(state),
  gridMeasure: getCanvasMeasure(state),
  tool: getCanvasTool(state),
  tempo: getPlayerTempo(state),
  waveType: getPlayerWaveType(state),
})

const mapDispatchToProps = {
  playTrack,
  stopTrack,
  setGridBars,
  setGridBeats,
  setGridSplits,
  setTool,
  changeTempo,
  changeWaveType,
}

MenuBar = connect(mapStateToProps, mapDispatchToProps)(MenuBar)


export { MenuBar }
