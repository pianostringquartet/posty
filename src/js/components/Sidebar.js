import React from 'react'
import { Button, Icon, Header, Segment } from 'semantic-ui-react'
import PostsList from 'components/PostsList'

const personalSiteURL = 'https://sitey-app.firebaseapp.com/'

const ToPersonalSiteButton = () =>
  <Button color='green' onClick={() => window.open(personalSiteURL)}>
    " who is chris? "
  </Button>

const SidebarHeader = () =>
  <Segment>
    <Header color='purple'>
      <Icon name='hand paper' />
        BLOG
      </Header>
    <Header color='purple'>
      The Lived Experience of Programming
      </Header>
  </Segment>

const Sidebar = () =>
  <span>
    <SidebarHeader />
    <ToPersonalSiteButton />
    <PostsList />
  </span>

export default Sidebar
