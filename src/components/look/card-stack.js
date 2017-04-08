import React from 'react'
import CurrentCard from '../work/current-card'
import GameCard from '../work/game-card'
import classnames from 'classnames'

export default function CardStack (props) {
  const cards = props.cards.map((card, i, collection) => {
    const index = collection.length - (i + 1)
    const cardProps = {
      ...card,
      key: card.id,
      index,
      onOutScreen: props.onOutScreen
    }

    const isLastCard = index === (collection.length - 1)
    const component = isLastCard ? CurrentCard : GameCard
    // const component = GameCard
    return React.createElement(component, cardProps)
  })

  const style = {
    ...props.style,
    transform: `translateY(${props.translateY}px)`
  }
  const classes = classnames({
    ...props.classes
  })
  return (
    <div id='cards' className={classes} style={style}>
      {cards}
    </div>
  )
}
