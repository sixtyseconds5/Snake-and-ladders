import React from 'react';

const DiceRoller = ({ diceValue, isRolling, onRoll, disabled }) => {
  const getDiceFace = (value) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[value - 1];
  };

  return (
    <div className="dice-container">
      <div className={`dice ${isRolling ? 'rolling' : ''}`}>
        {isRolling ? '🎲' : getDiceFace(diceValue)}
      </div>
      <button 
        className="roll-button" 
        onClick={onRoll}
        disabled={isRolling || disabled}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default DiceRoller;