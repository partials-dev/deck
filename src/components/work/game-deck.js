import { connect } from 'react-redux'
import CardStack from '../look/card-stack'
import { removeCard, appendCard } from '../../actions'

const mapStateToProps = state => {
  return {
    cards: state.gameDeck.cards
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    removeCard (card) {
      const nextCard = props.getNextCard()
      console.log('appending ' + JSON.stringify(nextCard))
      dispatch(removeCard(card))
      dispatch(appendCard(nextCard))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStack)
