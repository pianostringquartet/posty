import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { updateCurrentPostByTitle } from 'actions/Actions'
import { withRouter } from 'react-router-dom'

var marked = require('marked')

const createMarkup = (text) => (
  {__html: marked(text, {sanitize: true})})

// {actions.updateCurrentPostByTitle(match.params.title)}
//     {console.log('just dispatched updateCurrentPostByTitle(match.params.title)')}
function ReadPost ({posts, title}) {
  console.log('title is: ' + title)
  const urlTitle = title
  console.log('urlTitle is: ' + urlTitle)

  const urlPost = posts.filter(post => post.title === urlTitle)[0]
  console.log('urlPost is: ' + urlPost)

  return (
    <div>
      <Header color='orange' as='h1'> {urlTitle} </Header>
      <span dangerouslySetInnerHTML={
        createMarkup(urlPost.content)} />
    </div>)
}

// export default ReadPost

const mapStateToProps = state => ({
  posts: state.blog.posts
})

// // const mapDispatchToProps = dispatch => ({
// //   actions: bindActionCreators({updateCurrentPostByTitle}, dispatch)
// // })
// export default connect(
//   mapStateToProps,
//   null
// )(ReadPost)

export default withRouter(connect(mapStateToProps, null)(ReadPost))
