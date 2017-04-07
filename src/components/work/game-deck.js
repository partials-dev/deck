import { connect } from 'react-redux'
import CardStack from '../look/card-stack'
import { removeCard } from '../../actions'

const mapStateToProps = state => {
  return {
    cards: state.gameDeck.cards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCard (card) {
      dispatch(removeCard(card))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStack)
