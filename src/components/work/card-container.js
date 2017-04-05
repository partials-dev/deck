import { connect } from 'react-redux'
import Card from '../look/card'

const mapStateToProps = (state, props) => {
  return {
    initialPosition: state.cards.byId[props.id]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInitialPosition () {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
