import React, { Component } from "react";
import Home from "./Home";
import Adoptable from "./Adoptable";
import Cats from "../adoption-components/Cats";
import Dogs from "../adoption-components/Dogs";
import PetfulContext from "../context";
import Waiting from "../adoption-components/Waiting";
import { Route } from "react-router-dom";
import { REACT_APP_API_BASE } from "../config";
import ErrorBoundary from "../ErrorBoundary";
import './App.css'

class App extends Component {
  state = {
    dogs: [],
    cats: [],
    people: [],
    error: "",
    name: "",
    dogNode: null,
    catNode: null,
    personNode: null,
    getCats: () => {
      fetch(`${REACT_APP_API_BASE}/cat`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            cats: data,
            catNode: data[0],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDogs: () => {
      fetch(`${REACT_APP_API_BASE}/dog`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            dogs: data,
            dogNode: data[0],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPeople: () => {
      fetch(`${REACT_APP_API_BASE}/people`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            people: data,
          });
        });
    },
    addPeople: (name) => {
      fetch(`${REACT_APP_API_BASE}/people`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(name),
      })
        .then((res) => res.json())
        .then(() => {
          this.setState({
            people: [...this.state.people, name.name],
          });
        });
    },
    deletePeople: () => {
      fetch(`${REACT_APP_API_BASE}/people`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            people: this.state.people.slice(1),
          });
        })
        .catch((e) => {
          throw new Error("Queue Error!");
        });
    },
    adoptCat: () => {
      fetch(`${REACT_APP_API_BASE}/cat`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            cats: data,
          });
        })
        .catch((e) => {
          throw new Error("Adoption failed.");
        });
    },
    adoptDog: () => {
      fetch(`${REACT_APP_API_BASE}/dog`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((data) => {
          this.setState({
            dogs: this.state.dogs.slice(1),
          });
        })
        .catch((e) => {
          throw new Error("Adoption failed.");
        });
    },
    setCatNode: (nextCat) => this.setState({ catNode: nextCat }),
    setDogNode: (nextDog) => this.setState({ dogNode: nextDog }),
    setPeopleNode: (nextPerson) => this.setState({ peopleNode: nextPerson }),
    setError: (error) => this.setState({ error: error }),
    setName: (name) => this.setState({ name: name }),
  };

  componentDidMount() {
    this.state.getCats();
    this.state.getDogs();
    this.state.getPeople();
  }

  render() {
    return (
      <PetfulContext.Provider value={this.state}>
        <ErrorBoundary>
          <main>
          <div className="app">
            <h1>Petful</h1>
            <Route exact path="/" component={Home} />
            <Route exact path="/adoptable" component={Adoptable} />
            <Route exact path="/dog" component={Dogs} />
            <Route exact path="/cat" component={Cats} />
            <Route
              exact path="/waiting"
              render={(props) => <Waiting {...props} />}
            />
          </div>
          </main>
        </ErrorBoundary>
      </PetfulContext.Provider>
    );
  }
}

export default App;