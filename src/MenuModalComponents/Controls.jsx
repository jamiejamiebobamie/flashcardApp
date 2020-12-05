import "./Controls.css"
import Button from "../Button.jsx"

export default function Controls(props){

    const buttonsToShow =  props.menuModalDisplay === 'flex' ?
            <div className="controls" >
                    <Button
                        clickFunc = { props.functions.toggleDarkOrLightMode }
                         title = "Light Mode"
                         content = { 0x2600 }
                         active = { !props.isDarkMode }

                    />
                    <Button
                        clickFunc = { props.functions.toggleDarkOrLightMode }
                         title = "Dark Mode"
                         content = { 0x263E }
                         active = { props.isDarkMode }

                    />
                    <Button
                        clickFunc = { props.functions.shuffleAllCards }
                         title = "Shuffle All"
                         content = { 0x21bb }
                    />
                    <Button
                        className='menuButton'
                         title = "Select Cards"
                         clickFunc = { props.functions.toggleMenuModal }
                         content = { 0x2630 }
                         active = { props.menuModalDisplay === 'flex' }
                    />
            </div>
            :
            <Button
                className='menuButtonAlone'
                 title = "Select Cards"
                 clickFunc = { props.functions.toggleMenuModal }
                 content = { 0x2630 }
                 active = { props.menuModalDisplay === 'flex' }
            />

    return buttonsToShow;
}
