import React from 'react'
import Hammer from 'hammerjs'
import Card from './card'
// import translate3d from './translate3d'
import { SIDES } from '../../reducers/get-lean-direction-for'

const DraggableCard = React.createClass({
  resetPosition () {
    const screen = document.getElementById('master-root')
    this.props.resetPosition(screen, this.card)
  },

  panHandlers: {
    panstart () {
      this.props.setUserIsTouching(true)
    },
    panend (ev) {
      this.props.setUserIsTouching(false)
      const leanDirection = this.props.leanDirection
      if (leanDirection !== SIDES.MIDDLE) {
        this.props.onOutScreen({ side: leanDirection, id: this.props.id })
      } else {
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
    const classes = {
      'user-is-touching': this.props.userIsTouching,
      [this.props.leanDirection]: true,
      draggable: true
    }

    const gotRef = card => { this.card = card }

    return <Card {...this.props}
      gotRef={gotRef}
      classes={classes} />
  }
})

export default DraggableCard
