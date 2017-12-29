import * as ActionTypes from 'constants/ActionTypes'

// Connecting to Firebase Database and Storage
// (See public/index.html for Firebase import.)
const storageURL = 'gs://posty-blog-app.appspot.com'
const databasePosts = firebase.database().ref('posts/')
const storagePosts = firebase.storage().refFromURL(storageURL)

/*
"Retrieving posts":
  All posts are persisted on Firebase.
  We store a post's title etc. in Firebase Database
  and its MarkDown files in Firebase Storage.

  TODO:
  Break into smaller, more comprehensible and readable steps;
  Currently too much Firebase-specific code,
    and code flows in response to .then/.catch constraints,
    not the inherent logic of what we're doing.
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
    databasePosts.on( // establish Firebase Database listener
      'value',
      databaseSnapshot =>
        Object.values(databaseSnapshot.val()) // posts
          .map(post => dispatch(retrieveAndAddPost(post))))
