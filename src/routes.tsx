import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '~/pages/Home/Home'
import { Users } from '~/pages/users/users'

export const AuthorizedRouters:FunctionComponent = ()=> {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/users" component={ Users } />
    </Switch>
  )
}
