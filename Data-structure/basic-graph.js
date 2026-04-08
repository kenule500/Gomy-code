class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }

  // Add a vertex to the graph
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);

    this.adjacencyList[v1].push(v2);
    if (!this.isDirected) {
      this.adjacencyList[v2].push(v1);
    }
  }

  // Remove an edge
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    if (!this.isDirected) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
    }
  }

  // Check if an edge exists
  hasEdge(v1, v2) {
    return this.adjacencyList[v1]?.includes(v2) || false;
  }

  // Print the graph structure
  printGraph() {
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }

  // --- Traversal Algorithms ---

  // Breadth-First Search (BFS)
  bfs(startNode) {
    const queue = [startNode];
    const visited = new Set();
    const result = [];

    visited.add(startNode);

    while (queue.length) {
      const current = queue.shift();
      result.push(current);

      this.adjacencyList[current].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  // Depth-First Search (DFS)
  dfs(startNode) {
    const visited = new Set();
    const result = [];
    const adjList = this.adjacencyList;

    (function traverse(vertex) {
      if (!vertex) return;
      visited.add(vertex);
      result.push(vertex);

      adjList[vertex].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      });
    })(startNode);

    return result;
  }
}