import './App.css';
import Flashcard from './Flashcard';
import CardNumbers from './CardNumbers';
import ButtonGrouping from './ButtonGrouping';
import isMobile  from "react-device-detect";
import Button from "./Button.jsx"
import IndexDisplay from './IndexDisplay';
import Switch from 'react-input-switch'
import AccordianTab from './AccordianTab.jsx'

import React from 'react';


/*
response: flashcards => a flashcard:

    {
        "domain" : "Programming languages",
        "subdomain" : "C++",
        "topic" : "operators",
        "front of card" : "arrow operator",
        "back of card" : "A means of accessing a class member from outside the
                            class.&#09;Automatically dereferences the pointer
                            variable that points to the class."
    }
    back of card may be composed of multiple terms separated by a TAB
        ascii / javascript character: &#09; or \t whichever is better (?)

    when the app first loads, it asks the backend for all of the domains,
        subdomains, and topics.

    create nested accordians.
    2 accordians, one nested within the other (domain > subdomain)

    when you click on a topic in the subdomain, it is added to your "cart" on
        the right.

    cart items show subdomain and topic.

    when you close the modal, the frontend looks at what you've selected,
    compares it with what you already have in your flashcard deck and
    asks the backend for the new / missing cards if there are any.

    maybe display a fetching / loading graphic if the flashcard deck
        is currently empty.

    buttons to implement:
        shuffle flashcards.
        remove current flashcard from deck.
        light / dark mode buttons
*/

class App extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
           cards:[
                    ["Pega is “Software That Writes","Your Software."],
                    ["A workspace is","an environment that provides specific tools and features. Pega four role-based workspaces, known as studios:","App Studio","Dev Studio","Prediction Studio","Admin Studio"],
                    ["What are microjourney interfaces?","where the data comes from/where it persists."],
                    ["fdffdf?","fdfdf"]
                  ],
           cardIndex:0,
           definitionIndex:1,
           windowWidth: window.innerWidth,
           windowHeight: window.innerHeight,
           isMobile: (window.innerWidth <= 420
                                       && window.innerHeight <= 750)
                                     ||
                                     (window.innerWidth <= 750
                                       && window.innerHeight <= 420),
           isPortrait: window.innerWidth < window.innerHeight,
           currentCardContent:"",
           darkMode:1,
           shouldDisplayMenuModal:true,
           menuModalDisplay:'flex',

        };
     this.handleResize = this.handleResize.bind(this);
     this.incrementCardIndex = this.incrementCardIndex.bind(this);
     this.decrementCardIndex = this.decrementCardIndex.bind(this);
     this.incrementDefinitionIndex = this.incrementDefinitionIndex.bind(this);
     this.decrementDefinitionIndex = this.decrementDefinitionIndex.bind(this);
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     }
     toggleMenuModal(){
         if (this.state.shouldDisplayMenuModal){
             this.setState({shouldDisplayMenuModal:false})
             this.setState({menuModalDisplay:'none'})
         } else {
             this.setState({shouldDisplayMenuModal:true})
             this.setState({menuModalDisplay:'flex'})
         }
     }
     incrementCardIndex(){
      if ( this.state.cardIndex < this.state.cards.length - 1){
          this.setState({ cardIndex: this.state.cardIndex+1 })
          this.setState({ definitionIndex: 1 })
      }
      setTimeout(()=>{this.updateTerms()},100)
  }
  decrementCardIndex(){
      if ( this.state.cardIndex > 0){
          this.setState({ cardIndex: this.state.cardIndex-1 })
          this.setState({ definitionIndex: 1 })
      }
      setTimeout(()=>{this.updateTerms()},100)

  }
  incrementDefinitionIndex(){
      if ( this.state.definitionIndex
              < this.state.cards[this.state.cardIndex].length ){
     this.setState({ definitionIndex: this.state.definitionIndex + 1 })
      }
      setTimeout(()=>{this.updateTerms()},100)
  }
  decrementDefinitionIndex(){
      if ( this.state.definitionIndex > 1 ){
          this.setState(
                          { definitionIndex:
                              this.state.definitionIndex - 1
                          }
                        )
      }
      setTimeout(()=>{this.updateTerms()},100)
  }
  updateTerms(){
          let terms = []
          let fontSize, color, term, termStyle
          fontSize = this.state.isMobile ?
                        this.state.isPortrait ?
                                "10vw" : "7vw"
                                    : this.state.isPortrait ? "7vw": "3vw";
          for (let i = 0; i < this.state.definitionIndex;i++){
              color = i%2?"grey":"darkGrey";
              termStyle = {
                          marginTop:"1vh",
                          backgroundColor:color,
                          fontSize:fontSize,
                          paddingLeft:"3vw",
                          paddingRight:"3vw",
                          color:"white",
                      }
              term = <h3 key={i} style={termStyle}>
                          { this.state.cards[this.state.cardIndex][i] }
                     </h3>
              terms.push(term)
      }
      this.setState({ currentCardContent : terms })
  }
    handleResize(e){
     this.setState({ windowWidth: window.innerWidth });
     this.setState({ windowHeight: window.innerHeight });
     this.setState({ isMobile: (window.innerWidth <= 420
                                 && window.innerHeight <= 750)
                               ||
                               (window.innerWidth <= 750
                                 && window.innerHeight <= 420)
                             });
     this.setState({ isPortrait: window.innerWidth <
                                    window.innerHeight });
    this.updateTerms()
    };
    componentDidMount() {
     window.addEventListener("resize", this.handleResize);
     this.updateTerms()
    }
    componentWillUnmount() {
     window.addEventListener("resize", this.handleResize);
    }
    render(){
        let menuModalDisplay = this.state.menuModalDisplay
        let appContent = this.state.isMobile ?
            this.state.isPortrait ?
            <div className="AppPortraitMobile">

            </div>
            :
            <div className="AppLandscapeMobile">

            </div>
        :
        <div className="AppDesktop">
            <div style={{position:"absolute",display:"flex",display:menuModalDisplay,backgroundColor:"#0a161b",top:"5vh",left:"6vw",width:"83vw",height:"90vh",zIndex:'1',overflow:'scroll',opacity:'.9',justifyContent:'left',minHeight:"300px"}}>
                <div style={{backgroundColor:"blue",flexDirection:"column",height:"61.5vh",width:"54vw",overflow:"scroll"}}>
                    < AccordianTab
                        tabName={"lol"}
                        content={ [  { tabName:"red",
                                            content: [
                                                    {tabName:"red"},
                                                    {tabName:"blue",
                                                     content:  [
                                                                {tabName:"red"},
                                                                {tabName:"blue"},
                                                                {tabName:"green"}
                                                                ]
                                                    },
                                                    {tabName:"green"}
                                                    ]
                                        }
                                    ] }
                     />
                    < AccordianTab tabName={"lol"} content={[{tabName:"red",content:[{tabName:"hi"}]},{tabName:"blue"},{tabName:"green"}]} />
                    < AccordianTab tabName={"lol"} content={[{tabName:"red"},{tabName:"blue"},{tabName:"green"}]} />

                </div>
                <div style={{backgroundColor:"red",flexDirection:"column",marginLeft:"1vw",height:"90vh",width:"28vw",overflow:"scroll"}}></div>
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"90vh",width:"60vw",marginTop:"5vh",minHeight:"300px"}}>
                <div style={{display:"flex",backgroundColor:"#0a161b",height:"70%",marginBottom:"1vh",width:"90%",marginLeft:"10%"}}></div>
                <div style={{display:"flex",color:"#9ba3a5",justifyContent:"center",backgroundColor:"#0a161b",height:"30%",marginTop:"1vh",width:"90%",marginLeft:"10%"}}>
                    <button
                        onClick = {this.toggleMenuModal}
                        style={{position:"absolute",zIndex:"1",textAlign:"center",backgroundColor:"transparent",color:"#9ba3a5",minHeight:"70px",minWidth:"70px",width:"5vw",height:"5vw",borderRadius:"1vw",alignSelf:"center",fontSize:"3em",borderStyle:"none"}}>
                        &#9776;
                    </button>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"40vw",marginTop:"5vh",minHeight:"333px"}}>
                <div style={{display:"flex",backgroundColor:"#1E2C34",flexDirection:"column",height:"90%",width:"70%",justifyContent:"center",marginLeft:"1vw"}}>
                    <div style={{display:"flex",backgroundColor:"#101d25",minHeight:"120px",maxHeight:"150px",height:"30vh",width:"90%",marginTop:"3vh",marginBottom:"3vh",alignSelf:"center",justifyContent:"space-around",borderStyle:"solid",borderColor:"#9ba3a5",borderRadius:"30px",borderWidth:"thin"}}>
                        <button style={{textAlign:"center",backgroundColor:"transparent",color:"#9ba3a5",minHeight:"70px",minWidth:"70px",width:"5vw",height:"5vw",borderRadius:"1vw",alignSelf:"center",fontSize:"3em",borderStyle:"none"}}>
                            &#x2296;
                        </button>
                        <button style={{textAlign:"center",backgroundColor:"transparent",color:"#9ba3a5",minHeight:"70px",minWidth:"70px",width:"5vw",height:"5vw",borderRadius:"1vw",alignSelf:"center",fontSize:"3em",borderStyle:"none"}}>
                            &#x2295;
                        </button>
                    </div>
                    <div style={{display:"flex",backgroundColor:"#101d25",minHeight:"120px",maxHeight:"150px",height:"30vh",width:"90%",marginTop:"3vh",marginBottom:"3vh",alignSelf:"center",justifyContent:"space-around",borderStyle:"solid",borderColor:"#9ba3a5",borderRadius:"30px",borderWidth:"thin"}}>
                        <button style={{textAlign:"center",backgroundColor:"transparent",color:"#9ba3a5",minHeight:"70px",minWidth:"70px",width:"5vw",height:"5vw",borderRadius:"1vw",alignSelf:"center",fontSize:"3em",borderStyle:"none"}}>
                            &#x2190;
                        </button>
                        <button style={{textAlign:"center",backgroundColor:"transparent",color:"#9ba3a5",minHeight:"70px",minWidth:"70px",width:"5vw",height:"5vw",borderRadius:"1vw",alignSelf:"center",fontSize:"3em",borderStyle:"none"}}>
                            &#x2192;
                        </button>
                    </div>
                </div>
            </div>
        </div>
        return appContent;
    }
}

export default App;

//
//
// 'use strict';
//
// const e = React.createElement;
//
// class FlashCardInterface extends React.Component {
//     constructor(props) {
//        super(props);
//        this.state = {
//               cards:[[]],
//               cardIndex:0,
//               definitionIndex:1,
//               windowWidth: window.innerWidth,
//               windowHeight: window.innerHeight,
//               isMobile: window.innerWidth<450 && window.innerHeight<800,
//            };
//         this.handleResize = this.handleResize.bind(this);
//         this.incrementCardIndex = this.incrementCardIndex.bind(this);
//         this.decrementCardIndex = this.decrementCardIndex.bind(this);
//         this.incrementDefinitionIndex =
//             this.incrementDefinitionIndex.bind(this);
//         this.decrementDefinitionIndex =
//             this.decrementDefinitionIndex.bind(this);
//      }
//     incrementCardIndex(){
//         if ( this.state.definitionIndex < this.state.cards.length){
//             this.setState({ cardIndex: this.state.cardIndex+1 })
//             this.setState({ definitionIndex: 1 })
//         }
//     }
//     decrementCardIndex(){
//         if ( this.state.cardIndex > 0){
//             this.setState({ cardIndex: this.state.cardIndex-1 })
//             this.setState({ definitionIndex: 1 })
//         }
//     }
//     incrementDefinitionIndex(){
//         if ( this.state.definitionIndex
//                 < this.state.cards[this.state.cardIndex].length){
//             this.setState(
//                             { definitionIndex:
//                                 this.state.definitionIndex + 1
//                             }
//                          )
//         }
//     }
//     decrementDefinitionIndex(){
//         if ( this.state.definitionIndex > 1){
//             this.setState(
//                             { definitionIndex:
//                                 this.state.definitionIndex - 1
//                             }
//                           )
//         }
//     }
//     handleResize(e){
//      this.setState({ windowWidth: window.innerWidth });
//      this.setState({ windowHeight: window.innerHeight });
//      this.setState({ isMobile: this.state.windowWidth < 450
//                                  && this.state.windowHeight < 800 });
//     };
//     componentDidMount() {
//      window.addEventListener("resize", this.handleResize);
//      const flashCards =
//          document.getElementById("flashCardContent").innerHTML;
//      let cards = flashCards.split("*")
//      let terms;
//      let sanitizedCards = []
//      // iterate through the cards and parse the terms of each card into
//          // an array.
//      // remove cards with only one term
//          // (a vocab word with no definition or
//          // a question with no answer)
//      for (let i=0; i< cards.length;i++){
//          terms = cards[i].split("\t")
//          if (terms.length > 1){
//              sanitizedCards.push(terms)
//          }
//      }
//      // shuffle cards
//      // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
//      for(let i = sanitizedCards.length - 1; i > 0; i--){
//           const j = Math.floor(Math.random() * i)
//           const temp = sanitizedCards[i]
//           sanitizedCards[i] = sanitizedCards[j]
//           sanitizedCards[j] = temp
//         }
//     // set the react component's state 'cards' to the
//         // shuffled and sanitized cards
//      this.setState({cards:sanitizedCards})
//     }
//     componentWillUnMount() {
//      window.addEventListener("resize", this.handleResize);
//     }
//   render() {
//     let buttonStyle, termAndUiDivStyle, termAndUiDivChildren, term,
//         elements, color, topPercentageOfCardStats, fontSize;
//     let terms = []
//     // landscape mode - > determines the flashcard / button layout and
//         // styling.
//     fontSize = this.state.isMobile ? "8vw" : "4vw";
//     if (this.state.windowWidth>this.state.windowHeight) {
//         termAndUiDivStyle = { style:
//                         {
//                             display:"flex",
//                             justifyContent:"space-around",
//                             width:"95%",
//                             height:"70%",
//                             // marginLeft:"2.5%",
//                             marginTop:"10vh",
//                         }
//                     }
//         buttonStyle = {
//                         // color: "black",
//                         // backgroundColor: "transparent",
//                         color: "white",
//                         backgroundColor: "black",
//                         borderStyle:"none",
//                         width:"5vw",
//                         height:"5vw",
//                         minWidth:"100px",
//                         minHeight:"100px",
//                         alignSelf:"center",
//                         borderRadius:"10px",
//                         fontSize:"5vw",
//                     }
//         for (let i = 0; i < this.state.definitionIndex;i++){
//             color = i%2?"grey":"white";
//             term = e(
//                     'h3',
//                     { style:
//                         {
//                             marginTop:"1vh",
//                             backgroundColor:color,
//                             fontSize:fontSize,
//                             paddingLeft:"3vw",
//                             paddingRight:"3vw",
//                         }
//                     },
//                     // the flashcard defintion(s) or answer(s)
//                     this.state.cards[this.state.cardIndex][i]
//                     )
//             terms.push(term)
//         }
//         termAndUiDivChildren = [
//             // buttons for decrementing the flashcard index
//                 // and term index
//                 e(
//                     // type
//                     'div',
//                     // props
//                     {
//                     style:
//                         {
//                             display:"flex",
//                             justifyContent:"space-around",
//                             flexDirection:"column"
//                         }
//                     },
//                     // children
//                     e(
//                         'button',
//                         {
//                             style: buttonStyle,
//                             onClick: this.decrementDefinitionIndex
//                         },
//                         String.fromCharCode(0x2296)//"-"
//                     ),
//                     e(
//                         'button',
//                         {
//                             style:buttonStyle,
//                             onClick: this.decrementCardIndex
//                         },
//                         String.fromCharCode(0x2190)//"<-"
//                     )
//                 ),
//                 // div for the current flashcard content
//                 e(
//                     // type
//                     'div',
//                     // props
//                     {
//                     style:
//                         {
//                             margin:"1vw",
//                             width:"100%",
//                             height:"100%",
//                             overflow:"scroll",
//                             borderStyle:"dashed",
//                         }
//                     },
//                     // children
//                     terms
//                 ),
//                 // buttons for incrementing the flashcard index
//                     // and term index
//                 e(
//                     // type
//                     'div',
//                     // props
//                     {
//                         style:
//                             {
//                                 display:"flex",
//                                 justifyContent:"space-around",
//                                 flexDirection:"column"
//                             }
//                     },
//                     // children
//                     e(
//                         'button',
//                         {
//                             style:buttonStyle,
//                             onClick: this.incrementDefinitionIndex
//                         },
//                         String.fromCharCode(0x2295)//"+"
//                     ),
//                     e(
//                         'button',
//                         {
//                             style:buttonStyle,
//                             onClick: this.incrementCardIndex
//                         },
//                         String.fromCharCode(0x2192)//"->"
//                     )
//                 ),
//             ];
//         topPercentageOfCardStats = "90%"
//     // portrait mode or square -> determines the flashcard / button
//         // layout and styling.
//     } else if (this.state.windowWidth <= this.state.windowHeight) {
//         termAndUiDivStyle = { style:
//                         {
//                             flexDirection:"column",
//                             display:"flex",
//                             justifyContent:"space-around",
//                             width:"96%",
//                             height:"90%",
//                             margin:"2%",
//                             marginTop:"5vh",
//                             marginBottom:"5vh"
//                         }
//                     }
//         buttonStyle = {
//                     // color: "black",
//                     // backgroundColor: "transparent",
//                         color: "white",
//                         backgroundColor: "black",
//                         borderStyle:"none",
//                         width:"5vw",
//                         height:"5vw",
//                         alignSelf:"center",
//                         minWidth:"100px",
//                         minHeight:"100px",
//                         margin:"2vh",
//                         borderRadius:"10px",
//                         fontSize:"8vw"
//                     }
//         for (let i = 0; i < this.state.definitionIndex;i++){
//             color = i%2?"grey":"white";
//             term = e(
//                         'h3',
//                         {
//                             style:
//                                 {
//                                     fontSize:fontSize,
//                                     backgroundColor:color,
//                                     paddingLeft:"3vw",
//                                     paddingRight:"3vw",
//                                     paddingTop:"1vh",
//                                     paddingBottom:"1vh"
//                                 }
//                         },
//                         this.state.cards[this.state.cardIndex][i]
//                     )
//             terms.push(term)
//         }
//         termAndUiDivChildren = [
//             // div for current flashcard content
//              e(
//                  'div',
//                  {
//                      style:
//                          {
//                              width:"100%",
//                              height:"100%",
//                              overflow:"scroll",
//                              paddingTop:"3vh",
//                              marginBottom:"3vh",
//                              borderStyle:"dashed"
//                          }
//                   },
//                   terms
//               ),
//               // buttons for cycling through the current
//                   // flashcard's defintions
//              e(
//                  // type
//                  'div',
//                  // props
//                  {
//                      style:
//                          {
//                              display:"flex",
//                              justifyContent:"center"
//                          }
//                  },
//                  // children
//                  e(
//                      'button',
//                      {
//                          style:buttonStyle,
//                          onClick: this.decrementDefinitionIndex
//                      },
//                      String.fromCharCode(0x2296)//"-"
//                  ),
//                  e(
//                      'button',
//                      {
//                          style:buttonStyle,
//                          onClick: this.incrementDefinitionIndex
//                      },
//                      String.fromCharCode(0x2295)//"+"
//                  )
//              ),
//              // buttons for cycling through the flashcards
//                  // in this.state.cards buttons
//              e(
//                  // type
//                  'div',
//                  // props
//                  {
//                      style:
//                          {
//                              display:"flex",
//                              justifyContent:"space-around"
//                          }
//                  },
//                  // children
//                  e(
//                      'button',
//                      {
//                          style: buttonStyle,
//                          onClick: this.decrementCardIndex
//                      },
//                      String.fromCharCode(0x2190)//"<-"
//                  ),
//                  e(
//                      'button',
//                      {
//                          style: buttonStyle,
//                          onClick: this.incrementCardIndex
//                      },
//                      String.fromCharCode(0x2192)//"->"
//                  )
//              ),
//         ];
//         topPercentageOfCardStats = "95%"
//     }
//     // top-level page elements
//     elements = [
//               // STATS: the number of the current flashcard's terms
//                 e(
//                     'div',
//                     { style:
//                         {
//                             position:"absolute",
//                             top:topPercentageOfCardStats,
//                             left:this.state.windowWidth<this.state.windowHeight?"2%":"3%",
//                             fontSize:"3vw",
//                             color:"black"
//                         }
//                     },
//                     (this.state.definitionIndex - 1)
//                         + '/' +
//                     (this.state.cards[this.state.cardIndex].length - 1)
//                 ),
//                 // STATS: the number of flashcards
//                 e(
//                     'div',
//                     { style:
//                         {
//                             position:"absolute",
//                             top:topPercentageOfCardStats,
//                             left: "85%",
//                             fontSize:"3vw",
//                             color:"black"
//                         }
//                     },
//                     this.state.cardIndex + 1
//                         + '/' +
//                     this.state.cards.length
//                 ),
//                 // TERM AND UI: flashcard content with buttons.
//                 e( 'div', termAndUiDivStyle, ...termAndUiDivChildren )
//             ]
//     // React component body
//     return e(
//                 'div',
//                 { style:
//                     {
//                         margin:"auto",
//                         maxWidth:"1000px"
//                     }
//                 },
//                 ...elements
//             );
//   }
// }
// const domContainer = document.querySelector('#reactHolder');
// ReactDOM.render(e(FlashCardInterface), domContainer);
