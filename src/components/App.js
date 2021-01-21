import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Home from './Home'
import Adoptable from './Adoptable'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <main role='main' className='App-main'>
          <Link to='/'><h1>Petful</h1></Link>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/adopt' component={Adoptable} />
          </Switch>
        </main>
      </div>
    )
  }
}