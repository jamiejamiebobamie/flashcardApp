import "./FlashcardHolder.css"
import Card from "./Card"

import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';

import Button from './Button';
import './Button.css';

export default function FlashcardHolder(props) {
    const content = props.cardContent ?
        <Card
            front = { props.cardContent.front }
            back = { props.cardContent.back }
            Domain = { props.stats.length ?
                            props.cardContent.Domain
                            :
                            null
                        }
            Subdomain = { props.stats.length ?
                            props.cardContent.Subdomain
                            :
                            null
                        }
            Topic = { props.stats.length ?
                            props.cardContent.Topic
                            :
                            null
                        }
            onReleaseFunction = { (dir) => {
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
                                props.functions.shuffleCards()
                            }else if (y<0){
                                console.log('remove this card')
                                props.functions.removeCard()
                            }
                        }
                    }
                }
        />
        :
        null
    const controls = props.stats.length ?
            <div
                style = {{ display:'flex',
                           alignSelf:'center',
                           margin:'10px',
                           justifyContent:'space-around',
                           width:'300px'
                        }}>
                            <Button
                                content={0x2190}
                                title={'Last Card'}
                                clickFunc={props.functions.decrementCardIndex}
                            />
                            <IndexDisplay
                                currentIndex={props.stats.currentIndex+1}
                                length={props.stats.length}
                            />
                            <Button
                                content={0x2192}
                                title={'Next Card'}
                                clickFunc={props.functions.incrementCardIndex}
                            />
            </div>
            :
            null
    return <div className='flashcardHolder'>
                { content }
                { controls }
          </div>
}
