import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/app'
import reducers from './reducers'

const store = createStore(reducers)

const root = document.getElementById('master-root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)

function toggleFullScreen () {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  var exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if (!isFullScreen()) {
    requestFullScreen.call(docEl)
  } else {
    exitFullScreen.call(doc)
  }
}

function isFullScreen () {
  const doc = window.document
  return doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement || navigator.standalone
}

// root.onclick = () => { if (!isFullScreen()) toggleFullScreen() }
