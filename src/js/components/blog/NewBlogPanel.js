import React from 'react'
import { Button, Grid, Icon, Header, Image, Segment } from 'semantic-ui-react'

import PostsList from 'components/blog/PostsList'
import CurrentPost from 'components/blog/CurrentPost'

const ToPersonalSiteButton = () => (
  <Button color='green' onClick={() => window.open('https://google.com')}>
    " who is chris? "
  </Button>
)

const SideBarHeader = () =>
  <Segment>
    <Header color='purple'>
      <Icon name='hand paper' />
        BLOG
      </Header>
    <Header color='purple'>
      The Lived Experience of Programming
      </Header>
  </Segment>

const SideBar = () =>
  <span>
    <ToPersonalSiteButton />
    <PostsList />
  </span>

const NewBlogPanel = ({actions}) => (
  <Grid container centered stackable columns={2} padded>

    <Grid.Column width={4}>
      <SideBarHeader />
      <SideBar />
    </Grid.Column>

    <Grid.Column>
      <CurrentPost />
    </Grid.Column>

  </Grid>
)

export default NewBlogPanel
