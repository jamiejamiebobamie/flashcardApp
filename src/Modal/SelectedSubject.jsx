import './SelectedSubject.css'

export default function SelectedSubject(props){
    const buttonLabel = props.subject.split("*").splice(0,2).join(" ")
    return (
        <button className="selectedSubject"
        onClick={()=>props.clickFunc(props.subject)}
        >
            {buttonLabel}
        </button>
    );
}
