import React, { Component } from 'react'
import PetfulContext from '../context'

export default class Pet extends Component {
  static contextType = PetfulContext
  render() {
    const { pet, handleAdoptClick } = this.props
    let isFirst = false
    if (this.context.queue) {
      isFirst = this.context.person === this.context.queue.first.value
    }
    return (
      <>
        <div>
          <img src={pet.imageURL} alt={pet.description} />
          <h2>{pet.name}</h2>
          <h4> {pet.breed}</h4>
          <h4>{pet.age}-year-old {pet.gender}</h4>
          <p>{pet.story}</p>
        </div>
        <button type='button' onClick={handleAdoptClick} disabled={!isFirst}>
          Adopt Me!
        </button>
        <br />
        <br />
        <hr
            style={{
            width: "75%",
            border: "2px solid #000000",
            backgroundColor: "#000000",
            }}
        />
      </>
    )
  }
}