import TabHolder from './TabHolder.jsx';
import SelectedSubjectsHolder from './SelectedSubjectsHolder';
import './Modal.css';

export default function Modal(props){
    return (
        <div className="modal" style={{display:props.menuModalDisplay}}>
            <TabHolder selectedSubjects={props.selectedSubjects} tabs={props.tabs} clickFunc={props.clickFunc}/>
            <SelectedSubjectsHolder selectedSubjects={props.selectedSubjects} clickFunc={props.clickFunc}/>
        </div>
    );
}
