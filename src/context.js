import React, { Component } from 'react'

const PetfulContext = React.createContext({
  currentDog: {},
  currentCat: {},
  queue: {first:{}},
  people: [],
  person: '',
  adopted: [],
  error: null,

  setCurrentDog: () => {},
  clearCurrentDog: () => {},

  setCurrentCat: () => {},
  clearCurrentCat: () => {},

  setQueue: () => {},
  clearQueue: () => {},

  setPeople: () => {},
  clearPeople: () => {},

  setPerson: () => {},
  clearPerson: () => {},

  setAdopted: () => {},
  clearAdopted: () => {},

  setError: () => {},
  clearError: () => {},

  randomPet: () => {},

  cyclePets: () => {},
})

export default PetfulContext

export class PetfulContextProvider extends Component {
  state = {
    currentDog: {},
    currentCat: {},
    queue: { first: {}, requeue: () => {} },
    people: [],
    person: '',
    adopted: [],
    error: null,
  }

  setCurrentDog = (currentDog) => {
    this.setState({ currentDog })
  }

  clearCurrentDog = () => {
    this.setState({ currentDog: {} })
  }

  setCurrentCat = (currentCat) => {
    this.setState({ currentCat })
  }

  clearCurrentCat = () => {
    this.setState({ currentCat: {} })
  }

  setQueue = (queue) => {
    console.log('QUEUE', queue)
    this.setState({ queue })
  }

  clearQueue = () => {
    this.setState({ first: {}, requeue: () => {} })
  }

  setPeople = (people) => {
    this.setState({ people })
  }

  clearPeople = () => {
    this.setState({ users: [] })
  }

  setPerson = (person) => {
    this.setState({ person })
  }

  clearPerson = () => {
    this.setState({ person: '' })
  }

  setAdopted = (adopted) => {
    this.setState({ adopted: [...this.state.adopted, adopted] })
  }

  clearAdopted = () => {
    this.setState({ adopted: [] })
  }

  setError = (error) => {
    console.log(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  randomPet = () => {
    let random = Math.floor(Math.random() * 100)
    if (random < 50) {
      this.handleAdoptDog()
    } else {
      this.handleAdoptCat()
    }
  }

  cyclePets = () => {
    if (this.context.person !== this.context.queue.first.value) {
      setTimeout(function () {
        this.randomPet()
      }, 5000)
    }
  }
  render() {
    const value = {
      currentDog: this.state.currentDog,
      currentCat: this.state.currentCat,
      queue: this.state.queue,
      people: this.state.people,
      person: this.state.person,
      adopted: this.state.adopted,
      error: this.state.error,
      setCurrentDog: this.setCurrentDog,
      clearCurrentDog: this.clearCurrentDog,
      setCurrentCat: this.setCurrentCat,
      clearCurrentCat: this.clearCurrentCat,
      setQueue: this.setQueue,
      clearQueue: this.clearQueue,
      setPeople: this.setPeople,
      clearPeople: this.clearPeople,
      setPerson: this.setPerson,
      clearPerson: this.clearPerson,
      setAdopted: this.setAdopted,
      clearAdopted: this.clearAdopted,
      setError: this.setError,
      clearError: this.clearError,
      randomPet: this.randomPet,
      cyclePets: this.cyclePets,
    }

    return (
      <PetfulContext.Provider value={value}>
        {this.props.children}
      </PetfulContext.Provider>
    )
  }
}