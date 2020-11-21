import { React, useState } from 'react';
import "./AccordianTab.css"

export default function AccordianTab(props){
    const [accordianDisplay, togglePanel] = useState('hidePanel');
    let displayContent;
    let index = 0;

    if (props.content){
        displayContent = props.content.length>0 ?
                            props.content.map(
                                (anotherTab) =>
                                    <AccordianTab
                                        // just for testing.
                                        key={index++}
                                        // key={anotherTab.tabName}
                                        hash={props.hash+"*"+anotherTab.tabName}
                                        tabName={anotherTab.tabName}
                                        content={anotherTab.content}
                                        clickFunc={props.clickFunc}
                                        />)
                                        :
                                        null
    }
    return (
        <button
            // nested tabs go from domain > subdomain > topic
            onClick = { !props.content ?
                (e) => {
                    // if topic:
                        // open the tab to show "Added!" message
                        // and add the topic to the list of selected subjects.
                    props.clickFunc(props.hash);
                    e.stopPropagation(); }
                :
                (e) => {
                    // if domain or subdomain:
                        // open the tab to show the next level.
                    e.stopPropagation();
                    togglePanel( accordianDisplay === 'hidePanel' ?
                                    'showPanel' : 'hidePanel' ); }
                      }
            className = "accordion">
                {props.tabName}
            <p className= {accordianDisplay}>
                {displayContent}
            </p>
        </button>
    );
}
