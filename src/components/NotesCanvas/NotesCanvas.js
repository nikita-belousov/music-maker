import { fromEvent } from 'rxjs'

import {
  map,
  mapTo,
  switchMap,
  takeUntil,
  throttleTime,
  tap,
  merge
} from 'rxjs/operators'

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import reverse from 'lodash/reverse'
import { connect } from 'react-redux'

import style from './NotesCanvas.module.css'
import notes from 'app/notes'
import { getScrollbarWidth } from 'app/utils'
import { ArrowSelector, Notes, Grid, Indicator } from 'app/components'
import { POINTER, BRUSH, ERASER } from 'app/constants'
import { selectNote, deselectNote } from 'app/actions'

import {
  getCanvasSelectedNotes,
  getCanvasTool,
  getCanvasMeasure,
  getPlayerIsPlaying,
  getPlayerIndicator
} from 'app/selectors'


let NotesCanvas = class extends Component {
  constructor(props) {
    super(props)

    this.noteNames = reverse(Object.keys(notes))
    this.cellHeight = 24
    this.asideWidth = 60
  }

  componentDidMount() {
    this.computeCellWidth()
  }

  componentDidUpdate(prev) {
    const { gridMeasure: { bars, beats, splits }, tool } = this.props
    const { gridMeasure: prevMeasure } = prev

    if (
      bars !== prevMeasure.bars ||
      beats !== prevMeasure.beats ||
      splits !== prevMeasure.splits
    ) {
      this.computeCellWidth()
      this.forceUpdate()
    }

    if (prev.tool !== tool) {
      this.updateTools(prev.tool)
    }
  }

  computeCellWidth() {
    const { gridMeasure: { bars, beats, splits } } = this.props

    const parentWidth = this.element.offsetWidth - getScrollbarWidth()

    this.cellWidth =
      (parentWidth - this.asideWidth) /
      (bars * beats * splits)

    this.cellSize = {
      width: this.cellWidth,
      height: this.cellHeight
    }
  }

  updateTools(prevTool) {
    const { tool, selectNote, deselectNote } = this.props

    if (tool === prevTool) return

    const isBrush = tool === BRUSH
    const prevIsBrush = prevTool === BRUSH
    const isEraser = tool === ERASER
    const prevIsEraser = prevTool === ERASER

    const onMouseMove = ({ x, y }) => {
      const { selectedNotes } = this.props
      let cellCode

      for (let elem of document.elementsFromPoint(x, y)) {
        if (elem.hasAttribute('cellCode')) {
          cellCode = elem.getAttribute('cellCode')
          break
        }
      }

      if (!cellCode) return

      const isSelected = selectedNotes.has(cellCode)

      if (isBrush && (cellCode && !isSelected)) {
        selectNote(cellCode)
      } else if (isEraser && (cellCode && isSelected)) {
        deselectNote(cellCode)
      }
    }

    if ((isBrush !== prevIsBrush) || (isEraser !== prevIsEraser)) {
      if (this.sub) {
        this.sub.unsubscribe()
      }

      if (isBrush || isEraser) {
        const mousedown$ = fromEvent(this.element, 'mousedown')
        const mousemove$ = fromEvent(this.element, 'mousemove')
        const mouseup$ = fromEvent(this.element, 'mouseup')
        const mouseleave$ = fromEvent(this.element, 'mouseleave')

        this.sub = mousedown$.pipe(
          switchMap(() => mousemove$.pipe(
            throttleTime(20),
            takeUntil(mouseup$.pipe(merge(mouseleave$))),
            map(ev => ({ x: ev.clientX, y: ev.clientY }))
          ))
        ).subscribe(onMouseMove)
      }
    }
  }

  onCellMount = (code, cellElem) => {
    cellElem.setAttribute('cellCode', code)
  }

  onCellSelect = code => {
    const { tool, selectNote, deselectNote } = this.props
    tool === ERASER ? deselectNote(code) : selectNote(code)
  }

  onNoteClick = code => {
    const { tool, selectNote, deselectNote } = this.props
    if (tool === POINTER || tool === ERASER) deselectNote(code)
  }

  render() {
    const {
      gridMeasure,
      selectedNotes,
      tool,
      isPlaying,
      indicator,
      selectNote,
      deselectNote,
    } = this.props

    const cls = classNames({
      [style.notePicker]: true,
      [style.isBrush]: tool === BRUSH,
      [style.isEraser]: tool === ERASER
    })

    return (
      <div
        ref={node => this.element = node}
        className={cls}
      >
        <ArrowSelector
          cellSize={this.cellSize}
          asideWidth={this.asideWidth}
        />
        <Indicator
          rows={this.noteNames.length}
          isPlaying={isPlaying}
          indicator={indicator}
          cellSize={this.cellSize}
          asideWidth={this.asideWidth}
        />
        <Notes
          selectedNotes={selectedNotes}
          tool={tool}
          onNoteClick={this.onNoteClick}
          cellSize={this.cellSize}
          asideWidth={this.asideWidth}
        />
        <Grid
          noteNames={this.noteNames}
          measure={gridMeasure}
          selectNote={selectNote}
          onCellMount={this.onCellMount}
          onCellSelect={this.onCellSelect}
        />
      </div>
    )
  }
}

NotesCanvas.propTypes = {
  selectedNotes: ImmutablePropTypes.map.isRequired,
  gridMeasure: PropTypes.object.isRequired,
  tool: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  indicator: PropTypes.number.isRequired,
  selectNote: PropTypes.func.isRequired,
  deselectNote: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  selectedNotes: getCanvasSelectedNotes(state),
  gridMeasure: getCanvasMeasure(state),
  tool: getCanvasTool(state),
  isPlaying: getPlayerIsPlaying(state),
  indicator: getPlayerIndicator(state),
})

const mapDispatchToProps = {
  selectNote,
  deselectNote
}

NotesCanvas = connect(mapStateToProps, mapDispatchToProps)(NotesCanvas)


export { NotesCanvas }
