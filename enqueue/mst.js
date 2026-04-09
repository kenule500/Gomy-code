// 1. The Union-Find (Disjoint Set) Helper

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]); // Path compression
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

// 2. Kruskal’s Algorithm Implementation

/**
 * Compute Minimum Spanning Tree
 * @param {number} numComputers - Total number of computers
 * @param {Array} edges - List of { u, v, weight }
 */
function computeMST(numComputers, edges) {
  // 1. Sort all connections by cable length (cheapest first)
  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
  
  const uf = new UnionFind(numComputers);
  const mst = [];
  let totalCost = 0;

  for (const edge of sortedEdges) {
    // 2. Try to connect computer U and V
    // If union returns true, it means they weren't connected, and no cycle is formed
    if (uf.union(edge.u, edge.v)) {
      mst.push(edge);
      totalCost += edge.weight;
    }
    
    // Optimization: Stop if we have enough edges (N-1)
    if (mst.length === numComputers - 1) break;
  }

  return {
    selectedConnections: mst,
    totalCost: totalCost
  };
}

// 3. Testing the Layout
const officeConnections = [
  { u: 0, v: 1, weight: 10 },
  { u: 0, v: 2, weight: 6 },
  { u: 0, v: 3, weight: 5 },
  { u: 1, v: 3, weight: 15 },
  { u: 2, v: 3, weight: 4 }
];

const result = computeMST(4, officeConnections);

console.log("--- Optimal Cable Layout ---");
result.selectedConnections.forEach(edge => {
  console.log(`Connect Computer ${edge.u} to ${edge.v} (Cost: ${edge.weight})`);
});
console.log(`Total Cable Cost: ${result.totalCost}`);