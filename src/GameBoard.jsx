import React, { useState } from 'react'

export default function GameBoard() {
  const [position, setPosition] = useState(1)
  const [dice, setDice] = useState(null)

  const ladders = { 3: 22, 5: 8, 11: 26 }
  const snakes = { 27: 1, 21: 9, 17: 4 }

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1
    setDice(roll)

    let next = position + roll
    if (ladders[next]) next = ladders[next]
    if (snakes[next]) next = snakes[next]
    if (next > 30) next = 30 // batas akhir papan versi mini

    setPosition(next)
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Posisi sekarang: {position}</p>
      {dice && <p>Hasil dadu: {dice}</p>}
      <button onClick={rollDice}>🎲 Lempar Dadu</button>
    </div>
  )
}
