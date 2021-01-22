import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Home from './Home'
import Adoptable from './Adoptable'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <Link to='/'
          style={{ textDecoration: "none", color: "inherit" }}>
            <h1>Petful</h1>
            </Link>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/adoptable' component={Adoptable} />
          </Switch>
        </main>
      </div>
    )
  }
}