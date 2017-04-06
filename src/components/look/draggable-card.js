import React from 'react'
import ReactDOM from 'react-dom'
import Hammer from 'hammerjs'
import Card from './card'
import translate3d from './translate3d'

const DraggableCard = React.createClass({
  resetPosition () {
    const screen = document.getElementById('master-root')
    const card = ReactDOM.findDOMNode(this)

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    }

    this.props.setPosition(initialPosition)
    this.props.setInitialPosition(initialPosition)
  },

  panHandlers: {
    panstart () {
      this.props.setAnimate(false)
    },
    panend (ev) {
      const screen = document.getElementById('master-root')
      const card = this.card

      if (this.props.position.x < -50) {
        this.props.onOutScreenLeft(this.props.cardId)
      } else if ((this.props.position.x + (card.offsetWidth - 50)) > screen.offsetWidth) {
        this.props.onOutScreenRight(this.props.cardId)
      } else {
        this.props.setAnimate(true)
        this.resetPosition()
      }
    },
    panmove ({ deltaX, deltaY }) {
      const position = this.calculatePosition(deltaX, deltaY)
      this.props.setPosition(position)
    },
    pancancel (ev) {
      console.log(ev.type)
    }
  },

  handlePan (ev) {
    ev.preventDefault()
    this.panHandlers[ev.type].call(this, ev)
    return false
  },

  handleSwipe (ev) {
    console.log(ev.type)
  },

  calculatePosition (deltaX, deltaY) {
    return {
      x: (this.props.initialPosition.x + deltaX),
      y: (this.props.initialPosition.y + deltaY)
    }
  },

  componentDidMount () {
    const card = this.card
    this.hammer = new Hammer.Manager(card)
    this.hammer.add(new Hammer.Pan({threshold: 0}))

    const panEvents = 'panstart panend pancancel panmove'
    this.hammer.on(panEvents, this.handlePan)
    const swipeEvents = 'swipestart swipeend swipecancel swipemove'
    this.hammer.on(swipeEvents, this.handleSwipe)

    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
  },

  componentWillUnmount () {
    this.hammer.stop()
    this.hammer.destroy()
    this.hammer = null

    window.removeEventListener('resize', this.resetPosition)
  },

  render () {
    const translate = translate3d(this.props.position.x, this.props.position.y)
    const style = {
      transform: translate
    }

    const classes = { animate: this.props.animate }

    const gotRef = card => { this.card = card }

    return <Card {...this.props}
      gotRef={gotRef}
      style={style}
      classes={classes} />
  }
})

export default DraggableCard
