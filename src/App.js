import {Component, React} from 'react';

import './App.css';

import response from './sampleResponse'

import ButtonGrouping from './ButtonGrouping';
import Modal from './Modal/Modal'
import FlashcardHolder from './FlashcardHolder'
import MenuButtonHolder from './MenuButtonHolder'

import "./FlashcardHolder.css"
import Card from "./Card"

class App extends Component{
    constructor(props) {
    super(props);
    this.state = {
           // testing: simulated response
           responseCards: response.flashcards,
           possibleSubjects:response.tabs,
           selectedSubjects: [],
           cards:[],
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
           darkMode:true,
           fullScreen:false,

           // redundant
           shouldDisplayMenuModal:false,
           menuModalDisplay:'none',
           // ----

        };
     this.handleResize = this.handleResize.bind(this);
     this.incrementCardIndex = this.incrementCardIndex.bind(this);
     this.decrementCardIndex = this.decrementCardIndex.bind(this);
     this.incrementDefinitionIndex = this.incrementDefinitionIndex.bind(this);
     this.decrementDefinitionIndex = this.decrementDefinitionIndex.bind(this);
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     this.toggleDarkAndLightMode = this.toggleDarkAndLightMode.bind(this);
     this.addOrRemoveSubject = this.addOrRemoveSubject.bind(this);
     this.toggleFullScreen = this.toggleFullScreen.bind(this);
     this.shuffleCards = this.shuffleCards.bind(this);
     this.removeCard = this.removeCard.bind(this);
     }
     toggleMenuModal(){
         if (this.state.shouldDisplayMenuModal){
             this.setState({shouldDisplayMenuModal:false})
             this.setState({menuModalDisplay:'none'})
             // query backend for cards for selected subjects
             // right now: filter this.state.responseCards by selectedSubjects
             this.filterCards()
         } else {
             this.setState({shouldDisplayMenuModal:true})
             this.setState({menuModalDisplay:'flex'})
         }
     }
     filterCards(){
         if (this.state.selectedSubjects){
             let filteredCards = []
             let selectedSubjects = [...this.state.selectedSubjects]
             for(let i = 0; i < selectedSubjects.length; i++){
                 let temp = selectedSubjects[i].split("*")
                 selectedSubjects[i] = temp
                 temp = this.state.responseCards.filter(
                     card => card.Domain === selectedSubjects[i][0] &&
                     card.Subdomain === selectedSubjects[i][1] &&
                     card.Topic === selectedSubjects[i][2]
                 )
                 if (temp.length){
                     filteredCards.push(...temp)
                 }
             }
             this.setState({cards: filteredCards})
         }
         setTimeout(()=>console.log(this.state.cards),100)
     }
     toggleDarkAndLightMode(){
         this.state.darkMode ?
             this.setState({darkMode:false})
            :
             this.setState({darkMode:true})
     }
     toggleFullScreen(){
         this.state.fullScreen ?
             this.setState({fullScreen:false})
            :
             this.setState({fullScreen:true})
     }
     addOrRemoveSubject(subject){
         let subjectIsPresent = false;
         let newSelectedSubjects = [...this.state.selectedSubjects]
         if (newSelectedSubjects.length>0){
             for (let i = 0; i < newSelectedSubjects.length; i++){
                 if ( newSelectedSubjects[i] === subject ){
                     // remove the entry
                     subjectIsPresent = true;
                     newSelectedSubjects.splice(i,1)
                     this.setState({selectedSubjects: newSelectedSubjects})
                 }
             }
         }
         if (!subjectIsPresent){
             // add the entry
             newSelectedSubjects.push(subject)
             this.setState({selectedSubjects: newSelectedSubjects})
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
  shuffleCards(){
      if (this.state.cards.length){
          let shuffleCards = [...this.state.cards]
          for(let i = shuffleCards.length - 1; i >= 0; i--){
              let randomIndex = Math.floor(Math.random()*i)
              let temp = shuffleCards[i]
              shuffleCards[i] = shuffleCards[randomIndex]
              shuffleCards[randomIndex] = temp
          }
          this.setState({cards: shuffleCards})
      }
      setTimeout(()=>console.log(this.state.cards),100)
  }
  removeCard(){
      if (this.state.cards.length){
          let shuffleCards = [...this.state.cards]
              shuffleCards.splice(this.state.cardIndex,1)
              this.setState({cards: shuffleCards})
              setTimeout(()=>console.log(this.state.cards),100)
      }
  }
  updateTerms(){
      if (this.state.cards.length){
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
        return (

            <div className="App">

            <Modal
                tabs={this.state.possibleSubjects}
                clickFunc={this.addOrRemoveSubject}
                selectedSubjects={this.state.selectedSubjects}
                menuModalDisplay={this.state.menuModalDisplay}
            />
                <FlashcardHolder
                    cardContent = { this.state.cards.length ?
                                    this.state.cards[this.state.cardIndex]
                                    :
                                    {front:'Click on the menu button below to select subjects to study.',
                                    back:'Click on the menu button below to select subjects to study.',
                                    Domain:'CS',
                                    Subdomain:'Refresh',
                                    Topic:'',
                                }
                                }
                    stats = {{currentIndex:this.state.cardIndex,length:this.state.cards.length}}
                    functions={{incrementCardIndex:this.incrementCardIndex,
                                decrementCardIndex:this.decrementCardIndex,
                                shuffleCards:this.shuffleCards,
                                removeCard:this.removeCard}}
                 />
                  <MenuButtonHolder
                     menuButton = {true}
                      title = "Select Cards"
                      clickFunc = { this.toggleMenuModal }
                      content = { 0x2630 }
                      active = {this.state.shouldDisplayMenuModal}
                   />
            </div>

        )

    }
}

export default App;

//


// <div className='leftColumn'>
//     <FlashcardHolder
//         content = { this.state.cards.length ?
//                         this.state.cards[this.state.cardIndex]
//                         :
//                         {front:'Click on the menu button below to select subjects to study.',
//                         back:'Click on the menu button below to select subjects to study.',
//                         Domain:'CS',
//                         Subdomain:'Refresh',
//                         Topic:'',
//
//
//                     }
//                     }
//         functions={{incrementCardIndex:this.incrementCardIndex,
//                     decrementCardIndex:this.decrementCardIndex,
//                     shuffleCards:this.shuffleCards,
//                     removeCard:this.removeCard}}
//      />
//      <MenuButtonHolder
//         menuButton = {true}
//          title = "Select Cards"
//          clickFunc = { this.toggleMenuModal }
//          content = { 0x2630 }
//          active = {this.state.shouldDisplayMenuModal}
//       />
// </div>
// <div className='rightColumn'>
//         <ButtonGrouping
//             buttons = {
//                 [
//                     {content:0x2921, title:'Full Screen',
//                         clickFunc:this.toggleFullScreen,
//                         active: this.state.fullScreen
//                     }
//                 ]
//             }
//         />
//         <ButtonGrouping
//             buttons = {
//                 [
//                     {content:0x2296, title:'Less Terms',
//                         clickFunc:this.decrementDefinitionIndex},
//                     {content:0x2295,  title:'More Terms',
//                         clickFunc:this.incrementDefinitionIndex},
//                 ]
//             }
//         />
//         <ButtonGrouping
//             buttons = {
//                 [

//                 ]
//             }
//         />
//         <ButtonGrouping
//             buttons = {
//                 [
//                     {content:0x2600, title:'Light Mode',
//                         clickFunc:this.toggleDarkAndLightMode,
//                         active: !this.state.darkMode
//                     },
//                     {content:0x263E, title:'Dark Mode',
//                         clickFunc:this.toggleDarkAndLightMode,
//                         active: this.state.darkMode
//                     },
//                     {content:0x21bb, title:'Shuffle',
//                         clickFunc:this.incrementCardIndex},
//                     {content:0x293C, title:'Remove Card',
//                         clickFunc:this.decrementCardIndex},
//                 ]
//             }
//         />
// </div>
