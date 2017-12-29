import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Grid } from 'semantic-ui-react'

import ReadPost from 'components/ReadPost'
import Sidebar from 'components/Sidebar'

const Hello = () => <div>"Hello!"</div>

const Blog = () => (
  <Grid container centered stackable columns={2} padded>
    <Grid.Column width={4}>
      <Sidebar />
    </Grid.Column>
    <Grid.Column>
      <Switch>
        {/* Links declared in PostsList */}
        <Route exact path='/' component={Hello} />
        <Route path='/:title' component={ReadPost} />
      </Switch>
    </Grid.Column>
  </Grid>
)

export default Blog
