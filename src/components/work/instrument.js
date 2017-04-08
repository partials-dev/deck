import { connect } from 'react-redux'
import ButtonMatrix from '../look/button-matrix'
import { playNote } from '../../actions'
import showInstrumentTranslateAmount from './show-instrument-translate-amount'

const button = note => {
  const id = `rune-${note}`
  const style = {
    width: '87px',
    height: '87px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundImage: `url(${id}.jpg)`
  }
  return { id, style, note }
}

const mapStateToProps = state => {
  const translateAmount = showInstrumentTranslateAmount(state)
  const translateY = state.music.showInstrument ? 0 : -translateAmount
  return {
    buttons: [0, 1, 2].map(button),
    values: state.music.song,
    translateY,
    classes: {
      instrument: true,
      'transition-transform': true
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMouseDown (id) {
      dispatch(playNote(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonMatrix)
