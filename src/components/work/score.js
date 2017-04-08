import { connect } from 'react-redux'
import Template from '../look/template'

const mapStateToProps = state => {
  return {
    placeholders: state.music.score,
    values: state.music.song
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Template)
