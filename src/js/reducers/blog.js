import { reduce } from 'lodash'
import { ADD_POST } from 'constants/ActionTypes'

const initialBlogState = {
  posts: [
    {
      id: 0,
      title: 'life is good',
      content: 'Programming is an experience.'
    }
  ]
}

// Object list -> Int
const newMaxId = posts => (
  1 + reduce(posts,
              (maxId, post) => Math.max(post.id, maxId),
              -1)
)

export default function posts (state = initialBlogState, action) {
  switch (action.type) {
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

    default:
      return state
  }
}
