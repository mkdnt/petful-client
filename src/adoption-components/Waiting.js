import React, { Component } from 'react'

class Waiting extends Component {
  render() {
    return (
      <div className='waiting'>
        <ul>
          <h2>Waiting to Adopt</h2>
          <li>{this.props.first}</li>
          <li>{this.props.second}</li>
          <li>{this.props.third}</li>
        </ul>
      </div>
    )
  }
}

export default Waiting