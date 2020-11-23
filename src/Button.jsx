import { React, useState } from 'react';
import "./Button.css"

// button should use setActive only if true/false is being passed in for
    // props.active otherwise it's just a one-click button (incrementCardIndex)
    // and not a button that controls a constant state (dark mode)
export default function Button(props) {

  let active = '';
  if (props.active !== undefined)
        active = props.active ?
              ' active'
              :
              ""
  return (
          <button
            title={props.title}
            className= {
                props.menuButton ?
                    "menuButton" + active
                    :
                    props.moreThanTwoButtonsInGroup ?
                        "largeButtonGroup" + active : "button" + active
                }
            onClick={
                        () => {
                            props.clickFunc();
                            // if (props.active !== undefined)
                            // setActive(
                            //     active === " active" ?
                            //         ""
                            //         :
                            //         " active"
                            // )
                        }
                    }>
            {String.fromCharCode(props.content)}
          </button>
         )
}
