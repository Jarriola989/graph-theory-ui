import React, { Component } from "react";
import "./algorithms.css";

class Dijkstra extends Component {
  constructor() {
    super();
    this.state = {
      shortestPath: [],
      edgeWeights: [],
    };
  }

  render() {
    return (
      <div className="algorithm">
        <div>Dijkstra's algorithm calculates the shortest path in a graph.</div>
        <div><button>Run</button></div>
      </div>
    );
  }
}

export default Dijkstra;
