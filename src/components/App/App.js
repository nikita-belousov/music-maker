import React, { Component } from 'react'
import { TopBar, MenuBar, NotesCanvas } from 'app/components'
import style from './App.module.css'


export class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <TopBar />
        <MenuBar />
        <NotesCanvas />
      </div>
    )
  }
}
