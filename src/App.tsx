import React, {MouseEvent, useState} from 'react';
import './App.css';

function App() {
  const initBoardState = lidkaTest;
  const [boardState, setBoardState] = useState(initBoardState);
  const handleRunClick = (e: MouseEvent) => {
    e.preventDefault();
    setBoardState(runGame(boardState));
  }
  const handleResetClick = (e: MouseEvent) => {
    e.preventDefault();
    setBoardState(initState(48,48))
  }
  const handleCellClick = (e: MouseEvent, rowNum: number, cellNum: number) => {
    e.preventDefault();
    setBoardState(boardState.map((row, rowIndex) => row.map((cell, cellIndex) => {
      if (rowIndex === rowNum && cellIndex === cellNum) return !cell;
      return cell;
    })))
  }

  const renderBoard = (boardState: boolean[][]) => {
    return <div className="board">{boardState.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        return <div className="cell" data-row={rowIndex} data-cell={cellIndex} onClick={e => handleCellClick(e, rowIndex, cellIndex)}>{cell ? '■' : '□'}</div>
      });
  
      return <div className="row">{cells}</div>;
    })}</div>;
  }

  return (
    <div className="App">
      {renderBoard(boardState)}
      <button onClick={handleRunClick}>Run Game</button>
      <button onClick={handleResetClick}>Reset Game</button>
    </div>
  );
}

export default App;

const initState = (rows: number, columns: number): boolean[][] =>
  [...Array(rows)].fill([...Array(columns)].fill(false));

const setState = (boardState: boolean[][], filled: [number,number][]): boolean[][] =>
  boardState.map((row, rowIndex) => row.map((_, colIndex) =>
    filled.findIndex(f => f[0] === rowIndex && f[1] === colIndex) !== -1
  ))

const runGame = (boardState: boolean[][]): boolean[][] => {
  return boardState.map((row, rowIndex) => row.map((cell, cellIndex) => {
    const numNeighbors = getAdjacentCellCount(boardState, rowIndex, cellIndex);
    if (cell && 1 < numNeighbors && numNeighbors < 4) return true;
    if (!cell && numNeighbors === 3) return true;
    return false;
  }))
}

const getAdjacentCellCount = (boardState: boolean[][], rowIndex: number, cellIndex: number): number =>
  [
    boardState?.[rowIndex - 1]?.[cellIndex - 1],
    boardState?.[rowIndex - 1]?.[cellIndex    ],
    boardState?.[rowIndex - 1]?.[cellIndex + 1],
    boardState?.[rowIndex    ]?.[cellIndex - 1],
    boardState?.[rowIndex    ]?.[cellIndex + 1],
    boardState?.[rowIndex + 1]?.[cellIndex - 1],
    boardState?.[rowIndex + 1]?.[cellIndex    ],
    boardState?.[rowIndex + 1]?.[cellIndex + 1]
  ]
  .filter(Boolean).length;

  const lidkaTest = setState(initState(48, 48), [
    [13,11],[13,12],[13,13],[13,19],[12,14],[12,19],[11,14],[11,15],[11,19],[9,17],[9,18],[9,19],[8,17]
  ]);