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
      dispatch(removeCard(card))
      dispatch(appendCard(props.getNextCard()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStack)
