import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ArrowMenu.module.css'

import {
  arrowSelectorShow,
  arrowSelectorHide,
  arrowSelectorLeft,
  arrowSelectorRight,
  arrowSelectorUp,
  arrowSelectorDown,
  arrowSelectorPick
} from '../../actions'

import {
  getCanvasSelectedNotes,
  getCanvasMeasure,
  getSelectorIsActive,
  getSelectorPosition
} from '../../selectors'


let ArrowMenu = class extends Component {
  render() {
    const {
      isActive,
      arrowSelectorShow,
      arrowSelectorHide,
      arrowSelectorLeft,
      arrowSelectorRight,
      arrowSelectorUp,
      arrowSelectorDown,
      arrowSelectorPick
    } = this.props

    const cls = classNames({
      [style.selector]: true,
      [style.selectorActive]: isActive,
    })

    return (
      <div className={cls}>
        <div className={style.background}>
          <button
            className={style.toggler}
            onClick={isActive ? arrowSelectorHide : arrowSelectorShow}
            // to disable toggle on 'enter' behavior
            onFocus={e => e.target.blur()}
          >
            <FontAwesomeIcon icon={isActive ? 'times' : 'arrows-alt'} />
          </button>
          <div className={style.arrows}>
            <button
              onClick={arrowSelectorLeft}
              className={style.control}
            >
              <FontAwesomeIcon icon="arrow-left" />
            </button>
            <button
              onClick={arrowSelectorRight}
              className={style.control}
            >
              <FontAwesomeIcon icon="arrow-right" />
            </button>
            <button
              onClick={arrowSelectorUp}
              className={style.control}
            >
              <FontAwesomeIcon icon="arrow-up" />
            </button>
            <button
              onClick={arrowSelectorDown}
              className={style.control}
            >
              <FontAwesomeIcon icon="arrow-down" />
            </button>
            <button
              onClick={arrowSelectorPick}
              className={style.control}
            >
              <FontAwesomeIcon icon="check" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

ArrowMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  arrowSelectorShow: PropTypes.func.isRequired,
  arrowSelectorHide: PropTypes.func.isRequired,
  arrowSelectorLeft: PropTypes.func.isRequired,
  arrowSelectorRight: PropTypes.func.isRequired,
  arrowSelectorUp: PropTypes.func.isRequired,
  arrowSelectorDown: PropTypes.func.isRequired,
  arrowSelectorPick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isActive: getSelectorIsActive(state),
})

const mapDispatchToprops = {
  arrowSelectorShow,
  arrowSelectorHide,
  arrowSelectorLeft,
  arrowSelectorRight,
  arrowSelectorUp,
  arrowSelectorDown,
  arrowSelectorPick
}

ArrowMenu = connect(mapStateToProps, mapDispatchToprops)(ArrowMenu)


export { ArrowMenu }
