import React from 'react'
import ReactDOM from 'react-dom'

import './card.css'

function classSet (classNames) {
  var names = ''

  if (typeof classNames === 'object') {
    for (var name in classNames) {
      if (!classNames.hasOwnProperty(name) || !classNames[name]) {
        continue
      }
      names += name + ' '
    }
  } else {
    for (var i = 0; i < arguments.length; i++) {
      // We should technically exclude 0 too, but for the sake of backward
      // compat we'll keep it (for now)
      if (arguments[i] == null) {
        continue
      }
      names += arguments[i] + ' '
    }
  }

  return names.trim()
}

function merge (...args) {
  return Object.assign(...args)
}

const Card = React.createClass({
  getInitialState: function () {
    return {
      initialPosition: {
        x: 0,
        y: 0
      }
    }
  },

  setInitialPosition: function () {
    const screen = document.getElementById('master-root')
    const card = ReactDOM.findDOMNode(this)

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    }

    this.setState({
      initialPosition: initialPosition
    })
  },

  componentDidMount: function () {
    this.setInitialPosition()

    window.addEventListener('resize', this.setInitialPosition)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.setInitialPosition)
  },

  render: function () {
    const initialTranslate = ''.concat(
            'translate3d(',
            this.state.initialPosition.x + 'px,',
            this.state.initialPosition.y + 'px,',
            '0px)'
        )

    const style = merge({
      msTransform: initialTranslate,
      WebkitTransform: initialTranslate,
      transform: initialTranslate,
      zIndex: this.props.index,
      backgroundImage: 'url("/' + this.props.image + '")'
    }, this.props.style)

    const classes = classSet(merge(
      {
        card: true
      },
            this.props.classes
        ))

    return (
      <div style={style} className={classes}>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    )
  }
})

export default Card
