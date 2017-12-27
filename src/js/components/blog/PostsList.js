import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentPost } from 'actions/Actions'

import { List } from 'semantic-ui-react'

const SemanticClickableList = ({items}) => (
  <List relaxed size='large'>
    {items.map(item => (
      <List.Item
        key={item.displayable}
        onClick={item.callable}>
        {item.displayable}
      </List.Item>
    ))}
  </List>
)

const PostsList = ({posts, actions}) => (
  <SemanticClickableList
    items={
      posts.map(post => (
        {
          displayable: post.title,
          callable: () => actions.updateCurrentPost(post.id)
        }))
    }
  />
)

const mapStateToProps = state => ({
  posts: state.blog.posts
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateCurrentPost}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)
