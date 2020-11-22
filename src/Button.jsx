import "./Button.css"

export default function Button(props) {
  return (
          <button
            title={props.title}
            className= { props.menuButton ?
                    "menuButton"
                    :
                    props.moreThanTwoButtonsInGroup ?
                        "largeButtonGroup" : "button"
                }
            onClick={props.clickFunc}>
            {String.fromCharCode(props.content)}
          </button>
         )
}
// String.fromCharCode(0x2296)//"-"
// String.fromCharCode(props.content)
// {String.fromCharCode(0x2296)}
