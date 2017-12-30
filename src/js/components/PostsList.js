import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import { toURLSafeStr } from '../utils'

const PostsList = ({ posts }) => (
  <List relaxed size='large'>
    {posts.map(post =>
      <List.Item key={post.id}>
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
