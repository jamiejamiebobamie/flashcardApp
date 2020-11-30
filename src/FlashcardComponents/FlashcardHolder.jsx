import { useState } from 'react'

import "./FlashcardHolder.css"

import Card from "./Card"

import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';

import '../Button.css';

export default function FlashcardHolder(props) {
    const [calledFunction,setBackgroundMessage] = useState(null)
    const showMessage = (message) => {
        setTimeout(()=>{setBackgroundMessage(message)},100)
        setTimeout(()=>{setBackgroundMessage(null)},1000)
    }
    const blankCardContent =
        'Click on the menu button below to select subjects to study.'
    const card = props.cardContent ?
        <Card
            isMobile = {props.isMobile}
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
        <Card
            isMobile = { props.isMobile }
            front = { blankCardContent }
            back = { blankCardContent }
            Domain = { null }
            Subdomain = { null }
            Topic = { null }
            onReleaseFunction = { (dir) => { } }
        />
    const backgroundMessage = calledFunction ?
          <div className='backgroundMessage'>{ calledFunction }</div>
                           :
                           null
    return <div className='flashcardHolder'>
                { card }
                { backgroundMessage }
                <IndexDisplay
                    currentIndex = { props.stats.currentIndex + 1 }
                    length = { props.stats.length }
                />
          </div>
}
