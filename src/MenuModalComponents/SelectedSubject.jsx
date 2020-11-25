import './SelectedSubject.css'

export default function SelectedSubject(props){
    // take the Subdomain and the Topic of: "Domain*Subdomain*Topic"
    const buttonLabel = props.subject.split("*").splice(1,2).join(" ")
    return (
        <button className = "selectedSubject"
                onClick = { () => props.addOrRemoveSubject(props.subject) }>
            { buttonLabel }
        </button>
    );
}
