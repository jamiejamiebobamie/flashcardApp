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
        return <div>
                    <div>
                        {props.content.Domain ? props.content.Domain+" --- "+props.content.Subdomain+" --- "+props.content.Topic
                        :
                        null
                        }
                    </div>
                <div className='flashcard'>
                    {props.content.front}
                </div>
        </div>;
}
