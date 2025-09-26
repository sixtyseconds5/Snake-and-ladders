import React from 'react';

const GameMessage = ({ message, isWinner }) => {
  return (
    <div className={`message ${isWinner ? 'winner-message' : ''}`}>
      {message}
    </div>
  );
};

export default GameMessage;