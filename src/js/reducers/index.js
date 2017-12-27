import { combineReducers } from 'redux'
import blog from './blog'

const rootReducer = combineReducers({
  blog: blog
})

export default rootReducer
