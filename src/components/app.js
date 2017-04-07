import React, { Component } from 'react'
import './app.css'
import GameDeck from './work/game-deck'
import defaultCard from '../reducers/default-card'

let bang = '!'
function getNextCard () {
  const nextCard = { ...defaultCard }
  nextCard.title += bang
  bang += '!'
  return nextCard
}

class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameDeck getNextCard={getNextCard} />
      </div>
    )
  }
}

export default App
