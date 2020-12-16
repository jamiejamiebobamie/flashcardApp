import "./HelpMessage.css"

export default function HelpMessage(props){
    let content = <div className="wrapper"></div>
    if (props.point === "right"){
        content = <div className="wrapper right">
                        <div className="message">Swipe right to go back to last card.</div>
                        <div className="arrow arrowright">{"->"}</div>
                      </div>
    } else if (props.point === "left") {
        content = <div className="wrapper left">
                        <div className="arrow arrowleft">{"<-"}</div>
                        <div className="message">Swipe left to get next card.</div>
                      </div>
    } else if (props.point === "up") {
        content = <div className="wrapper up">
                        <div className="arrow arrowup">{"<-"}</div>
                        <div className="message">Swipe up to remove card.</div>
                      </div>
    } else if (props.point === "down") {
        content = <div className="wrapper down">
                        <div className="message">Swipe down to shuffle card.</div>
                        <div className="arrow arrowdown">{"->"}</div>
                      </div>
    } else {
        content = <div className="wrapper menu">
                        <div className="message">Click the menu button when you are ready to start studying!</div>
                        <div className="arrow arrowdown">{"->"}</div>
                      </div>
    }
    return content;
}
