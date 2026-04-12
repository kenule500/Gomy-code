function dijkstra(graph, start) {
  // Initialize distances and previous nodes
  let distances = {};
  let previous = {};
  let queue = [];

  // Set initial distances to infinity
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;
  queue.push([start, 0]);

  // Process queue
  while (queue.length) {
    // Get the vertex with the smallest distance
    queue.sort((a, b) => a[1] - b[1]);
    let [currentVertex, currentDistance] = queue.shift();

    // Skip if we've already processed this vertex
    if (currentDistance > distances[currentVertex]) continue;

    // Update distances for neighbors
    for (let neighbor in graph[currentVertex]) {
      let distance = currentDistance + graph[currentVertex][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentVertex;
        queue.push([neighbor, distance]);
      }
    }
  }

  return distances;
}

// Example usage:
const graph = {
  'A': { 'B': 4, 'C': 2 },
  'B': { 'A': 4, 'C': 5, 'D': 10 },
  'C': { 'A': 2, 'B': 5, 'D': 3 },
  'D': { 'B': 10, 'C': 3 }
};
console.log(dijkstra(graph, 'A')); // { A: 0, B: 4, C: 2, D: 5 }