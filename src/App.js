import {Component, React} from 'react';
import './App.css';
import response from './SimulatedResponse/sampleResponse'
import Modal from './MenuModalComponents/Modal'
import FlashcardHolder from './FlashcardComponents/FlashcardHolder'
import Controls from "./MenuModalComponents/Controls.jsx"


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

           isDarkMode: true,
           requestNewCards:false,

           selectedSubjects: [],
           cards:[],
           cardIndex:0,
           menuModalDisplay:'none',
        };
        // Get data from the API with fetch
        fetch('https://cs-flashcard-api.herokuapp.com/api/v1/tabs')
           .then(response => response.json())
               .then((data) => {
                   this.setState({possibleSubjects: data.tabs})
                   console.log(data);
               }).catch((error) => {
                   console.error('Error:', error);
               });
     this.flagFlashcard = this.flagFlashcard.bind(this);
     this.incrementCardIndex = this.incrementCardIndex.bind(this);
     this.decrementCardIndex = this.decrementCardIndex.bind(this);
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     this.toggleDarkOrLightMode = this.toggleDarkOrLightMode.bind(this);
     this.addOrRemoveSubjectFromSelectedSubjects =
        this.addOrRemoveSubjectFromSelectedSubjects.bind(this);
     this.shuffleCard = this.shuffleCard.bind(this);
     this.shuffleAllCards = this.shuffleAllCards.bind(this);
     this.removeCard = this.removeCard.bind(this);
     this.handleResize = this.handleResize.bind(this);
     }
     // need some way of communicating flagged status to backend.
        // either timeout function checking every minute or an event action
        // that is triggered when the user does something (like open or close
        // the menu modal.)
     flagFlashcard(){
         let cards = [...this.state.cards]
         cards[this.state.cardIndex].flagged =
            cards[this.state.cardIndex].flagged === undefined
            ||
            cards[this.state.cardIndex].flagged === false ?
                true : false;
         this.setState({cards:cards})
         setTimeout(()=>{
             console.log(this.state.cards[this.state.cardIndex])
         },100)
     }
     toggleMenuModal(){
         if (this.state.menuModalDisplay === 'flex'){
             // close menu modal
             this.setState({menuModalDisplay:'none'})
             if (this.state.requestNewCards){
                 this.requestNewCards()
             }
         } else {
             // open menu modal
             this.setState({menuModalDisplay:'flex'})
         }
     }
     requestNewCards(){
         // Get data from the API with fetch
         fetch('https://cs-flashcard-api.herokuapp.com/api/v1/cards', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json'},
                     body: JSON.stringify(this.state.selectedSubjects)
                     }
                 ).then(response => response.json())
                     .then((data) => {
                         this.setState({cards: data.cards})
                         // console.log(data);
                     }).catch((error) => {
                         console.error('Error:', error);
                         this.filterCards()
                     });
         this.setState({requestNewCards: false})
     }
     // simulated response if backend fails.
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
     toggleDarkOrLightMode(){
         this.setState({isDarkMode:!this.state.isDarkMode})
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
         this.setState({requestNewCards: true})
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
      shuffleAllCards(){
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
    shuffleCard(){
        if (this.state.cards.length){
            let shuffleCards = [...this.state.cards]
            let randomIndex = this.state.cardIndex
            while (randomIndex === this.state.cardIndex){
                randomIndex =
                    Math.floor( Math.random() * this.state.cards.length - 1 )
            }
            let temp = shuffleCards[this.state.cardIndex]
            shuffleCards[this.state.cardIndex] = shuffleCards[randomIndex]
            shuffleCards[randomIndex] = temp
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
    console.log(this.state.cards[this.state.cardIndex])
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
                    isMobile = { this.state.isMobile }
                    tabs = { this.state.possibleSubjects }
                    selectedSubjects = { this.state.selectedSubjects }
                    menuModalDisplay = { this.state.menuModalDisplay }
                    functions = { { addOrRemoveSubject:
                                this.addOrRemoveSubjectFromSelectedSubjects } }
                />
                <FlashcardHolder
                    isMobile = { this.state.isMobile }
                    cardContent = { this.state.cards.length ?
                                        this.state.cards[this.state.cardIndex]
                                        :
                                        null }
                    stats = { { currentIndex: this.state.cardIndex,
                                length: this.state.cards.length } }
                    functions = { { incrementCardIndex: this.incrementCardIndex,
                                  decrementCardIndex: this.decrementCardIndex,
                                  shuffleCard: this.shuffleCard,
                                  removeCard: this.removeCard,
                                  flagFlashcard: this.flagFlashcard
                               } }
                 />
                 <Controls
                     functions = { { toggleMenuModal: this.toggleMenuModal,
                                   shuffleAllCards: this.shuffleAllCards,
                                   toggleDarkOrLightMode: this.toggleDarkOrLightMode,
                                   requestNewCards: this.requestNewCards,
                                } }
                     menuModalDisplay = { this.state.menuModalDisplay }
                     isDarkMode = { this.state.isDarkMode }
                     userShouldRequestNewCards = { this.state.userShouldRequestNewCards }

                  />
            </div>
        )
    }
}

export default App;
// <Button
//      className = 'menuButton'
//      title = "Select Cards"
//      clickFunc = { this.toggleMenuModal }
//      content = { 0x2630 }
//      active = { this.state.menuModalDisplay === 'flex' }
// />
