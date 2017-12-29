import 'whatwg-fetch'
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'reducers'
import { HashRouter } from 'react-router-dom'

import { retrievePosts } from 'actions/Actions'

import Blog from 'components/Blog'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
)

// Initialize app
store.dispatch(retrievePosts())

render(
  <Provider store={store}>
    <HashRouter>
      <Blog />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
