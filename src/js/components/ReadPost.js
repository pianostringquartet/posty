import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import marked from 'marked'
import { toPostTitleStr } from '../utils'

const DEFAULT_POST_TITLE = 'life is good'

const createMarkup = (text) => (
  {__html: marked(text, {sanitize: true})})

/* TODO:
    Add logic (e.g. timeout?) for when post doesn't exist,
    (as opposed to when post just hasn't been loaded from Firebase yet).
*/
const DisplayPostContent = post => (
  post
    ? <span dangerouslySetInnerHTML={createMarkup(post.content)} />
    // i.e. post either not yet loaded from Firebase or doesn't exist.
    : <Header color='teal'> Looking for post... </Header>
  )

function ReadPost ({posts, match, defaultPost}) {
  let title =
    defaultPost
    ? DEFAULT_POST_TITLE
    : toPostTitleStr(match.params.title)

  let post = posts.filter(post => post.title === title)[0]

  return (
    <div>
      <Header color='orange' as='h1'> {title} </Header>
      {DisplayPostContent(post)}
    </div>)
}

const mapStateToProps = state => ({
  posts: state.blog.posts
})

export default connect(mapStateToProps, null)(ReadPost)
