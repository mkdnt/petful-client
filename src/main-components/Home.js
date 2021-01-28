import React, { useState } from 'react';
import PetfulContext from '../context';
import { Link } from "react-router-dom";
import './Home.css'

export default function Home(props) {
  const [started, setStarted] = useState(false);

  const handleClick = (e, context) => {
    e.preventDefault();
    const name = e.target.name.value;
    const nameData = {
      name: name,
    };
    if (!name) {
      context.setError('Please enter your name');
      return;
    } else {
      context.setName(name);
      context.addPeople(nameData);
      context.setError('');
      props.history.push('/waiting');
    }
  };
  return (
    <PetfulContext.Consumer>
      {(context) => {
        return (
          <div className="home">
            <div className="homeSection">

             {!started ? <>
             <h2>The perfect pet is waiting for you!</h2>
             <img src='https://i.pinimg.com/736x/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg' alt='cute puppy' />
              <p>
                Because our pets are so popular, you'll need to wait your turn to adopt. When you're up, you can pick the dog or cat that you want!
              </p>
              <h3>Enter your name to join the queue!</h3> </> : null }
              {!started ? (
                <button onClick={() => setStarted(true)}>
                  Join
                </button>
              ) : (
                <form
                  onSubmit={(e) => {
                    handleClick(e, context);
                  }}
                >
                  <p>
                    <label>Name:</label>
                  </p>
                  <p>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Q. Person"
                    />
                  </p>
                  <p className="error">{context.error}</p>
                  <button type="submit">
                    Join
                  </button>
                </form>
                
              )}
              <section>
                <h4>Or just take a look at our latest pets:</h4>
                  <Link to={{ pathname: "/dog" }}>
                    <h5>DOGS</h5>
                  </Link>
                  <Link to={{ pathname: "/cat" }}>
                    <h5>CATS</h5>
                  </Link>
                  <hr
                      style={{
                      width: "75%",
                      border: "2px solid #000000",
                      backgroundColor: "#000000",
                      }}
                  />
              </section>
            </div>
          </div>
        );
      }}
    </PetfulContext.Consumer>
  );
}