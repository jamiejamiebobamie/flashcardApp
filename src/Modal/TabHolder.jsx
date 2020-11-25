import "./TabHolder.css"
import AccordianTab from './AccordianTab.jsx'

export default function TabHolder(props){
    if (props.tabs){
        const tabs = props.tabs.map((tab) =>
                                    <AccordianTab
                                        key={tab.tabName}
                                        tabName={tab.tabName}
                                        content={tab.content}
                                        hash={""+tab.tabName}
                                        addOrRemoveSubject={props.addOrRemoveSubject}
                                        selectedSubjects={props.selectedSubjects}
                                    />
                                )
        return (
            <div className="tabHolder">
                {tabs}
            </div>
        );
    }
}
