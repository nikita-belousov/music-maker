import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import slice from 'lodash/slice'
import reverse from 'lodash/reverse'
import isEqual from 'lodash/isEqual'
import { Map, List } from 'immutable'
import classNames from 'classnames'
import times from 'lodash/times'

import { encodeNote } from '../../utils'
import style from './Grid.module.css'


class Cell extends Component {
  componentDidMount() {
    const { onMount, code } = this.props

    setTimeout(() => {
      onMount(code, this.element)
    })
  }

  render() {
    return (
      <div
        ref={node => this.element = node}
        className={style.cell}
        onClick={this.props.onSelect}
      />
    )
  }
}

Cell.propTypes = {
  onMount: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
}


export class Grid extends Component {
  shouldComponentUpdate({ measure: nextMeasure }) {
    return !isEqual(this.props.measure, nextMeasure)
  }

  render() {
    const {
      noteNames,
      measure,
      selectNote,
      onCellMount,
      onCellSelect
    } = this.props

    const { bars, beats, splits } = measure

    return (
      <div className={style.wrapper}>
        {noteNames.map(noteName => (
          <div key={noteName} className={style.row}>
            <div key={`${noteName}-name`} className={style.noteName}>
              {noteName}
            </div>
            <div key={`${noteName}-cells`} className={style.bars}>
              {times(bars).map(bar => (
                <div key={bar} className={style.bar}>
                  {times(beats).map(beat =>
                    <div key={beat} className={style.beat}>
                      {times(splits).map(split => {
                        const code = encodeNote(noteName, bar, beat, split)

                        return (
                          <Cell
                            key={split}
                            onMount={onCellMount}
                            onSelect={() => onCellSelect(code)}
                            code={code}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

Grid.propTypes = {
  noteNames: PropTypes.array.isRequired,
  measure: PropTypes.object.isRequired,
  selectNote: PropTypes.func.isRequired,
  onCellMount: PropTypes.func.isRequired,
  onCellSelect: PropTypes.func.isRequired
}
