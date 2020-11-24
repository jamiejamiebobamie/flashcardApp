import "./FlashcardHolder.css"
import Flashcard from "./Flashcard.jsx"
import Card from "./Card"


// two buttons per group
export default function FlashcardHolder(props) {
    return <div className='flashcardHolder'>
                <Card
                front={props.content.front}
                back={props.content.back}
                Domain={props.content.Domain}
                Subdomain={props.content.Subdomain}
                Topic={props.content.Topic}
                onReleaseFunction={(dir)=>{
                    const {x,y} = dir
                    if (x){
                        if (x>0){
                            console.log('decrement card index')
                            props.functions.decrementCardIndex()
                        }else if (x<0){
                            console.log('increment card index')
                            props.functions.incrementCardIndex()
                        }
                    }else if (y){
                        if (y>0){
                            console.log('shuffle this card only')
                            // functions.
                            props.functions.shuffleCards()
                        }else if (y<0){
                            console.log('remove this card')
                            // functions.
                            props.functions.removeCard()
                        }
                    }
                }}
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
