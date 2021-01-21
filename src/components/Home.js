import React, { Component } from 'react'
import AppContext from '../context'
import PeopleService from '../services/people-service'
import { Link } from 'react-router-dom'

class Home extends Component {
  static contextType = AppContext

  handleJoinQueue = (event) => {
    event.preventDefault()
    this.context.clearError()
    this.context.clearPerson()
    let person = document.getElementById('name').value
    console.log('NAME', person)
    this.context.setPerson(person)
    return PeopleService.addPerson(person).then((results) => {
      const { location, history } = this.props
      const destination = (location.state || {}).from || '/adopt'
      history.push(destination)
    })
  }

  render() {
    return (
      <div>
        <div className='intro'>
          <h2>Welcome to Petful!</h2>
          <h3>The perfect pet is waiting for you!</h3>
          <img src='https://static.toiimg.com/photo/msid-74508525/74508525.jpg' />
        </div>
        <div className='process'>
          <h3>This is what you need to do...</h3>
          <section className='details'>
            <p>
              Because our pets are so popular, you'll need to queue up. Once it's your turn, you can pick the dog or cat that you want!
            </p>
          </section>
        </div>
        <section className='adopt-about'>
          <h3>Here we go!</h3>
          <Link to='/adopt'>
            <button>Adoptable Pets</button>{' '}
          </Link>
        </section>
        <form onSubmit={this.handleJoinQueue}>
          <h3>
            Enter your name to join the queue!
          </h3>
          <input aria-label='name' type='text' name='name' id='name' required />
          <button type='submit'>Join</button>
        </form>
      </div>
    )
  }
}

export default Home