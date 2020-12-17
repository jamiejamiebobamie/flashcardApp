import "./HelpMessage.css"

export default function HelpMessage(props){
    let content = <div className="wrapper"></div>
        if (props.messageType === "right"){
            content = <div className="wrapper right">
                            <div className="message">swipe right to go back to last card</div>
                            <div className="arrow arrowright">&#8594;</div>
                          </div>
        } else if (props.messageType === "left") {
            content = <div className="wrapper left">
                            <div className="arrow arrowleft">&#8592;</div>
                            <div className="message">swipe left to get next card</div>
                          </div>
        } else if (props.messageType === "up") {
            content = <div className="wrapper up">
                            <div className="arrow arrowup">&#8593;</div>
                            <div className="message">swipe up to remove card</div>
                          </div>
        } else if (props.messageType === "down") {
            content = <div className="wrapper down">
                            <div className="message">swipe down to shuffle card</div>
                            <div className="arrow arrowdown">&#8595;</div>
                          </div>
        } else if (props.messageType === "menu") {
            content = <div className="wrapper menu">
                            <div className="message">Click the menu button when you are ready to start studying!</div>
                            <div className="arrow arrowright">&#8594;</div>
                          </div>
        } else if (props.messageType === "card") {
            content = <div className="wrapper">
                            <div className="message card">click card to flip</div>
                          </div>
        }
    return content;
}
