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

// OKAY, suppose you can dynamically generate one route per post title,
// where

// Right now, CurrentPost is injected with 'current post title, content'
// from the STORE

// So your ReadPost comp will instead take 'current post title, content' from
// ah... but I'll only be injecting title via Route,
// so I'll need to already have injected 'posts' from

// const routes = store.

// function select(state) {
//   return state.some.deep.property
// }

// let currentValue
// function handleChange() {
//   let previousValue = currentValue
//   currentValue = select(store.getState())

//   if (previousValue !== currentValue) {
//     console.log(
//       'Some deep nested property changed from',
//       previousValue,
//       'to',
//       currentValue
//     )
//   }
// }

// let unsubscribe = store.subscribe(handleChange)
// unsubscribe()

// const routes = [
//   { path: '/',
//     exact: true,
//     sidebar: () => <div>home!</div>,
//     main: () => <h2>Home</h2>
//   },
//   { path: '/bubblegum',
//     sidebar: () => <div>bubblegum!</div>,
//     main: () => <h2>Bubblegum</h2>
//   },
//   { path: '/shoelaces',
//     sidebar: () => <div>shoelaces!</div>,
//     main: () => <h2>Shoelaces</h2>
//   }
// ]

// const routes = [
//   { path: '/',
//     exact: true,
//     main: () => <PostyApp />
//   },
//   { path: '/:title',
//     main: () => <ReadPost />
//   }
// ]

// const routes = store.getState().blog.posts.map(post => (
//   {
//     path: '/' + post.title,
//     main: () => <ReadPost/> // will be passed 'match' as long as we do component={route.main}
//   }))

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

// also, how to
function Life ({ match }) {
  console.log('Life: match.params.title: ' + match.params.title)
  return (<ReadPost title={match.params.title} />)
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Hello} />
    <Route path='/:title' component={Life} />
  </Switch>

  )

function PostyApp ({match}) {
  console.log('match in PostyApp: ' + match)
  // console.log('match.params.title in PostyApp: ' + match.params.title)
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
