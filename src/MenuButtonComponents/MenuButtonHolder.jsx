import "./MenuButtonHolder.css"
import Button from "./Button.jsx"

export default function MenuButtonHolder(props) {
    return <div className='menuButtonHolder'>
            <Button
                menuButton = {props.menuButton}
                title = {props.title}
                clickFunc = { props.clickFunc }
                content = { props.content }
                active = {props.active}
                />
          </div>
}
