import React from "react";
import PetfulContext from "../context";
import { Link } from "react-router-dom";

export default function Adoptable(props) {
  const handleClickAdoptCat = (e, context) => {
    const currentCat = context.cats[0];
    const name = context.name;
    context.adoptCat(currentCat);
    context.deletePeople(name);
    context.setError("CONGRATULATIONS TO YOU, THE NEW PAW-RENT OF A WONDERFUL CAT!");
    context.setName("");
    context.setCatNode(context.cats[1]);
  };
  const handleClickAdoptDog = (e, context) => {
    const currentDog = context.dogs[0];
    const name = context.name;
    context.adoptDog(currentDog);
    context.deletePeople(name);
    context.setError("CONGRATULATIONS TO YOU, THE NEW PAW-RENT OF A WONDERFUL DOG!");
    context.setName("");
    context.setDogNode(context.dogs[1]);
  };

  const clearError = (e, context) => {
    context.setError("");
  };

  return (
    <PetfulContext.Consumer>
      {(context) => {
        if (context.cats.length < 1) {
          return (
            <div>
              <h3>We're out of cats for now! Come back later!</h3>
            </div>
          );
        };
        if (context.dogs.length < 1) {
          return (
            <div>
              <h3>We're out of dogs for now! Come back later!</h3>
            </div>
          );
        };
        return (
          <div>
            <h1>Adoptable Pets</h1>
          <div>
            <Link
              onClick={(e) => clearError(e, context)}
              to={{ pathname: "/" }}
            >
              <h1>Cats</h1>
            </Link>
            <h2>{context.catNode.name}</h2>
            <img
              src={context.catNode.imageURL}
              alt={context.catNode.imageDescription}
            />
            <p>
              {context.catNode.breed}{" "}
            </p>
            <p>
              {context.catNode.age}-year-old {context.catNode.gender}{" "}
            </p>
            <p>
              {context.catNode.story}
            </p>
            {context.name.length > 1 && (
              <button onClick={(e) => handleClickAdoptCat(e, context)}>
                Adopt Me
              </button>
            )}
            <hr
            style={{
            width: "75%",
            border: "2px solid #000000",
            backgroundColor: "#000000",
            }}
        />
          </div>
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
              <button onClick={(e) => handleClickAdoptDog(e, context)}>
                Adopt Me
              </button>
            )}
            <hr
            style={{
            width: "75%",
            border: "2px solid #000000",
            backgroundColor: "#000000",
            }}
        />
          </div>
          <h3>Adoption Confirmation</h3>
          <h4 className="error">{context.error}</h4>
          </div>
        );
      }}
    </PetfulContext.Consumer>
  );
}