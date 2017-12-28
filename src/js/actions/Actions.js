import * as ActionTypes from 'constants/ActionTypes'

// Connecting to Firebase Database and Storage
// (See index.html for Firebase import.)
var database = firebase.database()
var storage = firebase.storage()
var storageRef = storage.refFromURL('gs://posty-blog-app.appspot.com')

export const addPost = ({id, title, content}) => (
  {
    type: ActionTypes.ADD_POST,
    id: id,
    title: title,
    content: content
  }
)

export const updateCurrentPost = (id) => (
  {
    type: ActionTypes.UPDATE_CURRENT_POST,
    id: id
  }
)

export const updateCurrentPostByTitle = (title) => (
  {
    type: ActionTypes.UPDATE_CURRENT_POST_BY_TITLE,
    title: title
  }
)

// export const updateAndViewCurrentPost = (id) =>
//   function (dispatch) {
//     dispatch(updateCurrentPost(id))
//     // dispatch(toggleReading())
//   }

/*
"Synchronizing posts":
  Retrieving posts from Firebase Database and Storage.
*/
export const refreshCurrentPost = () => (
  {
    type: ActionTypes.REFRESH_CURRENT_POST
  }
)

function getPostURLPromise (postFilename, storageRef) {
  return storageRef.child(postFilename).getDownloadURL()
}

function retrievePostFile (urlPromise) {
  return fetch(urlPromise)
      .then(response => response.text())
}

// TODO:
// Break into smaller, more comprehensible and readable steps
export const retrieveAndSetPost = (post) =>
  dispatch => (
    getPostURLPromise(post.filename, storageRef)
      .then(urlPromise => (retrievePostFile(urlPromise)
        .then(function (postMarkdownFile) {
          dispatch(addPost({id: post.id, title: post.title, content: postMarkdownFile}))
          dispatch(refreshCurrentPost())
        }
        )
      )
    )
  )

export const syncPosts = () =>
  dispatch => (
    database.ref('posts/').on(
      'value',
      function (snapshot) {
        const posts = Object.values(snapshot.val())
        posts.map(post => (
          dispatch(retrieveAndSetPost(post))))
      }
    )
  )
