import React from 'react'
import { Button, Responsive, Image, Icon, Header, Segment } from 'semantic-ui-react'
import PostsList from 'components/PostsList'
import bronzinoImage from 'assets/bronzino_young_man_with_lute.jpg'

const personalSiteURL = 'https://chrisclampitt.life/'

const HeaderImage = () =>
  <Responsive minWidth={768}>
    <Image centered size='medium' src={bronzinoImage} />
  </Responsive>

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
    <HeaderImage />
  </Segment>

const Sidebar = () =>
  <span>
    <SidebarHeader />
    <ToPersonalSiteButton />
    <PostsList />
  </span>

export default Sidebar
