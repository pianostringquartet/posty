import 'whatwg-fetch'

import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { syncPosts } from './actions/PostActions'

import PostsList from 'components/PostsList'

import ProfileAvatar from './components/ProfileAvatar'
import DrawerContainer from 'containers/DrawerContainer'

import DrawerList from 'components/DrawerList'


import BlogPanel from 'panels/BlogPanel'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
)

console.log("About to dispatch syncPosts")
store.dispatch(syncPosts())

// Main parent component
const PostyApp = () => (
  <div>
    {<DrawerContainer />}
    {/*<BlogPanel />*/}
  </div>
)

render(
  <Provider store={store}>
    <PostyApp />
  </Provider>,
  document.getElementById('app')
)
