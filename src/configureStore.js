import { createStore, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'app/reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'


export default function configureStore() {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

  const sagaMiddleware = createSagaMiddleware()

  // TODO: разобраться со всем этим
  const store =  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    )
  )

  sagaMiddleware.run(sagas)

  return store
}
