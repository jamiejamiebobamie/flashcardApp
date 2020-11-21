import "./ButtonGrouping.css"
import Button from "./Button.jsx"

// two buttons per group
export default function ButtonGrouping(props) {
    let index = 0
    const buttons = props.buttons.map(
                            (button)=>
                                <Button
                                    key= { index++ }
                                    clickFunc = { button.clickFunc }
                                    content = { button.content } />
                            )
    // styling won't work for buttons more than 2...
    return <div className ="buttonGrouping">
            {buttons}
          </div>
}
