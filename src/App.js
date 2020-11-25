import {Component, React} from 'react';
import './App.css';
import response from './sampleResponse'
import Modal from './Modal/Modal'
import FlashcardHolder from './FlashcardHolder'
import MenuButtonHolder from './MenuButtonHolder'

import "./FlashcardHolder.css"

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
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     this.toggleDarkAndLightMode = this.toggleDarkAndLightMode.bind(this);
     this.addOrRemoveSubjectFromSelectedSubjects = this.addOrRemoveSubjectFromSelectedSubjects.bind(this);
     this.toggleFullScreen = this.toggleFullScreen.bind(this);
     this.shuffleCards = this.shuffleCards.bind(this);
     this.removeCard = this.removeCard.bind(this);
     }
     toggleMenuModal(){
         if (this.state.shouldDisplayMenuModal){
             // close menu modal
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
     addOrRemoveSubjectFromSelectedSubjects(subject){
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
     if (this.state.cards.length){
         if ( this.state.cardIndex < this.state.cards.length - 1)
             this.setState({ cardIndex: this.state.cardIndex+1 })
         else
             this.setState({ cardIndex: 0 })
     }
  }
  decrementCardIndex(){
      if (this.state.cards.length){
          if (this.state.cardIndex > 0)
              this.setState({ cardIndex: this.state.cardIndex-1 })
          else
            this.setState({ cardIndex: this.state.cards.length - 1 })
      }
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
  }
    removeCard(){
    if (this.state.cards.length){
        let cards = [...this.state.cards]
        cards.splice(this.state.cardIndex,1)
        if (this.state.cardIndex === this.state.cards.length-1){
            this.setState({cardIndex: 0})
        }
        this.setState({cards: cards})
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
    };
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }
    render(){
        return (
            <div className="App">
                <Modal
                    tabs={this.state.possibleSubjects}
                    selectedSubjects={this.state.selectedSubjects}
                    menuModalDisplay={this.state.menuModalDisplay}
                    functions={
                        {
                          addOrRemoveSubject:this.addOrRemoveSubjectFromSelectedSubjects,
                          toggleDarkAndLightMode:this.toggleDarkAndLightMode
                        }
                  }
                />
                <FlashcardHolder
                    cardContent = { this.state.cards.length ?
                                    this.state.cards[this.state.cardIndex]
                                    :
                                    {
                                        front:'Click on the menu button below to select subjects to study.',
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
