import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './TopBar.module.css'
import { Container, ArrowMenu } from '..'
import { clearNotes } from '../../actions'


let TopBar = class extends Component {
  render() {
    const { clearNotes } = this.props

    return (
      <div className={style.topBar}>
        <Container>
          <div className={style.inner}>
            <div className={style.logoWrapper}>
              <div className={style.logo}>
                {'Music Maker'}
              </div>
            </div>
            <div className={style.left}>
              <div className={style.clear}>
                <button
                  title={'Clear notes'}
                  className={style.clearButton}
                  onClick={clearNotes}
                >
                  <FontAwesomeIcon icon="ban" />
                </button>
              </div>
              <ArrowMenu />
            </div>
            <div className={style.right}></div>
          </div>
        </Container>
      </div>
    )
  }
}

const mapDispatchToprops = { clearNotes }

TopBar = connect(() => ({}), mapDispatchToprops)(TopBar)


export { TopBar }
