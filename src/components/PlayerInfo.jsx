import React from 'react';

const PlayerInfo = ({ players, currentPlayer, winner }) => {
  return (
    <div className="player-info">
      {players.map((player, index) => (
        <div 
          key={player.id} 
          className={`player-card player-${player.id}-card ${
            index === currentPlayer && !winner ? 'active' : ''
          } ${winner?.id === player.id ? 'winner' : ''}`}
        >
          <h3>{player.name}</h3>
          <div className="position">Position: {player.position}</div>
          {winner?.id === player.id && (
            <div style={{ marginTop: '10px', fontSize: '1.5rem' }}>🏆</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;