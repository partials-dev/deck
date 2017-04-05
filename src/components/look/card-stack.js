import React from 'react'
import DraggableCard from './draggable-card'
import Card from './card'
import classnames from 'classnames'

const CardStack = React.createClass({
  getInitialState: function () {
    return {
      cards: this.props.initialCardsData,
      alertLeft: false,
      alertRight: false
    }
  },

  removeCard: function (side, cardId) {
    setTimeout(function () {
      if (side === 'left') {
        this.setState({alertLeft: false})
      } else if (side === 'right') {
        this.setState({alertRight: false})
      }
    }.bind(this), 3000)

    this.setState({
      cards: this.state.cards.filter(function (c) {
        return c.id !== cardId
      }),
      alertLeft: side === 'left',
      alertRight: side === 'right'
    })
  },

  render: function () {
    const cards = this.state.cards.map(function (c, index, coll) {
      const props = {
        cardId: c.id,
        index: index,
        onOutScreenLeft: this.removeCard.bind(this, 'left'),
        onOutScreenRight: this.removeCard.bind(this, 'right'),
        title: c.title,
        text: c.text,
        image: c.image
      }

      const component = (index === (coll.length - 1))
                    ? DraggableCard
                    : Card

      return React.createElement(component, props)
    }, this)

    const classesAlertLeft = classnames({
      'alert-visible': this.state.alertLeft,
      'alert-left': true,
      'alert': true
    })
    const classesAlertRight = classnames({
      'alert-visible': this.state.alertRight,
      'alert-right': true,
      'alert': true
    })

    return (
      <div>
        <div className={classesAlertLeft}>left</div>
        <div className={classesAlertRight}>right</div>
        <div id='cards'>
          {cards}
        </div>
      </div>
    )
  }
})

export default CardStack
