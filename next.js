// Game of Life Implementation in JavaScript
const rows = 10; // Number of rows
const cols = 10; // Number of columns

// Initialize the grid with random 0s (dead) and 1s (alive)
let grid = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.floor(Math.random() * 2))
);

// Function to count the live neighbors of a cell
function countLiveNeighbors(grid, x, y) {
  let liveNeighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the cell itself
      const row = x + i;
      const col = y + j;
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        liveNeighbors += grid[row][col];
      }
    }
  }
  return liveNeighbors;
}

// Function to compute the next generation
function nextGeneration(grid) {
  const newGrid = grid.map(arr => [...arr]); // Copy grid for new state

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const liveNeighbors = countLiveNeighbors(grid, x, y);

      // Apply the rules of Game of Life
      if (grid[x][y] === 1) {
        newGrid[x][y] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0; // Cell stays alive if 2 or 3 neighbors
      } else {
        newGrid[x][y] = liveNeighbors === 3 ? 1 : 0; // Dead cell becomes alive if exactly 3 neighbors
      }
    }
  }
  return newGrid;
}

// Function to print the grid in the console
function printGrid(grid) {
  console.clear();
  console.log(grid.map(row => row.join(' ')).join('\n'));
}

// Main loop to run the game
function gameOfLife() {
  grid = nextGeneration(grid);
  printGrid(grid);
}

// Run the game every second
setInterval(gameOfLife, 1000);
