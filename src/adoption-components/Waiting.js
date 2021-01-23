import React, { Component } from 'react'

class Waiting extends Component {
  render() {
    return (
      <div className='waiting'>
        <ul>
          <h2>Waiting to Adopt</h2>
          <p>1. {this.props.first}</p>
          <p>2. {this.props.second}</p>
          <p>3. {this.props.third}</p>
        </ul>
        <hr
            style={{
            width: "75%",
            border: "2px solid #000000",
            backgroundColor: "#000000",
            }}
        />
      </div>
    )
  }
}

export default Waiting