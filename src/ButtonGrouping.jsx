import "./ButtonGrouping.css"
import Button from "./Button.jsx"

// two buttons per group
export default function ButtonGrouping(props) {
    return <div className =
                { props.isPortrait ?
                    "buttonGroupingPortrait" : "buttonGroupingLandscape"
                } >
                <Button
                    isPortrait = {props.isPortrait }
                    isMobile = { props.isMobile }
                    onClick = { props.buttons[0].onClick }
                    content = { props.buttons[0].content } />
                <Button
                    isPortrait = {props.isPortrait }
                    isMobile = { props.isMobile }
                    onClick = { props.buttons[1].onClick }
                    content = { props.buttons[1].content } />
          </div>
}
