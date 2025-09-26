import React from 'react';
import { SNAKES, LADDERS } from '../utils/gameConfig';

const GameBoard = ({ players }) => {
  const getCellClass = (cellNumber) => {
    let classes = 'cell';
    
    // Check for snakes
    const isSnakeHead = SNAKES.some(snake => snake.head === cellNumber);
    const isSnakeTail = SNAKES.some(snake => snake.tail === cellNumber);
    
    // Check for ladders
    const isLadderBottom = LADDERS.some(ladder => ladder.bottom === cellNumber);
    const isLadderTop = LADDERS.some(ladder => ladder.top === cellNumber);
    
    if (isSnakeHead) classes += ' snake-head';
    else if (isSnakeTail) classes += ' snake-tail';
    else if (isLadderBottom) classes += ' ladder-bottom';
    else if (isLadderTop) classes += ' ladder-top';
    
    if (cellNumber === 1) classes += ' start';
    if (cellNumber === 100) classes += ' finish';
    
    return classes;
  };

  const getPlayersAtPosition = (position) => {
    return players.filter(player => player.position === position);
  };

  const renderCell = (cellNumber) => {
    const playersHere = getPlayersAtPosition(cellNumber);
    
    return (
      <div key={cellNumber} className={getCellClass(cellNumber)}>
        <span>{cellNumber}</span>
        {playersHere.map((player, index) => (
          <div
            key={player.id}
            className={`player player-${player.id}`}
            style={{
              backgroundColor: player.color,
              top: index === 0 ? '5px' : '25px',
              left: index === 0 ? '5px' : '25px'
            }}
          />
        ))}
      </div>
    );
  };

  // Create board cells (100 to 1, arranged in snake pattern)
  const createBoard = () => {
    const board = [];
    
    for (let row = 9; row >= 0; row--) {
      const rowCells = [];
      
      if (row % 2 === 1) {
        // Odd rows: left to right
        for (let col = 0; col < 10; col++) {
          const cellNumber = row * 10 + col + 1;
          rowCells.push(renderCell(cellNumber));
        }
      } else {
        // Even rows: right to left
        for (let col = 9; col >= 0; col--) {
          const cellNumber = row * 10 + col + 1;
          rowCells.push(renderCell(cellNumber));
        }
      }
      
      board.push(...rowCells);
    }
    
    return board;
  };

  return (
    <div className="game-board">
      {createBoard()}
    </div>
  );
};

export default GameBoard;