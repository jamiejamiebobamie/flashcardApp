import "./ButtonGrouping.css"
import Button from "./Button.jsx"

// two buttons per group
export default function ButtonGrouping(props) {
    let index = 0
        const buttons = props.buttons.map(
                                (button)=>
                                    <Button
                                        moreThanTwoButtonsInGroup= { props.buttons.length>2 }
                                        key= { index++ }
                                        title = {button.title}
                                        clickFunc = { button.clickFunc }
                                        content = { button.content }
                                        active = {button.active}
                                        />
                                )
    return <div className = {
                        buttons.length <= 2
                                ?
                                "buttonGroupingTwoOrLess"
                                :
                                "buttonGroupingThreeOrMore"
                            }>
            { buttons }
          </div>
}
