import React from "react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header>
      <Navigation />
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Welcome to Car Rental</h1>
          <p className="lead">Rent a car for every occasion</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
