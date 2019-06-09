import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

import style from './Notes.module.css'
import { POINTER, BRUSH } from 'app/constants'


export class Notes extends Component {
  renderNote = ([code, { top, left }]) => {
    const { cellSize, asideWidth, onNoteClick, tool } = this.props

    const offsetTop = cellSize.height * top
    const offsetLeft = cellSize.width * left + asideWidth

    const cls = classNames({
      [style.note]: true,
      [style.isBrush]: tool === BRUSH
    })

    return (
      <div
        key={code}
        className={cls}
        onClick={() => onNoteClick(code)}
        style={{
          width: `${cellSize.width}px`,
          top: `${offsetTop}px`,
          left: `${offsetLeft}px`
        }}
      />
    )
  }

  render() {
    const { cellSize, selectedNotes } = this.props

    const entries = Object.entries(selectedNotes.toObject())

    return (
      <div className={style.notes}>
        {cellSize ? entries.map(this.renderNote) : null}
      </div>
    )
  }
}

Notes.propTypes = {
  selectedNotes: ImmutablePropTypes.map.isRequired,
  tool: PropTypes.string.isRequired,
  cellSize: PropTypes.object,
  asideWidth: PropTypes.number.isRequired,
  onNoteClick: PropTypes.func.isRequired,
}
