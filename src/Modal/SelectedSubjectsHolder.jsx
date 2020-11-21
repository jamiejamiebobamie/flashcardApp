import './SelectedSubjectsHolder.css'
import SelectedSubject from './SelectedSubject'

export default function SelectedSubjectsHolder(props){

    const selectedSubjects = props.selectedSubjects.map( (selectedSubject)=>
                                            <SelectedSubject
                                                clickFunc= {props.clickFunc}
                                                subject= {selectedSubject}
                                            />
                                        )
    return (
        <div className="selectedSubjectsHolder">
            {selectedSubjects}
        </div>
    );
}
