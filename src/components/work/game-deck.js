import { connect } from 'react-redux'
import CardStack from '../look/card-stack'
import { removeCard, appendCard, resetCardPosition, swipeUp, swipeDown } from '../../actions'
import { SIDES } from '../../reducers/get-lean-direction-for'
import showInstrumentTranslateAmount from './show-instrument-translate-amount'

const mapStateToProps = state => {
  const translateAmount = showInstrumentTranslateAmount(state)
  const translateY = state.music.showInstrument ? translateAmount : 0
  return {
    cards: state.gameDeck.cards,
    translateY,
    classes: {
      'transition-transform': true
    },
    style: {

    }
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onOutScreen (card) {
      switch (card.side) {
        case SIDES.UP:
          dispatch(resetCardPosition(card.id))
          dispatch(swipeUp())
          break
        case SIDES.DOWN:
          dispatch(resetCardPosition(card.id))
          dispatch(swipeDown())
          break
        default: // left or right
          const nextCard = props.getNextCard()
          dispatch(removeCard(card))
          dispatch(appendCard(nextCard))
          break
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStack)
