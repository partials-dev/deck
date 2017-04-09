import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/app'
import reducers from './reducers'
import defaultCard from './reducers/default-card'
import * as actions from './actions'
import story from './story.json'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, reduxDevTools)

// let nextId = 0
// function getNextCard () {
//   const i = Math.round(Math.random() * 3) + 1 // 1 to 4
//   const nextCard = { ...defaultCard, image: `switchroom.jpg`, id: nextId }
//   nextId++
//   return nextCard
// }

// let i = 0
// function getNextCard (previousCard) {
//   const nextCard = { ...defaultCard, ...story[i] }
//   i++
//   if (i >= story.length) {
//     i = 0
//   }
//   return nextCard
// }

let previousCards = []
function getNextCard (swipe) {
  if (swipe == null) {
    const nextCard = { ...defaultCard, ...story[0] }
    previousCards[0] = nextCard
    previousCards[1] = nextCard
    return nextCard
  }
  const currentCard = story.find(card => card.id === swipe.id)
  const nextCardId = currentCard[swipe.side].link
  const nextCard = {
    ...defaultCard,
    ...story.find(card => card.id === nextCardId)
  }

  if (!(nextCard && nextCardId)) {
    debugger
  }

  previousCards[0] = previousCards[1]
  previousCards[1] = nextCard
  return nextCard
}

function getPreviousCard () {
  previousCards[1] = previousCards[0]
  return previousCards[0]
}

const appendCard = card => store.dispatch(actions.appendCard(card))
const cards = [getNextCard()]
cards.forEach(appendCard)

const root = document.getElementById('master-root')
render(
  <Provider store={store}>
    <App getNextCard={getNextCard} getPreviousCard={getPreviousCard} />
  </Provider>,
  root
)

// function toggleFullScreen () {
//   var doc = window.document
//   var docEl = doc.documentElement
//
//   var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
//   var exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
//
//   if (!isFullScreen()) {
//     requestFullScreen.call(docEl)
//   } else {
//     exitFullScreen.call(doc)
//   }
// }
//
// function isFullScreen () {
//   const doc = window.document
//   return doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement || navigator.standalone
// }

// root.onclick = () => { if (!isFullScreen()) toggleFullScreen() }
