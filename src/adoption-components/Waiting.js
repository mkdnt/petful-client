import React, { Component } from "react";
import Context from "../Context/Context";

export default class Confirmations extends Component {
  static contextType = Context;

  timeout = 0;
  componentDidMount() {
    this.timeout = setInterval(() => {
      if (this.context.people.length < 5) {
        this.context.addPeople({ name: "Fake Human" });
        return;
      }
      if (this.context.people[0] !== this.context.name) {
        const name = this.context.people[0];
        this.context.deletePeople(name);
        return;
      }

      if (this.context.error === "Almost your turn...") {
        this.context.setError(null);
        this.props.history.push("/adoption");
        return;
      }

      if (
        this.context.name === this.context.people[0] &&
        this.context.people.length === 5
      ) {
        this.context.setError("You're up next!");
        return;
      }
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          console.log(context);
          return (
            <div>
              <h1>Please wait in line...</h1>
              <h3>When it is your turn, you can select a dog or cat.</h3>
              <p className="error">{context.error}</p>
              <ol>
                {this.context.people.map((person, i) => {
                  return <li key={i}>{person}</li>;
                })}
              </ol>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}