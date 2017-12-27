import 'whatwg-fetch'
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'reducers'
import { syncPosts } from 'actions/Actions'

import NewBlogPanel from 'components/blog/NewBlogPanel'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
)

// Initialize app
store.dispatch(syncPosts())

const PostyApp = () => (
  <NewBlogPanel />
)

render(
  <Provider store={store}>
    <PostyApp />
  </Provider>,
  document.getElementById('app')
)
