import React from 'react'
import classnames from 'classnames'
import './card.css'
import translate3d from './translate3d'
import { SIDES } from '../../reducers/get-lean-direction-for'

class Card extends React.Component {
  resetPosition () {
    const screen = document.getElementById('master-root')
    const card = this.card
    this.props.resetPosition(screen, card)
  }

  componentDidMount () {
    this.resetPosition = this.resetPosition.bind(this)
    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
    // window.addEventListener('resize', this.resetPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resetPosition)
  }

  render () {
    const style = Object.assign({
      zIndex: this.props.index + 1,
      // backgroundImage: 'url("/' + this.props.image + '")',
      transform: translate3d(this.props.position),
      ...this.props.style
    })
    const classes = classnames({
      card: true,
      ...this.props.classes
    })

    const gotRef = card => {
      this.card = card
      if (this.props.gotRef) {
        this.props.gotRef(card)
      }
    }

    const subtitlesByDirection = {
      [SIDES.LEFT]: this.props.left.text,
      [SIDES.RIGHT]: this.props.right.text,
      [SIDES.UP]: 'Play instrument',
      [SIDES.DOWN]: 'Go back'
    }
    const subtitle = subtitlesByDirection[this.props.leanDirection]
    return (
      <div ref={gotRef} style={style} className={classes}>
        <h1>{this.props.title}</h1>
        <h2>{subtitle}</h2>
        <img src={this.props.image} />
        <p>{this.props.body}</p>
      </div>
    )
  }
}

export default Card
