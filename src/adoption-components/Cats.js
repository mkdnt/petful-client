import React from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";

export default function Cats(props) {
  const handleClickAdopt = (e, context) => {
    const currentCat = context.cats[0];
    const name = context.name;
    console.log(currentCat);
    context.adoptCat(currentCat);
    context.deletePeople(name);
    context.setError("Congratulations! You are now a pet owner");
    context.setName("");
    context.setCatNode(context.cats[1]);
  };


  const clearError = (e, context) => {
    context.setError("");
  };

  return (
    <Context.Consumer>
      {(context) => {
        console.log(context);
        if (context.cats.length < 1) {
          return (
            <div>
              <h3>We're out of cats for now! Come back later!</h3>
            </div>
          );
        }
        return (
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
    </Context.Consumer>
  );
}