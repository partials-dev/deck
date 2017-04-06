import React from 'react'
import classnames from 'classnames'
import './card.css'

const Card = props => {
  const style = Object.assign({
    zIndex: props.index,
    backgroundImage: 'url("/' + props.image + '")',
    ...props.style
  })

  const classes = classnames({
    card: true,
    ...props.classes
  })

  return (
    <div ref={props.gotRef} style={style} className={classes}>
      <h1>{props.leanDirection}</h1>
    </div>
  )
}

export default Card
