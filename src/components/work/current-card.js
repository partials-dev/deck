import { connect } from 'react-redux'
import DraggableCard from '../look/draggable-card'
import { updateCurrentCard, updateScreen, resetCurrentCardPosition } from '../../actions'

const mapStateToProps = ({ currentCard }, props) => {
  return {
    animate: currentCard.animate,
    position: currentCard.position,
    initialPosition: currentCard.initialPosition,
    leanDirection: currentCard.leanDirection
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAnimate (animate) {
      dispatch(updateCurrentCard({ animate }))
    },
    setPosition (position) {
      dispatch(updateCurrentCard({ position }))
    },
    setInitialPosition (initialPosition) {
      dispatch(updateCurrentCard({ initialPosition }))
    },
    setCardSize (size) {
      dispatch(updateCurrentCard({ size }))
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

      dispatch(resetCurrentCardPosition())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableCard)
