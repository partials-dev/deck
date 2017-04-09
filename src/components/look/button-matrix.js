import React from 'react'
import classnames from 'classnames'

export default function buttonMatrix (props) {
  const buttons = props.buttons.map(button => {
    const offsets = [{
      top: '239px',
      left: '168px'
    }, {
      top: '274px',
      left: '250px'
    }, {
      top: '233px',
      left: '250px'
    }]

    const style = {
      ...button.style,
      ...offsets[button.note],
      width: '40px',
      height: '40px',
      background: 'transparent',
      position: 'absolute'
    }

    const onMouseDown = () => props.onMouseDown(button.note)
    return (
      <button onMouseDown={onMouseDown} style={style} key={button.id} >
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
