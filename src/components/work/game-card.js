import { connect } from 'react-redux'
import Card from '../look/card'
import { updateCard, updateScreen, resetCardPosition } from '../../actions'

const mapStateToProps = ({ gameDeck }, props) => {
  const card = gameDeck.cards.find(card => card.id === props.id)
  return {
    position: card.position,
    initialPosition: card.initialPosition,
    ...props
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const id = props.id
  return {
    setPosition (position) {
      console.log('setting card position on ' + props.index)
      dispatch(updateCard({ id, position }))
    },
    setInitialPosition (initialPosition) {
      dispatch(updateCard({ id, initialPosition }))
    },
    setCardSize (size) {
      dispatch(updateCard({ id, size }))
    },
    setScreenSize (size) {
      dispatch(updateScreen({ size }))
    },
    resetPosition (screen, card) {
      // make sure screen size and card size are set
      this.setScreenSize({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })

      this.setCardSize({
        width: card.offsetWidth,
        height: card.offsetHeight
      })

      dispatch(resetCardPosition(props.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
