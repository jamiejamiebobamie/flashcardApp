import "./Button.css"

export default function Button(props) {
  let active = props.active ? ' active' : ''
  return <button
            title= { props.title }
            className= { "button" + active }
            onClick={ props.clickFunc }>
            { String.fromCharCode(props.content) }
          </button>
}
