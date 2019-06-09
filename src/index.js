import './styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from 'app/components'
import configureStore from 'app/configureStore'
import initIcons from 'app/icons'
import { initApp } from 'app/actions'


global.WebFont.load({
  google: {
    families: [
      'Roboto:n4,n7',
      'Baloo Thambi:n4'
    ]
  }
})

initIcons()

const store = configureStore()
store.dispatch(initApp())


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
