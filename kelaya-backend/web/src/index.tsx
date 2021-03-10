import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header } from './components'
import { Home, Post, PostNew, SignIn, SignOut, SignUp } from './scenes'

ReactDOM.render(
  <BrowserRouter>
    <Header />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/new">
        <PostNew />
      </Route>
      <Route path="/posts/:id">
        <Post />
      </Route>

      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/sign-out">
        <SignOut />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
