import React, { Component } from "react";
import "./GraphGenerator.css";

class GraphGenerator extends Component {
  constructor() {
    super();
    this.state = {
      graph: {},
      nodeCount: 0,
      isDirected: false
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.generateGraph = this.generateGraph.bind(this);
    // this.displayNodes = this.displayNodes.bind(this);
    // this.getNodePositions = this.getNodePositions.bind(this);
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

  getNodePositions = node => {
    console.log("HELLO");
    console.log(node);
    // console.log(node.props.id);
    // console.log(document.getElementById(node.props.id));

    // let offset = document.getElementById(node.props.id).getBoundingClientRect();
    // let top = offset.top;
    // console.log(top);
  };

  componentDidMount() {
    this.getNodePositions();
  }

  render() {
    const { nodes } = this.state.graph;
    const nodeList = nodes
      ? nodes.map(node => {
          return this.displayNodes(node);
        })
      : null;
    if (nodes) {
      console.log("starting to get position");
      nodeList.forEach(node => {
        console.log(node);
        this.getNodePositions(node);
      });
    }
    return (
      <div>
        <input
          type="number"
          id="nodeCount"
          onChange={this.handleChange}
        ></input>
        <button onClick={this.generateGraph}>Generate Graph</button>
        <div className="nodes">{nodeList}</div>
      </div>
    );
  }
}

export default GraphGenerator;

// function getNodePositions(node) {
//   console.log(node);
//   console.log(node.props.id);
//   console.log(document.getElementById(node.props.id));
//   // document.onload = function() {
//   //   let a = document.getElementById(node.props.id);
//   //   console.log("This is inside onload function");
//   //   console.log(a);
//   // };
//   // let offset = document.getElementById(node.props.id).getBoundingClientRect();
//   // let top = offset.top;
//   // console.log(top);
// }
