import React from "react";
import PetfulContext from "../context";
import { Link } from "react-router-dom";

export default function Dogs(props) {
  const handleClickAdopt = (e, context) => {
    const currentDog = context.dogs[0];
    const name = context.name;
    console.log(currentDog);
    context.adoptDog(currentDog);
    context.deletePeople(name);
    context.setError("Congratulations to the new paw-rent!");
    context.setName("");
    context.setDogNode(context.dogs[1]);
  };

  
  const clearError = (e, context) => {
    context.setError("");
  };

  return (
    <PetfulContext.Consumer>
      {(context) => {
        console.log(context);
        if (context.dogs.length < 1) {
          return (
            <div>
              <h3>We're out of dogs for now! Come back later!</h3>
            </div>
          );
        }
        return (
          <div>
            <Link
              onClick={(e) => clearError(e, context)}
              to={{ pathname: "/" }}
            >
              <h1>Dogs</h1>
            </Link>
            <h2>{context.dogNode.name}</h2>
            <img
              src={context.dogNode.imageURL}
              alt={context.dogNode.imageDescription}
            />
            <p>
              {context.dogNode.breed}{" "}
            </p>
            <p>
              {context.dogNode.age}-year-old {context.dogNode.gender}{" "}
            </p>
            <p>
              {context.dogNode.story}
            </p>
            {context.name.length > 1 && (
              <button onClick={(e) => handleClickAdopt(e, context)}>
                Adopt Me
              </button>
            )}
            <p className="error">{context.error}</p>
            <hr
            style={{
            width: "75%",
            border: "2px solid #000000",
            backgroundColor: "#000000",
            }}
        />
          </div>
        );
      }}
    </PetfulContext.Consumer>
  );
}
