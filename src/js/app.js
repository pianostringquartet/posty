import 'whatwg-fetch'
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'reducers'
import { syncPosts } from 'actions/Actions'

import NewBlogPanel from 'components/blog/NewBlogPanel'
import ReadPost from 'components/blog/ReadPost'
import PostsList from 'components/blog/PostsList'

import BasicExample from 'utils/PostRouting'
import {
  HashRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
)

// Initialize app
store.dispatch(syncPosts())

// const PostyApp = () => (
//   <NewBlogPanel />
// )

// <NewBlogPanel />

// okay, this works.
// clicking on the link changes stuff;
// BUT ... ugh, if you manually enter "/life" you still get a "Cannot GET ..." error,
//  AND '/#/life' just brings you to Hello, not Life

const Hello = ({ match }) => (
  <div>Hello mate!</div>
  )

// return (<div>Life is good.</div>)

// Nice! This works
// but to handle accidental requests of posts that don't exist,
// you'll want to show a "Couldn't find that post, young chap / gyal."

// how to handle long titles?
// they seem to be showing up automatically?!
// like this:
// http://localhost:8080/#/How to do an abstraction layer

// also, you run into trouble if you request a post that
// hasn't been retrieved from the server yet
// ... so it'd be good to show "loading"

// can you do something like "dispatch sync",
// so the app won't load at all until we've retrieved all the posts?

// (why would that deal with the problem? bc we wouldn't process the route until
//  we finished retrieving the )

// some workarounds:
//    use a one-word post title 'identifier' for a given post,
//      e.g. so you have both
// or, just use post's id? (for now it doesn't matter the exact)

// another workaround: keeping using React Router etc.,
//  but just host 'How to do an abstraction layer' locally?
//

function Life ({ match }) {
  console.log('Life: match.params.title: ' + match.params.title)
  return (<ReadPost title={match.params.title} />)
}

function Main () {
  console.log('Main called')
  return (<Switch>
    <Route exact path='/' component={Hello} />
    <Route path='/:title' component={Life} />
  </Switch>)
}

// just don't make the app crash when they request a post
// that not been loaded yet!

function PostyApp ({match}) {
  console.log('waiting until async request is done')
  return (
    <span>
      <PostsList />
      <Main />
    </span>
  )
}

// <Route path={'/:title'} component={ReadPost} />
{ /* <Route path='/' component={PostyApp} /> */ }
render(
  <Provider store={store}>
    <HashRouter>
      <PostyApp />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
