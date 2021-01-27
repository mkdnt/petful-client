
import React, { Component } from 'react'

export default class Adoptions extends Component {
  render() {
    const { imgSrc, name, owner} = this.props
    return (
      <div>
        <img src={imgSrc} alt="pet"/>
          <h3>Congratulations!</h3>
          <p>{owner} has successfully adopted {name}!</p>
      </div>
    )
  }
}