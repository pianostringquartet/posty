import * as ActionTypes from 'constants/ActionTypes'

// Connecting to Firebase Database and Storage
// (See index.html for Firebase import.)
const storageURL = 'gs://posty-blog-app.appspot.com'
const databasePosts = firebase.database().ref('posts/')
const storagePosts = firebase.storage().refFromURL(storageURL)

export const addPost = ({id, title, content}) => (
  {
    type: ActionTypes.ADD_POST,
    id: id,
    title: title,
    content: content
  }
)

/*
"Synchronizing posts":
  Retrieving posts from Firebase Database and Storage.
*/
const getPostStorageURL = (postFilename, storageRef) =>
  storageRef.child(postFilename).getDownloadURL()

const retrievePostFile = postStorageURL =>
  fetch(postStorageURL).then(response => response.text())

// TODO:
// Break into smaller, more comprehensible and readable steps
export const retrieveAndAddPost = post =>
  dispatch =>
    getPostStorageURL(post.filename, storagePosts)
      .then(urlPromise => (retrievePostFile(urlPromise)
        .then(postMarkdownFile =>
          dispatch(addPost({id: post.id, title: post.title, content: postMarkdownFile}))
        )
      )
    )

export const syncPosts = () =>
  dispatch =>
    databasePosts.on('value',
      function (databaseSnapshot) {
        const posts = Object.values(databaseSnapshot.val())
        posts.map(post => (
          dispatch(retrieveAndAddPost(post))))
      }
    )
