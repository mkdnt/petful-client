import React, { Component } from 'react'
import PetfulContext from '../context'
import PeopleService from '../services/people-service'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  static contextType = PetfulContext

  handleJoinQueue = (event) => {
    event.preventDefault()
    this.context.clearError()
    this.context.clearPerson()
    let person = document.getElementById('name').value
    this.context.setPerson(person)
    return PeopleService.addPerson(person).then((results) => {
      const { location, history } = this.props
      const destination = (location.state || {}).from || '/adoptable'
      history.push(destination)
    })
  }

  render() {
    return (
      <div>
        <div>
          <h2>The perfect pet is waiting for you!</h2>
          <img src='https://i.pinimg.com/736x/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg' alt='cute puppy' />
        </div>
        <form onSubmit={this.handleJoinQueue}>
          <h3>Enter your name to join the queue!</h3>
          <section>
            <p>
              Because our pets are so popular, you'll need to wait your turn to adopt. When you're up, you can pick the dog or cat that you want!
            </p>
          </section>
          <input aria-label='name' type='text' name='name' id='name' required />
          <button type='submit'>Join</button>
        </form>
        <section>
          <h3>Or just take a look at our pets:</h3>
          <Link to='/adoptable'>
            <button>Adoptable Pets</button>{' '}
          </Link>
        </section>
        
      </div>
    )
  }
}

export default Home