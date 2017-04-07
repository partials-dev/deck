import React, { Component } from 'react'
import logo from '../logo.svg'
import './app.css'
import GameDeck from './work/game-deck'

const data = [{
  id: 1,
  title: 'Hi!',
  text: 'Hello world!',
  image: 'portrait-1.jpg'
}]

class App extends Component {
  render () {
    return (
      <div className='app'>
        <GameDeck />
      </div>
    )
  }
}

export default App
