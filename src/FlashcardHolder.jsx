import {useState} from 'react'

import "./FlashcardHolder.css"
import Card from "./Card"

import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';

import Button from './Button';
import './Button.css';

export default function FlashcardHolder(props) {
    const [calledFunction,setBackgroundMessage] = useState(null)
    const showMessage = (message) => {
        setTimeout(()=>{setBackgroundMessage(message)},100)
        setTimeout(()=>{setBackgroundMessage(null)},1000)
    }
    const card = props.cardContent ?
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
                                props.functions.decrementCardIndex()
                                showMessage("PREVIOUS")
                            }else if (x<0){
                                props.functions.incrementCardIndex()
                                showMessage("NEXT")
                            }
                        } else if (y){
                            if (y>0){
                                props.functions.shuffleCards()
                                showMessage("SHUFFLE")
                            }else if (y<0){
                                props.functions.removeCard()
                                showMessage("REMOVE")
                            }
                        }
                    }
                }
        />
        :
        null
    const backgroundMessage = calledFunction ?
          <div style = {{ position:'absolute',
                           zIndex:'0',
                           fontSize:'40px',
                           display:'flex',
                           alignSelf:'center',
                           marginTop:'-5vh',
                           marginBottom:'auto',
                           verticalAlign:'text-top'}}>{calledFunction}</div>
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
                { card }
                { backgroundMessage }
                { controls }
          </div>
}
