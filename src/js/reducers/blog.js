import { ADD_POST,
         TOGGLE_READING,
         UPDATE_CURRENT_POST,
         UPDATE_CURRENT_POST_BY_TITLE,
         REFRESH_CURRENT_POST } from 'constants/ActionTypes'

var _ = require('lodash/core')

const initialBlogState = {
  isReading: false,
  currentPost: {
    id: 0,
    title: 'life',
    content: 'Programming is an experience.'
  },
  posts: [
    {
      id: 0,
      title: 'life',
      content: 'Programming is an experience.'
    }
  ]
}

// Object list -> Int
const newMaxId = (posts) => (
  1 + _.reduce(posts,
              (maxId, post) => Math.max(post.id, maxId),
              -1)
)

export default function posts (state = initialBlogState, action) {
  switch (action.type) {
    case TOGGLE_READING:
      return Object.assign({}, state, {
        isReading: !state.isReading
      })

    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          {
            id: newMaxId(state.posts),
            title: action.title,
            content: action.content
          }
        ]
      })

    case UPDATE_CURRENT_POST_BY_TITLE:
      const newCurrentPostByTitle = state.posts.filter(post =>
        post.title === action.title)[0]
      console.log('newCurrentPostByTitle is: ' + newCurrentPostByTitle)
      return Object.assign({}, state, {
        currentPost: newCurrentPost
      })

    case UPDATE_CURRENT_POST:
      const newCurrentPost = state.posts.filter(post =>
        post.id === action.id)[0]
      return Object.assign({}, state, {
        currentPost: newCurrentPost
      })

    case REFRESH_CURRENT_POST:
      const refreshedCurrentPost = state.posts.filter(post =>
        post.id === state.currentPost.id)[0]
      return Object.assign({}, state, {
        currentPost: refreshedCurrentPost
      })

    default:
      return state
  }
}
