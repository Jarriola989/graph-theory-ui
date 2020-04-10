import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltV,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import Dijkstra from "./algorithms/Dijkstra";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="navbar">
        <div className="header">
          <h1>
            Graph Theory <FontAwesomeIcon icon={faProjectDiagram} />
          </h1>
          <p>Create your graph, pick your algorithm!</p>
        </div>
        <div className="algorithms">
          <button>
            Breadth First Search (BFS) <FontAwesomeIcon icon={faArrowsAltV} />
          </button>
          <button>
            Depth First Search (DFS) <FontAwesomeIcon icon={faArrowsAltV} />
          </button>
          {/* non-directed */}
          <button>Dijkstra’s Shortest Path</button>
          <button>
            Floyd–Warshall Algorithm <FontAwesomeIcon icon={faArrowsAltV} />
          </button>
          {/* non-directed */}
          <button>Union-Find</button>
          {/* non-directed */}
          <button>Prim's Algorithm</button>
          {/* non-directed */}
          <button>Kruskal's Algorithm</button>
          <button>
            Topological Sort <FontAwesomeIcon icon={faArrowsAltV} />
          </button>

          <button>Boggle</button>
          {/* non-directed */}
          <button>Bridges in a Graph</button>
        </div>
        <Dijkstra />
      </div>
    );
  }
}

export default NavBar;
