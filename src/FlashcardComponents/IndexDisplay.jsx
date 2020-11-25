import React from 'react';
import './IndexDisplay.css'

export default function IndexDisplay(props){
      return <h5 className='index' style={{marginLeft:'5vw',alignSelf:'flex-start',opacity:props.isMobile?.3:1}}>
                {props.currentIndex}
                /
                {props.length}
            </h5>
}
