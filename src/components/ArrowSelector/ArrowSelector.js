import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import style from './ArrowSelector.module.css'

import {
  getSelectorIsActive,
  getSelectorPosition
} from '../../selectors'


let ArrowSelector = class extends Component {
  render() {
    const {
      isActive,
      position,
      cellSize,
      asideWidth
    } = this.props

    if (!isActive || !cellSize) return null

    const left = position.getIn(['coords', 'left'])
    const offsetLeft = asideWidth + (left * cellSize.width)

    const top = position.getIn(['coords', 'top'])
    const offsetTop = top * cellSize.height

    return (
      <div
        className={style.selector}
        style={{
          top: offsetTop,
          left: offsetLeft,
          width: `${cellSize.width}px`,
          height: `${cellSize.height}px`
        }}
      />
    )
  }
}

ArrowSelector.propTypes = {
  isActive: PropTypes.bool.isRequired,
  position: ImmutablePropTypes.map,
  cellSize: PropTypes.object,
  asideWidth: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  isActive: getSelectorIsActive(state),
  position: getSelectorPosition(state),
})


ArrowSelector = connect(mapStateToProps)(ArrowSelector)


export { ArrowSelector }
