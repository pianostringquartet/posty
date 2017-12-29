import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { toURLSafeStr } from '../utils'

// <Link to={'/' + post.title}>
const PostsList = ({ posts }) => (
  <List relaxed size='large'>
    {posts.map((post, index) =>
      <List.Item key={index}>
        <Link to={'/' + toURLSafeStr(post.title)}>
          {post.title}
        </Link>
      </List.Item>
    )}
  </List>
)

const mapStateToProps = state => ({
  posts: state.blog.posts
})

export default connect(
  mapStateToProps,
  null
)(PostsList)
