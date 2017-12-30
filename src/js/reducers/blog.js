// import { reduce } from 'lodash'
import { last } from 'lodash'
import { ADD_POST } from 'constants/ActionTypes'

const initialBlogState = {
  posts: [
    {
      id: 0,
      title: 'The Lived Experience of Programming',
      content: 'Programming is an experience.'
    }
  ]
}

export default function blog (state = initialBlogState, action) {
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          {
            id: last(state.posts).id + 1,
            title: action.title,
            content: action.content
          }
        ]
      })

    default:
      return state
  }
}
