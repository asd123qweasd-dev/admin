import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '~/pages/Home/Home'
import { Users } from '~/pages/users'
import { Roles } from '~/pages/roles'

export const AuthorizedRouters:FunctionComponent = ()=> {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      
      <Route exact path="/users" component={ Users.GetAll } />
      <Route exact path="/users/create" component={ Users.Create } />
      <Route exact path="/users/:id" component={ Users.GetOne } />
      <Route exact path="/users/:id/update" component={ Users.Update } />

      <Route exact path="/roles" component={ Roles.GetAll } />
      <Route exact path="/roles/create" component={ Roles.Create } />
      <Route exact path="/roles/:id" component={ Roles.GetOne } />
      <Route exact path="/roles/:id/update" component={ Roles.Update } />
    </Switch>
  )
}
