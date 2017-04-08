import React from 'react'
import classnames from 'classnames'

export default function buttonMatrix (props) {
  const buttons = props.buttons.map(button => {
    const onMouseDown = () => props.onMouseDown(button.note)
    return (
      <button onMouseDown={onMouseDown} style={button.style} key={button.id} >
        <img src={button.src} />
      </button>
    )
  })
  const classes = classnames({
    ...props.classes
  })
  const style = {
    ...props.style,
    transform: `translateY(${props.translateY}px)`
  }
  return (
    <div style={style} className={classes}>
      {buttons}
    </div>
  )
}
