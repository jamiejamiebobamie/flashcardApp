import React from 'react';
import './IndexDisplay.css'

export default function IndexDisplay(props){
      return <h5 className={props.classNameForStyle}>
                {props.currentIndex}
                /
                {props.length}
            </h5>
}
