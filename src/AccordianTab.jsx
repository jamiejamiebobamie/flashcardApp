import React from 'react';
import "./AccordianTab.css"

export default class AccordianTab extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                        accordianDisplay:'hidePanel',
                        tabName:props.tabName,
                        content:props.content,
                        zIndex:props.zIndex?props.zIndex:1,
                    }
        this.togglePanel = this.togglePanel.bind(this);
    }
    togglePanel(){
        if ( this.state.accordianDisplay === 'hidePanel' ){
            this.setState({ accordianDisplay: 'showPanel' })
        } else {
            this.setState({ accordianDisplay: 'hidePanel' })
        }
    }
    // stops accordian buttons from closing
        //when their children get clicked.
    // https://stackoverflow.com/questions/24469602/how-to-prevent-accordion-from-toggling-when-button-in-header-is-clicked
    stopProp(e){ e.stopPropagation(); }
    render(){
        let content = this.state.content
        let displayContent
        if (content){
            displayContent = content.length > 0 ?
                                this.state.content.map((anotherTab) =>
                                        <AccordianTab
                                            key={anotherTab.tabName}
                                            tabName={anotherTab.tabName}
                                            content={anotherTab.content}
                                            />
                                    )
                                    : <div>{content[0].tabName}</div>
        } else {
            displayContent = null
        }
        return (
            <button
                onClick = { (e) => { this.stopProp(e); this.togglePanel() } }
                className = "accordion">
                    {this.state.tabName}
                <p className= {this.state.accordianDisplay}>
                    {displayContent}
                </p>
            </button>
        );
    }
}
