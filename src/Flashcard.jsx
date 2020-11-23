// import React from 'react'
// import "./Flashcard.css"
//
// export default function Flashcard(props) {
//         return <div className = { props.isPortrait ?
//                                     "flashcardPortrait" : "flashcardLandscape"
//                               }>{props.cardContent}</div>;
// }
import React from 'react'
import "./Flashcard.css"

export default function Flashcard(props) {
        return <div className='flashcard'>{props.content}</div>;
}
