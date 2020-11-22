import "./TabHolder.css"
import AccordianTab from './AccordianTab.jsx'

export default function TabHolder(props){
    // key={tab.tabName}
    let index = 0;
    if (props.tabs){
        const tabs = props.tabs.map((tab) =>
                                    <AccordianTab
                                        key={tab.tabName}
                                        tabName={tab.tabName}
                                        content={tab.content}
                                        hash={""+tab.tabName}
                                        clickFunc={props.clickFunc}
                                        />
                                )
        return (

            <div className="tabHolder">
                {tabs}
            </div>
        );
    }
}
