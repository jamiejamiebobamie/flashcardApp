import React from 'react';
import './IndexDisplay.css'

export default function IndexDisplay(props){
      return <h5 className='index'>
                {props.currentIndex}
                /
                {props.length}
            </h5>
}
