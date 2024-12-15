// import React, { useEffect } from 'react'; 
import './Modal.css';
import TabHolder from './TabHolder.jsx';
import SelectedSubjectsHolder from './SelectedSubjectsHolder';

export default function Modal(props){

    const menuContent =
        // https://loading.io/css/
        !props.tabs.length?
        <div className="modal" style= {{ display: props.menuModalDisplay }}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        :
        props.isMobile ?
        <div className="modal" style= {{ display: props.menuModalDisplay }}>
            <TabHolder
                selectedSubjects = { props.selectedSubjects }
                tabs = { props.tabs }
                addOrRemoveSubject = { props.functions.addOrRemoveSubject }/>
        </div>
        :
        <div className="modal" style= {{ display: props.menuModalDisplay }}>
            <TabHolder
                selectedSubjects = { props.selectedSubjects }
                tabs = { props.tabs }
                addOrRemoveSubject = { props.functions.addOrRemoveSubject }/>
            <SelectedSubjectsHolder
                selectedSubjects = { props.selectedSubjects }
                addOrRemoveSubject = { props.functions.addOrRemoveSubject }/>
        </div>

    return menuContent
}
