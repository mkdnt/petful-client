import React from "react";
import { Link } from "react-router-dom";

export default function Adoptable() {
  return (
    <div>
      <h1>Adoptable Pets</h1>
      <Link to={{ pathname: "/dog" }}>
        <h2>DOGS</h2>
      </Link>
      <Link to={{ pathname: "/cat" }}>
        <h2>CATS</h2>
      </Link>
    </div>
  );
}