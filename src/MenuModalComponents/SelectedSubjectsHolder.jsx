import './SelectedSubjectsHolder.css'
import SelectedSubject from './SelectedSubject'

export default function SelectedSubjectsHolder(props){
    const selectedSubjects = props.selectedSubjects.map(
                                (selectedSubject) =>
                                    <SelectedSubject
                                        addOrRemoveSubject =
                                            { props.addOrRemoveSubject }
                                        subject = { selectedSubject }
                                    />
                            )
    return (
        <div className="selectedSubjectsHolder">{ selectedSubjects }</div>
    );
}
