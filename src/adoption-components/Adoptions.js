
import React, { Component } from 'react'

export default class Adoptions extends Component {
  render() {
    const { imgSrc, name, owner} = this.props
    return (
      <div>
        <img src={imgSrc} alt="pet"/>
        <p>Pet: {name}</p>
        <p>Owner: {owner}</p>
      </div>
    )
  }
}