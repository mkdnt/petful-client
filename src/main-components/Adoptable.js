import React, { Component } from 'react'
import PetfulContext from '../context'
import Pet from '../adoption-components/Pet'
import Waiting from '../adoption-components/Waiting'
import PeopleService from '../services/people-service'
import DogsService from '../services/dogs-service'
import CatsService from '../services/cats-service'
import Queue from '../services/Queue'
import Adoptions from '../adoption-components/Adoptions'

class Adoptable extends Component {
  static contextType = PetfulContext

  componentDidMount() {
    this.context.clearCurrentDog()
    this.context.clearCurrentCat()
    this.context.clearError()
    this.context.clearQueue()

    this.interval = setInterval(this.cyclePeople.bind(this), 3000)
    Promise.all([
      CatsService.getCat(),
      DogsService.getDog(),
      PeopleService.getPeople(),
    ])
      .then((res) => {
        this.context.setCurrentDog(res[0])
        this.context.setCurrentCat(res[0])
        let peopleQueue = new Queue()
        res[2].forEach((person) => peopleQueue.enqueue(person))
        this.context.setQueue(peopleQueue)
      })
      .catch((error) => console.error(error))
  }
  cyclePeople = () => {
    if (this.context.person !== this.context.queue.first.value) {
      let odds = Math.floor(Math.random() * 100)
      if (odds < 50) {
        this.handleDogClick()
      } else {
        this.handleCatClick()
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  renderQueue() {
    return (
      <Waiting
        first={this.context.queue.first.value}
        second={this.context.queue.first.next.value}
        third={this.context.queue.first.next.next.value}
      />
    )
  }

  handleDogClick = () => {
    return DogsService.deleteDog()
      .then(res => {
        let owner = this.context.queue.requeue()
        res.owner = owner
        this.context.setAdopted(res)
      })
      .then(res => {
        DogsService.getDog().then(res => this.context.setCurrentDog(res))
        this.setState({ adopting: this.context.queue.first.value })
      })
  }

  handleCatClick = () => {
    return CatsService.deleteCat()
      .then(res => {
        let owner = this.context.queue.requeue()
        res.owner = owner
        this.context.setAdopted(res)
      })
      .then(res => {
        CatsService.getCat().then(res => this.context.setCurrentCat(res))
        this.setState({ adopting: this.context.queue.first.value })
      })
  }

  renderDog() {
    return (
      <Pet
        pet={this.context.currentDog}
        type={'dog'}
        handleAdoptClick={this.handleDogClick}
      />
    )
  }

  renderCat() {
    return (
      <Pet
        pet={this.context.currentCat}
        type={'cat'}
        handleAdoptClick={this.handleCatClick}
      />
    )
  }

  render() {
    const petAdopted = this.context.adopted.map((pet, index) => (
      <div key={index}>
        <Adoptions
        imgSrc={pet.imageURL}
        name={pet.name}
        owner={pet.owner}
        />
      </div>
    ))
    return (
      <>
        <div>
          <h1>Adoptable Pets</h1>
          {this.context.queue.first.next ? this.renderQueue() : "The pets are about to arrive..."}
        </div>
        <section>
          <div>
            <h2>DOGS</h2>
            {this.renderDog()}
          </div>
          <div>
            <h2>CATS</h2>
            {this.renderCat()}
          </div>
        </section>
        <div>
          <h2>Congrats to the new paw-rents!</h2>
          {petAdopted}
        </div>
      </>
    )
  }
}

export default Adoptable