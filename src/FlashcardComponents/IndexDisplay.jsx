import React from 'react';
import './IndexDisplay.css'

export default function IndexDisplay(props){
     const content = props.length > 0 ?
                     <h5 className='index'>
                               {props.currentIndex}
                               /
                               {props.length}
                      </h5>
                     :
                     null
      return content;
}
// style={{opacity:props.isMobile?.3:.3}}
