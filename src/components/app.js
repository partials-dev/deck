import React, { Component } from 'react'
import logo from '../logo.svg'
import './app.css'
import CardStack from './look/card-stack'

const data = [{title: 'Hi!', text: 'Hello world!', id: '1', image: 'portrait-1.jpg'}]

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
