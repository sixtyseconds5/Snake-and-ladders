import React, { useState, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import PlayerInfo from './components/PlayerInfo';
import DiceRoller from './components/DiceRoller';
import GameMessage from './components/GameMessage';
import { SNAKES, LADDERS } from './utils/gameConfig';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 1, color: '#ff6b6b' },
    { id: 2, name: 'Player 2', position: 1, color: '#4dabf7' }
  ]);
  
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameMessage, setGameMessage] = useState('Player 1\'s turn to roll!');
  const [winner, setWinner] = useState(null);

  const movePlayer = useCallback((playerIndex, newPosition) => {
    setPlayers(prev => prev.map((player, index) => 
      index === playerIndex ? { ...player, position: newPosition } : player
    ));
  }, []);

  const checkSnakesAndLadders = useCallback((position) => {
    // Check for snakes
    const snake = SNAKES.find(s => s.head === position);
    if (snake) {
      return { type: 'snake', newPosition: snake.tail };
    }
    
    // Check for ladders
    const ladder = LADDERS.find(l => l.bottom === position);
    if (ladder) {
      return { type: 'ladder', newPosition: ladder.top };
    }
    
    return null;
  }, []);

  const rollDice = useCallback(() => {
    if (isRolling || winner) return;
    
    setIsRolling(true);
    
    // Simulate dice rolling animation
    setTimeout(() => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newDiceValue);
      
      const player = players[currentPlayer];
      let newPosition = player.position + newDiceValue;
      
      // Check if player would go beyond 100
      if (newPosition > 100) {
        setGameMessage(`${player.name} rolled ${newDiceValue} but can't move beyond 100!`);
        setCurrentPlayer(prev => (prev + 1) % 2);
        setIsRolling(false);
        return;
      }
      
      // Move player to new position
      movePlayer(currentPlayer, newPosition);
      
      // Check for snakes and ladders
      const snakeOrLadder = checkSnakesAndLadders(newPosition);
      
      if (snakeOrLadder) {
        setTimeout(() => {
          movePlayer(currentPlayer, snakeOrLadder.newPosition);
          
          if (snakeOrLadder.type === 'snake') {
            setGameMessage(`${player.name} rolled ${newDiceValue} and got bitten by a snake! Slid down to ${snakeOrLadder.newPosition}`);
          } else {
            setGameMessage(`${player.name} rolled ${newDiceValue} and climbed a ladder! Moved up to ${snakeOrLadder.newPosition}`);
          }
          
          // Check for winner after snake/ladder move
          if (snakeOrLadder.newPosition === 100) {
            setWinner(player);
            setGameMessage(`🎉 ${player.name} wins! 🎉`);
          } else {
            setTimeout(() => {
              setCurrentPlayer(prev => (prev + 1) % 2);
            }, 1500);
          }
        }, 1000);
      } else {
        // Check for winner
        if (newPosition === 100) {
          setWinner(player);
          setGameMessage(`🎉 ${player.name} wins! 🎉`);
        } else {
          setGameMessage(`${player.name} rolled ${newDiceValue} and moved to ${newPosition}`);
          setTimeout(() => {
            setCurrentPlayer(prev => (prev + 1) % 2);
          }, 1500);
        }
      }
      
      setIsRolling(false);
    }, 500);
  }, [isRolling, winner, players, currentPlayer, movePlayer, checkSnakesAndLadders]);

  const resetGame = useCallback(() => {
    setPlayers([
      { id: 1, name: 'Player 1', position: 1, color: '#ff6b6b' },
      { id: 2, name: 'Player 2', position: 1, color: '#4dabf7' }
    ]);
    setCurrentPlayer(0);
    setDiceValue(1);
    setIsRolling(false);
    setGameMessage('Player 1\'s turn to roll!');
    setWinner(null);
  }, []);

  // Update game message for next player's turn
  React.useEffect(() => {
    if (!winner && !isRolling) {
      const timer = setTimeout(() => {
        setGameMessage(`${players[currentPlayer].name}'s turn to roll!`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, isRolling, players]);

  return (
    <div className="game-container">
      <h1 className="game-title">🐍 Snake and Ladders 🪜</h1>
      
      <GameBoard players={players} />
      
      <div className="game-controls">
        <PlayerInfo 
          players={players} 
          currentPlayer={currentPlayer}
          winner={winner}
        />
        
        <DiceRoller 
          diceValue={diceValue}
          isRolling={isRolling}
          onRoll={rollDice}
          disabled={!!winner}
        />
        
        <GameMessage message={gameMessage} isWinner={!!winner} />
        
        {winner && (
          <button className="reset-button" onClick={resetGame}>
            Play Again
          </button>
        )}
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color snake-color"></div>
          <span>Snake Head/Tail</span>
        </div>
        <div className="legend-item">
          <div className="legend-color ladder-color"></div>
          <span>Ladder Bottom/Top</span>
        </div>
      </div>
    </div>
  );
}

export default App;

return (
  <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
    <h1>🐍 Crypto Snakes & Ladders</h1>
    {!user ? (
      <>
        <p>Silakan login dengan Farcaster untuk mulai main.</p>
        <LoginFarcaster onLogin={setUser} />
      </>
    ) : (
      <div>
        <p>Halo {user.username} (FID: {user.fid})</p>
        <button
          onClick={() =>
            fetch('/api/game/play', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fid: user.fid, username: user.username })
            }).then((r) => r.json().then(console.log))
          }
        >
          🎲 Main Sekarang
        </button>
      </div>
    )}
  </div>
)
