import React, { Component } from "react";
import aws_exports from "./config";
import "./App.css";
import Voter from "./Voter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Voter />
      </div>
    );
  }
}

export default App;
