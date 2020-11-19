import React from 'react';
import IndexDisplay from './IndexDisplay';
import './IndexDisplay.css';

export default function CardNumbers(props) {
      return(
          <div>
              <IndexDisplay
                  currentIndex = { props.stats[0].currentIndex }
                  length = { props.stats[0].length }
                  classNameForStyle = { props.isMobile ?
                      "mobileBottomLeft" : "desktopBottomLeft"
                    } />
              <IndexDisplay
                  currentIndex = { props.stats[1].currentIndex }
                  length = { props.stats[1].length }
                  classNameForStyle = { props.isMobile ?
                      "mobileBottomRight" : "desktopBottomRight"
                    } />
          </div>
      )
  }
