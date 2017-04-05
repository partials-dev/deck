import React from 'react'
import ReactDOM from 'react-dom'
import Hammer from 'hammerjs'
import Card from './card'

const DraggableCard = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      initialPosition: {
        x: 0,
        y: 0
      },
      startPosition: {
        x: 0,
        y: 0
      },
      animation: null
    }
  },

  resetPosition: function () {
    const screen = document.getElementById('master-root')
    const card = ReactDOM.findDOMNode(this)

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    }

    const initialState = this.getInitialState()
    this.setState(
      {
        x: initialPosition.x,
        y: initialPosition.y,
        initialPosition: initialPosition,
        startPosition: initialState.startPosition
      }
        )
  },

  panHandlers: {
    panstart: function () {
      this.setState({
        animation: false,
        startPosition: {
          x: this.state.x,
          y: this.state.y
        }
      })
    },
    panend: function (ev) {
      const screen = document.getElementById('master-root')
      const card = ReactDOM.findDOMNode(this)

      if (this.state.x < -50) {
        this.props.onOutScreenLeft(this.props.cardId)
      } else if ((this.state.x + (card.offsetWidth - 50)) > screen.offsetWidth) {
        this.props.onOutScreenRight(this.props.cardId)
      } else {
        this.resetPosition()
        this.setState({
          animation: true
        })
      }
    },
    panmove: function (ev) {
      this.setState(this.calculatePosition(
                ev.deltaX, ev.deltaY
            ))
    },
    pancancel: function (ev) {
      console.log(ev.type)
    }
  },

  handlePan: function (ev) {
    ev.preventDefault()
    this.panHandlers[ev.type].call(this, ev)
    return false
  },

  handleSwipe: function (ev) {
    console.log(ev.type)
  },

  calculatePosition: function (deltaX, deltaY) {
    return {
      x: (this.state.initialPosition.x + deltaX),
      y: (this.state.initialPosition.y + deltaY)
    }
  },

  componentDidMount: function () {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this))
    this.hammer.add(new Hammer.Pan({threshold: 0}))

    const events = [
            ['panstart panend pancancel panmove', this.handlePan],
      ['swipestart swipeend swipecancel swipemove',
        this.handleSwipe]
    ]

    events.forEach(function (data) {
      if (data[0] && data[1]) {
        this.hammer.on(data[0], data[1])
      }
    }, this)

    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
  },

  componentWillUnmount: function () {
    this.hammer.stop()
    this.hammer.destroy()
    this.hammer = null

    window.removeEventListener('resize', this.resetPosition)
  },

  render: function () {
    const translate = ''.concat(
            'translate3d(',
            this.state.x + 'px,',
            this.state.y + 'px,',
            '0px)'
        )

    const style = {
      msTransform: translate,
      WebkitTransform: translate,
      transform: translate
    }

    const classes = {
      animate: this.state.animation
    }

    return (<Card {...this.props}
      style={style}
      classes={classes} />)
  }
})

export default DraggableCard
