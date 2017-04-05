import React, { Component } from 'react'
import logo from '../logo.svg'
import './app.css'
import CardStack from './look/card-stack'

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
        <CardStack initialCardsData={data} />
      </div>
    )
  }
}

export default App
