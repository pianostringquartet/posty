import React from 'react'
import { Button, Grid, Icon, Header, Image, Segment } from 'semantic-ui-react'

import PostsList from 'components/PostsList'
import ReadPost from 'components/ReadPost'

import {
  HashRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'

// const personalSiteURL = 'https://sitey-app.firebaseapp.com/'

// const ToPersonalSiteButton = () => (
//   <Button color='green' onClick={() => window.open(personalSiteURL)}>
//     " who is chris? "
//   </Button>
// )

// export const SideBarHeader = () =>
//   <Segment>
//     <Header color='purple'>
//       <Icon name='hand paper' />
//         BLOG
//       </Header>
//     <Header color='purple'>
//       The Lived Experience of Programming
//       </Header>
//   </Segment>

// export const SideBar = () =>
//   <span>
//     <ToPersonalSiteButton />
//     <PostsList />
//   </span>

// const Hello = ({ match }) => (
//   <div>Hello there!</div>
//   )

export const NewBlogPanel = () => (
  <Grid container centered stackable columns={2} padded>

    <Grid.Column width={4}>
      <SideBarHeader />
      <SideBar />
    </Grid.Column>

    <Grid.Column>
      <Switch>
        <Route exact path='/' component={Hello} />
        <Route path='/:title' component={ReadPost} />
      </Switch>
    </Grid.Column>

  </Grid>
)

// export default NewBlogPanel
