import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import { createGrid, computeNextGeneration, Grid } from './logic/gameOfLife';

// Grid dimensions
const numRows = 30;
const numCols = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(() => createGrid(numRows, numCols));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100); // simulation speed in ms

  // Use a ref to store the running state to access it inside the simulation loop
  const runningRef = useRef(running);
  runningRef.current = running;

  // The main simulation loop
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return; // Stop the simulation if not running
    }
    setGrid(g => computeNextGeneration(g));
    setTimeout(runSimulation, speed);
  }, [speed]);

  // Click handler to toggle a cell's state
  const handleCellClick = (i: number, j: number) => {
    if (running) return; // Prevent editing while running
    const newGrid = grid.map(arr => [...arr]); // Create a copy
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="controls">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => setGrid(createGrid(numRows, numCols, true))}>
          Randomize
        </button>
        <button onClick={() => setGrid(createGrid(numRows, numCols))}>
          Clear
        </button>
        <div className="slider-container">
          <label>Speed: {speed}ms</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={running}
          />
        </div>
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => handleCellClick(i, j)}
              className={`cell ${grid[i][j] ? 'alive' : 'dead'}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
