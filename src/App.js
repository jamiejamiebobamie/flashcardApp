import {Component, React} from 'react';
import './App.css';
import response from './SimulatedResponse/sampleResponse'
import Modal from './MenuModalComponents/Modal'
import FlashcardHolder from './FlashcardComponents/FlashcardHolder'
import Button from "./Button.jsx"

class App extends Component{
    constructor(props) {
    super(props);
    this.state = {
           // testing: simulated response
           responseCards: response.flashcards,
           possibleSubjects:response.tabs,

           windowWidth: window.innerWidth,
           windowHeight: window.innerHeight,

           isMobile: (window.innerWidth <= 420
                                        && window.innerHeight <= 750)
                                      ||
                                      (window.innerWidth <= 750
                                        && window.innerHeight <= 420),
           isPortrait: window.innerWidth < window.innerHeight,

           selectedSubjects: [],
           cards:[],
           cardIndex:0,
           darkMode:true,
           menuModalDisplay:'none',
        };
     this.incrementCardIndex = this.incrementCardIndex.bind(this);
     this.decrementCardIndex = this.decrementCardIndex.bind(this);
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     this.toggleDarkAndLightMode = this.toggleDarkAndLightMode.bind(this);
     this.addOrRemoveSubjectFromSelectedSubjects =
     this.addOrRemoveSubjectFromSelectedSubjects.bind(this);
     this.shuffleCards = this.shuffleCards.bind(this);
     this.removeCard = this.removeCard.bind(this);
     this.handleResize = this.handleResize.bind(this);

     }
     toggleMenuModal(){
         if (this.state.menuModalDisplay === 'flex'){
             // close menu modal
             this.setState({menuModalDisplay:'none'})
             // future: query backend for cards for selected subjects
             // right now: filter this.state.responseCards by selectedSubjects
             this.filterCards()
         } else {
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
         this.state.cardIndex < this.state.cards.length - 1 ?
            this.setState({ cardIndex: this.state.cardIndex+1 })
            :
            this.setState({ cardIndex: 0 })
     }
  }
  decrementCardIndex(){
      if (this.state.cards.length){
          this.state.cardIndex > 0 ?
             this.setState({ cardIndex: this.state.cardIndex-1 })
             :
             this.setState({ cardIndex: this.state.cards.length - 1 })
      }
  }
  shuffleCards(){
      if (this.state.cards.length){
          let shuffleCards = [...this.state.cards]
          for(let i = shuffleCards.length - 1; i >= 0; i--){
              let randomIndex = Math.floor( Math.random() * i )
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
            <div className='App'>
                <Modal
                    tabs = { this.state.possibleSubjects }
                    selectedSubjects = { this.state.selectedSubjects }
                    menuModalDisplay = { this.state.menuModalDisplay }
                    functions = {
                        {
                          addOrRemoveSubject:
                                this.addOrRemoveSubjectFromSelectedSubjects,
                          toggleDarkAndLightMode:
                                this.toggleDarkAndLightMode
                        }
                  }
                />
                <FlashcardHolder
                    isMobile = {this.state.isMobile}
                    cardContent = { this.state.cards.length ?
                                        this.state.cards[this.state.cardIndex]
                                        :
                                        null
                                }
                    stats = { { currentIndex: this.state.cardIndex,
                                length: this.state.cards.length }
                            }
                    functions={ { incrementCardIndex: this.incrementCardIndex,
                                  decrementCardIndex: this.decrementCardIndex,
                                  shuffleCards: this.shuffleCards,
                                  removeCard: this.removeCard }
                              }
                 />
                 <Button
                      className = 'menuButton'
                      title = "Select Cards"
                      clickFunc = { this.toggleMenuModal }
                      content = { 0x2630 }
                      active = { this.state.menuModalDisplay === 'flex' }
                 />
            </div>
        )
    }
}

export default App;
