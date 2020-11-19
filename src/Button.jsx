import "./Button.css"

export default function Button(props) {
  return (
          <button
            className= {
                    props.isMobile ?
                        props.isPortrait ?
                            "buttonMobilePortrait" : "buttonMobileLandscape"
                    :
                        props.isPortrait ?
                            "buttonDesktopPortrait" : "buttonDesktopLandscape"
                        }
            onClick={props.onClick}>
            {props.content}
          </button>
         )
}
