// https://codesandbox.io/embed/01yl7knw70
// https://codesandbox.io/embed/j0y0vpz59

import React, { useState } from 'react'
import { useSpring, animated as a, config } from 'react-spring'
import { useGesture  } from 'react-use-gesture'

import './Card.css'

export default function Card(props) {
  const [flipped, setFlip] = useState(false)
  const [dragFunctionCalled, setDragFunctionCalled] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(75vw) rotateY(${flipped ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
      onDrag: ({down, movement: [mx, my], velocity})=>{
          set({ x: down ? mx : 0, y: down ? my : 0 })
      },
      onDragEnd: ({ down, delta: [xDelta,yDelta], distance, direction: [xDir,yDir], velocity }) => {
          const trigger = velocity > .5 // If you flick hard enough it should trigger the card to fly out
          const dir = {x:Math.abs(xDir) > Math.abs(yDir)?Math.round(xDir):0,y:Math.abs(xDir) > Math.abs(yDir)?0:Math.round(yDir)}
          const x = trigger ? (200 + window.innerWidth) * dir.x : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
          const y = trigger ? (200 + window.innerHeight) * dir.y : down ? yDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
          set({ x: x, y: y })
          if (props.onReleaseFunction && trigger){
              props.onReleaseFunction(dir)
              setDragFunctionCalled(true)
          }
      },
    }, config)

  return (
    <a.div
        className="Card"
        onMouseUp= { () => {
                dragFunctionCalled ?
                    setDragFunctionCalled(false)
                    :
                    setFlip(!flipped)
                } }
        {...bind()}
        style={{ x, y }}
        >
      <a.div className="c" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
        <p className="label">{props.Domain} {props.Subdomain} {props.Topic}</p>
        <p className="content">{props.front}</p>
      </a.div>
      <a.div className="c" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <p className="label">{props.Domain} {props.Subdomain} {props.Topic}</p>
        <p className="content">{props.back}</p>
      </a.div>
    </a.div>
  )
}
