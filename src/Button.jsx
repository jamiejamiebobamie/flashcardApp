import "./Button.css"
import { useSpring, animated as a } from 'react-spring'
import { useState } from 'react'
;

export default function Button(props) {
    const [state, toggle] = useState(false)

    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
    let active = props.active ? ' active' : ''
  return <a.button
            title= { props.title }
            className= { props.className ?
                                props.className + active
                                :
                                "button" + active }
            onClick={ () => {
                        props.clickFunc();
                        toggle(!state);
                    }
                }
            onMouseOver={ () => {
                        toggle(!state);
                    }
                }
            style={{
              transform: x
                .interpolate({
                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                    }).interpolate(x => `scale(${x})`)
              }}>
                { String.fromCharCode(props.content) }
          </a.button>
}
