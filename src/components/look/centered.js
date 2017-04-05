import React from 'react'
import classnames from 'classnames'
import translate3d from './translate3d'
import './card.css'

const initialState = {
  initialPosition: {
    x: 0,
    y: 0
  }
}

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  setInitialPosition () {
    const screen = document.getElementById('master-root')
    // const card = ReactDOM.findDOMNode(this)
    const card = this.card

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    }

    this.setState({ initialPosition })
  }

  componentDidMount () {
    this.setInitialPosition()

    window.addEventListener('resize', this.setInitialPosition.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setInitialPosition.bind(this))
  }

  render () {
    const initialTranslate = translate3d(
            this.state.initialPosition.x,
            this.state.initialPosition.y
        )

    const style = Object.assign({
      transform: initialTranslate,
      zIndex: this.props.index,
      backgroundImage: 'url("/' + this.props.image + '")',
      ...this.props.style
    })

    const classes = classnames({
      card: true,
      ...this.props.classes
    })

    const gotRef = card => {
      this.card = card
    }
    return (
      <div ref={gotRef} style={style} className={classes}>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default Card
