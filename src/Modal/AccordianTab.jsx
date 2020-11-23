import { React, useState } from 'react';
import "./AccordianTab.css"

export default function AccordianTab(props){
    const [panelClassName, togglePanel] = useState('hidePanel');
    let displayContent;

    if (props.content){
        displayContent = props.content.map(
                                (anotherTab) =>
                                    <AccordianTab
                                        key={anotherTab.tabName}
                                        hash={props.hash+"*"+anotherTab.tabName}
                                        tabName={anotherTab.tabName}
                                        content={anotherTab.content}
                                        clickFunc={props.clickFunc}
                                        selectedSubjects={props.selectedSubjects}
                                        />)
    }
    return (
        <button
            // nested tabs go from domain > subdomain > topic
            onClick = {
                !props.content ?
                            (e) => {
                                // if topic:
                                    // add the topic to the list of selected
                                    // subjects.
                                props.clickFunc(props.hash);
                                e.stopPropagation();
                                togglePanel( panelClassName === 'hidePanel' ?
                                                'showPanel' : 'hidePanel' );
                    }

                            :
                            (e) => {
                                // if domain or subdomain:
                                    // open the tab to show the next level.
                                e.stopPropagation();
                                togglePanel( panelClassName === 'hidePanel' ?
                                                'showPanel' : 'hidePanel' );
                            }
                        }
            className = { props.selectedSubjects.includes(props.hash) ? 'accordionActive' : 'accordionInactive' }>
                {props.tabName}
            {/* Topics do not contain content and should not display their
                panels, otherwise show panel depending on state
                (changed  by onClick).*/}
            <p className= {props.content ? panelClassName : 'hidePanel' }>
                 {displayContent}
            </p>
        </button>
    );
}
