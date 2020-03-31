import React, { Component } from "react";
import "./GraphGenerator.css";

let nodePositions = {};
let graphEdges = [];

class GraphGenerator extends Component {
  constructor() {
    super();
    this.state = {
      graph: {},
      nodeCount: 0,
      isDirected: false,
      edges: []
    };
  }

  generateGraph = () => {
    const { nodeCount, isDirected } = this.state;
    let result = fetch(`http://localhost:5000/create-graph`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodeCount: nodeCount, isDirected: isDirected })
    });

    let response = result.then(response => response.json());
    response.then(data =>
      this.setState({
        graph: data.graph
      })
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  displayNodes = node => {
    const colors = ["#744FC6", "#4F86C6", "#4FB0C6", "#379392"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div
        className="node"
        key={node}
        id={node}
        style={{ backgroundColor: randomColor }}
      >
        {node}
      </div>
    );
  };

  setEdges = (start, end) => {
    graphEdges.push(
      <svg
        className="edge"
        width="500"
        height="500"
        key={start + end}
        id={start + end}
      >
        <line
          // className="edge"
          x1={nodePositions[start][0]}
          y1={nodePositions[start][1]}
          x2={nodePositions[end][0]}
          y2={nodePositions[end][1]}
          stroke="black"
        />
      </svg>
    );
  };

  getNodePositions = node => {
    let offsetLeft = document.getElementById(node).offsetLeft;
    let offsetTop = document.getElementById(node).offsetTop;
    let nodeWidth = document.getElementById(node).offsetWidth;
    let nodeHeight = document.getElementById(node).offsetHeight;
    // console.log(offset);
    Object.assign(nodePositions, {
      [node]: [offsetLeft - nodeWidth / 2, offsetTop - nodeHeight / 2]
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { nodes, edges } = this.state.graph;

    if (nodes !== undefined) {
      nodePositions = {};
      nodes.map(node => {
        return this.getNodePositions(node);
      });
    }
    if (edges !== undefined) {
      graphEdges = [];
      edges.map(([start, end]) => {
        return this.setEdges(start, end);
      });
    }
    if (JSON.stringify(prevState.edges) !== JSON.stringify(graphEdges)) {
      this.setState({ edges: graphEdges });
    }
  }

  render() {
    const { nodes } = this.state.graph;
    const nodeList = nodes
      ? nodes.map(node => {
          return this.displayNodes(node);
        })
      : null;
    return (
      <div className="graph-generator">
        <input
          className="node-input"
          type="number"
          id="nodeCount"
          onChange={this.handleChange}
        ></input>
        <button onClick={this.generateGraph}>Generate Graph</button>
        <div className="graph-display">
          {nodeList}
          {this.state.edges}
        </div>
      </div>
    );
  }
}

export default GraphGenerator;
