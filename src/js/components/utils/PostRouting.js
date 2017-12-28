import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PostsList from 'components/blog/PostsList'
import CurrentPost from 'components/blog/CurrentPost'

// what you'll want to do is have one url per post,
// so something like:

// cool, this works;
// now you'll want PostsList to dispatch not just an 'update current post'
//  event, but also an 'update url event'

// problem?:
// you're still not linking a post to a given url
// , or at least, not in both ways:
// bc if someone enters "/#/post-name",
// your client won't know how to handle that

// PostsList:

// post.map(post =>
//   <Link to={'/' + post.title}> {post.title} </Link>
//   <Route
//     path={'/' + post.title}
//     component={<CurrentPost content={post.content}/>}
//   />
// )
// since PostsList would technically be nested within a <Router> comp,
// this ought to be okay?

// where to keep track of 'current post' -- in Router or Store?
// it'll probably be Router now, no?

// presumably I can declare the router elsewhere?
// e.g. in app.js?
const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
        <li><Link to='/post'>Post</Link></li>
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />

      <Route path='/post' component={CurrentPost} />
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
