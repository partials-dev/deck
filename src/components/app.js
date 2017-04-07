import React, { Component } from 'react'
import './app.css'
import GameDeck from './work/game-deck'
import defaultCard from '../reducers/default-card'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameDeck getNextCard={() => defaultCard} />
      </div>
    )
  }
}

export default App
