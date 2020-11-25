import TabHolder from './TabHolder.jsx';
import SelectedSubjectsHolder from './SelectedSubjectsHolder';
import Controls from './Controls';

import './Modal.css';

export default function Modal(props){
    return (
        <div className="modal" style={{display:props.menuModalDisplay}}>
            <TabHolder selectedSubjects={props.selectedSubjects} tabs={props.tabs} addOrRemoveSubject={props.addOrRemoveSubject}/>
            <SelectedSubjectsHolder selectedSubjects={props.selectedSubjects} addOrRemoveSubject={props.addOrRemoveSubject}/>
        </div>
    );
}
// <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
//
// <Controls
//     toggleDarkAndLightMode={props.toggleDarkAndLightMode}
// />
// </div>
