import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { updateCurrentPostByTitle } from 'actions/Actions'
import { withRouter } from 'react-router-dom'
import { toPostTitleStr } from '../utils'

var marked = require('marked')

const createMarkup = (text) => (
  {__html: marked(text, {sanitize: true})})

const ShowPostContent = post => (
  post
    ? <span dangerouslySetInnerHTML={createMarkup(post.content)} />
    : <Header color='teal'> Retrieving... </Header>
  )

function ReadPost ({posts, match}) {
  let title = toPostTitleStr(match.params.title)

  let urlPost = posts.filter(post => post.title === title)[0]

  return (
    <div>
      <Header color='orange' as='h1'> {title} </Header>
      {ShowPostContent(urlPost)}
    </div>)
}

const mapStateToProps = state => ({
  posts: state.blog.posts
})

export default connect(mapStateToProps, null)(ReadPost)
