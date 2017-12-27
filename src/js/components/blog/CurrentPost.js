import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

var marked = require('marked')

const createMarkup = (text) => (
  {__html: marked(text, {sanitize: true})})

const CurrentPost = ({actions, title, content}) =>
  <div>
    <Header color='orange' as='h1'> {title} </Header>
    <span dangerouslySetInnerHTML={createMarkup(content)} />
  </div>

const mapStateToProps = state => ({
  title: state.blog.currentPost.title,
  content: state.blog.currentPost.content
})

export default connect(
  mapStateToProps,
  null
)(CurrentPost)
