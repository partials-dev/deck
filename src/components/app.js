import React, { Component } from 'react'
import './app.css'
import GameDeck from './work/game-deck'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameDeck getNextCard={this.props.getNextCard} />
      </div>
    )
  }
}

export default App
