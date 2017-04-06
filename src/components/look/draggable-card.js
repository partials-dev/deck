import React from 'react'
import Hammer from 'hammerjs'
import Card from './card'
import translate3d from './translate3d'

const DraggableCard = React.createClass({
  resetPosition () {
    const screen = document.getElementById('master-root')
    const card = this.card
    this.props.resetPosition(screen, card)
  },

  panHandlers: {
    panstart () {
      this.props.setAnimate(false)
    },
    panend (ev) {
      const leanDirection = this.props.leanDirection
      if (leanDirection !== 'middle') {
        this.props.onOutScreen(leanDirection, this.props.cardId)
      } else {
        this.props.setAnimate(true)
        this.resetPosition()
      }
    },
    panmove ({ deltaX, deltaY }) {
      const position = {
        x: this.props.initialPosition.x + deltaX,
        y: this.props.initialPosition.y + deltaY
      }
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
    const translate = translate3d(this.props.position)
    const style = { transform: translate }
    const classes = {
      animate: this.props.animate,
      [this.props.leanDirection]: true
    }

    const gotRef = card => { this.card = card }

    return <Card {...this.props}
      gotRef={gotRef}
      style={style}
      classes={classes} />
  }
})

export default DraggableCard
