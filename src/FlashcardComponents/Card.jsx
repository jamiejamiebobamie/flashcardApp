// https://codesandbox.io/embed/01yl7knw70
// https://codesandbox.io/embed/j0y0vpz59

import React, { useState } from 'react'
import { useSpring, animated as a, config } from 'react-spring'
import { useGesture  } from 'react-use-gesture'

import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';



import './Card.css'

export default function Card(props) {
  // show front / back of card state.
  const [flipped, setFlip] = useState(false)

  const [dragFunctionCalled, setDragFunctionCalled] = useState(false)
  const [entireCardOpacity, setCardOpacity] = useState(1)

  // x,y position of card state. spring controls interpolation of values.
  // const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const [{ xy }, set] = useSpring(() => ({ xy: [0 , 0] }))


  // controls onClick card spin and opacity of card content.
  const {transform, opacity} = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(75vw) rotateY(${flipped ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  const bind = useGesture({
      // controls drag of card from position.
      onDrag: ({down, movement, velocity})=>{
          set({ xy: down ? movement : [0,0] })
      },
      // controls if card is thrown.
      onDragEnd: ({ down, delta: [xDelta,yDelta],
                    distance, direction: [xDir,yDir], velocity }) => {
          // If you flick hard enough it should trigger the card to fly out
          const trigger = velocity > .2
          const dir = {
                        x: Math.abs(xDir) > Math.abs(yDir) ?
                                                    Math.round(xDir)
                                                    :
                                                    0,
                        y: Math.abs(xDir) > Math.abs(yDir) ?
                                                    0
                                                    :
                                                    Math.round(yDir)
                      }
          const x = trigger ?
                    (200 + window.innerWidth) * dir.x
                    :
                    down ? xDelta : 0
          const y = trigger ?
                    (200 + window.innerHeight) * dir.y
                    :
                    down ? yDelta : 0
          // set({ x: x, y: y })
          set({ xy: [x,y] })
          if (props.onReleaseFunction && trigger){
              // no matter the function called,
                  // display the card front-facing
              if (flipped)
                setFlip(false)
              // call the appropriate function depending on direction flicked.
              props.onReleaseFunction(dir)
              // stops the card from flipping onMouseUp.
              setDragFunctionCalled(true)
              setTimeout(()=>{
                  // make the card invisible and bring it to the opposite side
                  // of the screen to come in from offscreen
                  setCardOpacity(0)
                  set({ xy: [dir.x*-3000,dir.y*-3000] })

                  // set({ x: dir.x*-3000, y: dir.y*-3000 })

                  // make the card visible and bring it back on screen
                    // from the opposite direction from which it was thrown.
                  setTimeout(()=>{
                      setCardOpacity(1)
                      set({ xy: [0,0] })},500)
                      // toggle-off swipe help messages
                      props.toggleOffSwipeHelpMessages()
              },500)
          }
      },
    }, config)
  const index = <IndexDisplay
                    currentIndex = { props.currentIndex + 1 }
                    length = { props.length }
                />
  return (
    <a.div
        className="Card"
        onMouseUp= { () => {
                dragFunctionCalled ?
                    setDragFunctionCalled(false)
                    :
                    props.toggleOffClickHelpMessage()
                    setFlip(!flipped)
                } }
        {...bind()}
        style={{ opacity: entireCardOpacity,
            transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`)
        }}>
          <a.div
                className="c"
                 style={{ opacity,
                          transform:
                            transform.interpolate(t => `${t} rotateY(180deg)`)
            }}>
              <div className="label">
                  <p>{props.Domain} {props.Subdomain} {props.Topic}</p>
                  <p>front</p>
              </div>
              <p className="content">{props.front}</p>
              { index }
          </a.div>
          <a.div className="c"
                  style={{ opacity: opacity.interpolate(o => 1 - o), transform:
                           transform
           }}>
              <div className="label">
                  <p>{props.Domain} {props.Subdomain} {props.Topic}</p>
                  <p>back</p>
              </div>
              <p className="content">{props.back}</p>
              { index }
          </a.div>
    </a.div>
  )
}
