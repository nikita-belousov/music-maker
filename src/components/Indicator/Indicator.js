import React, { Component } from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'
import style from './Indicator.module.css'


export class Indicator extends Component {
  renderCell = (noteName, i) => {
    const { indicator, asideWidth, cellSize } = this.props

    const top = i * 24
    const left = asideWidth + (indicator * cellSize.width)

    return (
      <div
        key={noteName}
        className={style.cell}
        style={{
          width: `${cellSize.width}px`,
          top: `${top}px`,
          left: `${left}px`
        }}
      />
    )
  }

  render() {
    const { rows, isPlaying, cellSize } = this.props

    if (!isPlaying || !cellSize) return null

    return (
      <div className={style.indicator}>
        {times(rows).map(this.renderCell)}
      </div>
    )
  }
}

Indicator.propTypes = {
  rows: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  indicator: PropTypes.number.isRequired,
  cellSize: PropTypes.object,
}
