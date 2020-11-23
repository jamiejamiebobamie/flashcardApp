import "./FlashcardHolder.css"
import Flashcard from "./Flashcard.jsx"

// two buttons per group
export default function FlashcardHolder(props) {
    return <div className='flashcardHolder'>
                <Flashcard
                    content = {props.content}
                />
          </div>
}
//
// <div style={{display:"flex",backgroundColor:"#0a161b",height:"70%",marginBottom:"1vh",width:"90%",marginLeft:"10%",color:'#9ba3a5',justifyContent:'center'}}>
//     <p style={{alignSelf:'center',fontSize:'20px'}}>
//         { this.state.cards.length ?
//             this.state.cards[this.state.cardIndex].front
//             :
//             'Click on the menu button below to select subjects to study.'
//         }
//     </p>
// </div>
