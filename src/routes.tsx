import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '~/pages/Home/Home'
import { Users } from '~/pages/users/users'

export const AuthorizedRouters:FunctionComponent = ()=> {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/users" component={ Users.GetAll } />
      <Route exact path="/users/create" component={ Users.Create } />
      <Route exact path="/users/:id" component={ Users.GetOne } />
      <Route exact path="/users/:id/update" component={ Users.Update } />
    </Switch>
  )
}
