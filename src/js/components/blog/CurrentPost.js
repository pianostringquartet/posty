import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { updateCurrentPostByTitle } from 'actions/Actions'

var marked = require('marked')

const createMarkup = (text) => (
  {__html: marked(text, {sanitize: true})})

// {actions.updateCurrentPostByTitle(match.params.title)}
//     {console.log('just dispatched updateCurrentPostByTitle(match.params.title)')}
const CurrentPost = ({title, content}) =>
  <div>
    <Header color='orange' as='h1'> {title} </Header>
    <span dangerouslySetInnerHTML={createMarkup(content)} />
  </div>

// export default CurrentPost

const mapStateToProps = state => ({
  title: state.blog.currentPost.title,
  content: state.blog.currentPost.content
})

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({updateCurrentPostByTitle}, dispatch)
// })
export default connect(
  mapStateToProps,
  null
)(CurrentPost)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CurrentPost)

// the idea is:
// CurrentPost receives post title from url,
// and uses that title to update current post in Store
// ... but you apparently can't do the dispatch?

// you could try having the CurrentPost component ACCEPT 'title' from the route,
// AND ALL POSTS from database

// I want to call a function (i.e. dispatch an action) when someone hits a route,
// rather than display a UI.

// how does the Redux tutorial handle it?
// ... we appear to be taking in params from the URL,
// and then we feed those params directly to the component we're rendering...

// okay, I think the Dan Abramov SO post was talking about this exact situation,
// where the 'selected book' is sourced from React Router instead of Redux Store

//
