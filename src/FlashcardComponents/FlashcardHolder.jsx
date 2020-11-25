import { useState } from 'react'

import "./FlashcardHolder.css"

import Card from "./Card"

import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';

import Button from '../MenuButtonComponents/Button';
import '../MenuButtonComponents/Button.css';

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
            front = { blankCardContent }
            back = { blankCardContent }
            Domain = { null }
            Subdomain = { null }
            Topic = { null }
            onReleaseFunction = { (dir) => { } }
        />
    const backgroundMessage = calledFunction ?
          <div className='backgroundMessage' >{calledFunction}</div>
                           :
                           null
    const controls = props.stats.length ?
                        props.isMobile ?
                        <IndexDisplay
                            currentIndex={props.stats.currentIndex+1}
                            length={props.stats.length}
                        />
                        :
                        <div className='controls'>
                                        <Button
                                            content={0x2190}
                                            title={'Last Card'}
                                            clickFunc={props.functions.decrementCardIndex}
                                        />
                                        <IndexDisplay
                                            isMobile={props.isMobile}
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
