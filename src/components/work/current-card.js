import { connect } from 'react-redux'
import DraggableCard from '../look/draggable-card'
import { updateCurrentCard } from '../../actions'

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableCard)
