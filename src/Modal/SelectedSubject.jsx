import './SelectedSubject.css'

export default function SelectedSubject(props){
    const buttonLabel = props.subject.split("*").splice(1,2).join(" ")
    return (
        <button className="selectedSubject"
        onClick={()=>props.addOrRemoveSubject(props.subject)}
        >
            {buttonLabel}
        </button>
    );
}
