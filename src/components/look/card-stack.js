import React from 'react'
import CurrentCard from '../work/current-card'
import GameCard from '../work/game-card'

export default function CardStack (props) {
  const cards = props.cards.map((card, i, collection) => {
    const index = collection.length - (i + 1)
    const cardProps = {
      ...card,
      key: card.id,
      index,
      onOutScreen: props.removeCard
    }

    const isLastCard = index === (collection.length - 1)
    const component = isLastCard ? CurrentCard : GameCard
    // const component = GameCard
    return React.createElement(component, cardProps)
  })

  return (
    <div id='cards'>
      {cards}
    </div>
  )
}
