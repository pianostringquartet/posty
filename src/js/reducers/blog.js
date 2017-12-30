// import { reduce } from 'lodash'
import { last } from 'lodash'
import { ADD_POST } from 'constants/ActionTypes'

export const DEFAULT_POST_TITLE = 'The Lived Experience of Programming'

export const initialBlogState = {
  posts: [
    {
      id: 0,
      title: DEFAULT_POST_TITLE,
      content: 'Programming is an experience. This blog focuses on the lived experience of programming -- the thoughts a construct allows you to think.'
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
