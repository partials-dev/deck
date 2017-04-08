import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/app'
import reducers from './reducers'
import defaultCard from './reducers/default-card'
import * as actions from './actions'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducers, reduxDevTools)

let nextId = 0
function getNextCard () {
  const i = Math.round(Math.random() * 3) + 1 // 1 to 4
  const nextCard = { ...defaultCard, image: `portrait-${i}.jpg`, id: nextId }
  nextId++
  return nextCard
}

const appendCard = card => store.dispatch(actions.appendCard(card))
const cards = [getNextCard(), getNextCard(), getNextCard(), getNextCard()]
cards.forEach(appendCard)

const root = document.getElementById('master-root')
render(
  <Provider store={store}>
    <App getNextCard={getNextCard} />
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
