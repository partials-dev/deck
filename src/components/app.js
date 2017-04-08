import React, { Component } from 'react'
import './app.css'
import GameDeck from './work/game-deck'
import Instrument from './work/instrument'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameDeck getNextCard={this.props.getNextCard} />
        <Instrument />
      </div>
    )
  }
}

export default App
