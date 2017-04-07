import React from 'react'
import CurrentCard from '../work/current-card'
import Card from './card'

export default function CardStack (props) {
  const cards = props.cards.map((card, index, coll) => {
    const cardProps = {
      ...card,
      index: index,
      onOutScreen: props.removeCard
    }

    const isLastCard = index === (coll.length - 1)
    const component = isLastCard ? CurrentCard : Card
    return React.createElement(component, cardProps)
  })

  return (
    <div id='cards'>
      {cards}
    </div>
  )
}
