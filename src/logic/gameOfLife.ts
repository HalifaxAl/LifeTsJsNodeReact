// Define the type for our grid
export type Grid = number[][];

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

/**
 * Creates a grid of a specified size.
 * @param rows The number of rows.
 * @param cols The number of columns.
 * @param randomize If true, the grid will be filled with a random pattern.
 * @returns A new Grid.
 */
export const createGrid = (rows: number, cols: number, randomize = false): Grid => {
  const grid: Grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      // If randomizing, give each cell a ~25% chance of being alive
      grid[i][j] = randomize ? (Math.random() > 0.75 ? 1 : 0) : 0;
    }
  }
  return grid;
};

/**
 * Computes the next state of the grid based on Conway's rules.
 * @param grid The current grid state.
 * @returns The next generation of the grid.
 */
export const computeNextGeneration = (grid: Grid): Grid => {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Create a deep copy of the grid to modify
  const newGrid = grid.map(arr => [...arr]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighbors = 0;
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        // Check grid boundaries
        if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols) {
          neighbors += grid[newI][newJ];
        }
      });

      // Apply the rules of the Game of Life
      if (neighbors < 2 || neighbors > 3) {
        newGrid[i][j] = 0; // Cell dies
      } else if (grid[i][j] === 0 && neighbors === 3) {
        newGrid[i][j] = 1; // Cell is born
      }
    }
  }
  return newGrid;
}; 
