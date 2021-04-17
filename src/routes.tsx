import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '~/pages/home/home'
import { Users } from '~/pages/users'
import { Roles } from '~/pages/roles'
import { Permissions } from '~/pages/permissions'
import { Category } from '~/pages/category'
import { Posts } from '~/pages/posts'

export const AuthorizedRouters:FunctionComponent = ()=> {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      
      <Route exact path="/users" component={ Users.GetAll } />
      <Route exact path="/users/create" component={ Users.Create } />
      <Route exact path="/users/:id" component={ Users.GetOne } />

      <Route exact path="/roles" component={ Roles.GetAll } />
      <Route exact path="/roles/create" component={ Roles.Create } />
      <Route exact path="/roles/:id" component={ Roles.GetOne } />
      <Route exact path="/roles/:id/update" component={ Roles.Update } />

      <Route exact path="/permissions" component={ Permissions.GetAll } />
      <Route exact path="/permissions/create" component={ Permissions.Create } />
      <Route exact path="/permissions/:id" component={ Permissions.GetOne } />
      <Route exact path="/permissions/:id/update" component={ Permissions.Update } />

      <Route exact path="/categories" component={ Category.GetAll } />
      <Route exact path="/categories/create" component={ Category.Create } />
      <Route exact path="/categories/:id" component={ Category.GetOne } />
      <Route exact path="/categories/:id/update" component={ Category.Update } />

      <Route exact path="/posts" component={ Posts.GetAll } />
      <Route exact path="/posts/create" component={ Posts.Create } />
      <Route exact path="/posts/:id" component={ Posts.GetOne } />
    </Switch>
  )
}
