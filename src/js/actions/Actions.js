import * as ActionTypes from 'constants/ActionTypes'

/*
Firebase
(See public/index.html for Firebase imports.)
*/
const databasePosts = firebase.database().ref('posts/')
const storageURL = 'gs://posty-blog-app.appspot.com'
const storagePosts = firebase.storage().refFromURL(storageURL)

/*
"Retrieving posts":
  All posts are persisted on Firebase.
  We store a post's title, filename etc. in Firebase Database
  and its MarkDown files in Firebase Storage.

  TODO:
  - Abstract away Firebase-specific code,
  - Make more declarative,
  - Add .catch logic for error handling in Promises
*/
const addPost = (post, postFile) => (
  {
    type: ActionTypes.ADD_POST,
    id: post.id,
    title: post.title,
    content: postFile
  }
)

// get post's MarkDown file
const retrievePostFile = (postFilename, storageRef) =>
  storageRef.child(postFilename).getDownloadURL()
    .then(postURL => fetch(postURL)
      .then(response => response.text()))

const retrieveAndAddPost = post =>
  dispatch =>
    retrievePostFile(post.filename, storagePosts)
      .then(postFile => dispatch(addPost(post, postFile)))

export const retrievePosts = () =>
  dispatch =>
    databasePosts.on(
      'value', // establish Firebase Database listener
      databaseSnapshot =>
        Object.values(databaseSnapshot.val()) // posts
          .map(post => dispatch(retrieveAndAddPost(post))))
