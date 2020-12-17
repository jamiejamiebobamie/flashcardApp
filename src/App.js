import {Component, React} from 'react';
import './App.css';
import Modal from './MenuModalComponents/Modal'
import FlashcardHolder from './FlashcardComponents/FlashcardHolder'
import Button from "./Button.jsx"
import HelpMessage from "./HelpMessage.jsx"


class App extends Component{
    constructor(props) {
    super(props);
    this.state = {
           responseCards:[],
           possibleSubjects:[],

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
           displaySwipeHelpMessages:false,
           flashMenuIcon:false,
           displayClickHelpMessage:true,
           clickMessageHaveNotBeenDisplayed:true
    };
    // Get data from the API with fetch to populate the possible subjects tabs
    fetch('https://cs-flashcard-api.herokuapp.com/api/v1/tabs')
       .then(response => response.json())
           .then((data) => {
               this.setState({possibleSubjects: data.tabs})
               // console.log(data);
           }).catch((error) => {
               console.error('Error:', error);
     });
     this.flagFlashcard = this.flagFlashcard.bind(this);
     this.incrementCardIndex = this.incrementCardIndex.bind(this);
     this.decrementCardIndex = this.decrementCardIndex.bind(this);
     this.toggleMenuModal = this.toggleMenuModal.bind(this);
     this.addOrRemoveSubjectFromSelectedSubjects =
                        this.addOrRemoveSubjectFromSelectedSubjects.bind(this);
     this.shuffleCard = this.shuffleCard.bind(this);
     this.shuffleAllCards = this.shuffleAllCards.bind(this);
     this.removeCard = this.removeCard.bind(this);
     this.handleResize = this.handleResize.bind(this);
     this.toggleOffClickHelpMessage = this.toggleOffClickHelpMessage.bind(this);
     this.toggleOffSwipeHelpMessages = this.toggleOffSwipeHelpMessages.bind(this);
     this.toggleFlashMenuIcon = this.toggleFlashMenuIcon.bind(this);
     }
     flagFlashcard(){
         if (this.state.cards.length){
             let cards = [...this.state.cards]
             cards[this.state.cardIndex].flagged =
                cards[this.state.cardIndex].flagged === undefined
                ||
                cards[this.state.cardIndex].flagged === false ?
                    true : false;
             this.setState({cards:cards})
             let flaggedCard = cards[this.state.cardIndex];
             setTimeout(()=>{
                 // console.log(this.state.cards[this.state.cardIndex])
                 // Send the card to  to the API with fetch
                 fetch('https://cs-flashcard-api.herokuapp.com/api/v1/flagged', {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json'},
                             body: JSON.stringify(flaggedCard)
                             }
                         ).then(response => response.json())
                             .then((success) => {
                                 console.log('success:', success);
                             }).catch((error) => {
                                 console.error('Error:', error);
                             });
                 },100)
         }
     }
     toggleMenuModal(){
         if (this.state.menuModalDisplay === 'flex'){
             // close menu modal
             this.setState({menuModalDisplay:'none'})
             if (this.state.requestNewCards){
                 this.requestNewCards()
                 this.setState({requestNewCards: false})
             }
             this.setState({flashMenuIcon:false})
             if (this.state.displayClickHelpMessage
                 || this.state.clickMessageHaveNotBeenDisplayed){
                 this.setState({displayClickHelpMessage:false})
                 this.setState({clickMessageHaveNotBeenDisplayed:false})
                 this.setState({displaySwipeHelpMessages:true})
             }
         } else {
             // open menu modal
             this.setState({menuModalDisplay:'flex'})
             this.setState({displaySwipeHelpMessages:false})
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
                         let shuffleCards = this.shuffleAllCards(data.cards)
                         for (let i = 0; i < shuffleCards.length; i++){
                             if (shuffleCards[i].flagged.length){
                                 if (shuffleCards[i].flagged[0] === 't')
                                    shuffleCards[i].flagged = true;
                                else
                                    shuffleCards[i].flagged = false;
                             }
                         }
                         this.setState({cards: shuffleCards})
                         this.setState({ cardIndex: 0 })
                         // setTimeout(()=>console.log(data),500)
                     }).catch((error) => {
                         console.error('Error:', error);
                     });
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
         this.setState({flashMenuIcon:true})
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
      shuffleAllCards(unshuffledCards){
          if (unshuffledCards.length){
              for(let i = unshuffledCards.length - 1; i >= 0; i--){
                  let randomIndex = Math.floor( Math.random() * i )
                  let temp = unshuffledCards[i]
                  unshuffledCards[i] = unshuffledCards[randomIndex]
                  unshuffledCards[randomIndex] = temp
              }
          }
          return unshuffledCards // that are now shuffled...
    }
    shuffleCard(){
        if (this.state.cards.length>2){
            let shuffleCards = [...this.state.cards]
            let randomIndex = this.state.cardIndex
            while (randomIndex === this.state.cardIndex || randomIndex < 0){
                randomIndex =
                    Math.floor( Math.random() * shuffleCards.length - 1 )
            }
            let temp = shuffleCards[this.state.cardIndex]
            shuffleCards[this.state.cardIndex] = shuffleCards[randomIndex]
            shuffleCards[randomIndex] = temp
            this.setState({cards: shuffleCards})
        } else {
            this.incrementCardIndex()
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
                                 && window.innerHeight <= 420) });
        this.setState({ isPortrait: window.innerWidth <
                                    window.innerHeight });
    };
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }
    flagCardButton(){
        let content = null
        if ( this.state.menuModalDisplay === 'none'
             && this.state.cards.length
             && this.state.cardIndex < this.state.cards.length
             && this.state.cards[this.state.cardIndex] !== undefined
          ) {
                 content = (<Button
                   className='flagButton'
                   title = "Flag for edit"
                   clickFunc = { this.flagFlashcard }
                   content = { 0x2691 }
                   active = {  this.state.cards.length
                                &&
                                this.state.cardIndex < this.state.cards.length
                                &&
                                this.state.cards[this.state.cardIndex].flagged
                                    !== undefined
                                ?
                                this.state.cards[this.state.cardIndex].flagged
                                :
                                false
                            }
                  />)
             }
        return content
    }
    clickHelpMessage(){
        const content = this.state.displayClickHelpMessage
                        &&
                        this.state.menuModalDisplay === "none"
         ?
         <div className="click help">
                            <HelpMessage
                                shouldDisplay =
                                    { this.state.displayClickHelpMessage }
                                messageType = "card"
                            />
                        </div>
            :
            null
            return content;
    }
    swipeHelpMessages(){
        const content = this.state.displaySwipeHelpMessages
                        &&
                        this.state.menuModalDisplay === "none"
         ?
        <div className="swipe help">
            <HelpMessage
                toggleOffSwipeHelpMessages= {this.toggleOffSwipeHelpMessages}
                shouldDisplay =
                    { this.state.displaySwipeHelpMessages }
                    messageType="up"/>
            <HelpMessage
                toggleOffSwipeHelpMessages= {this.toggleOffSwipeHelpMessages}
                shouldDisplay =
                    { this.state.displaySwipeHelpMessages }
                    messageType="left"/>
            <HelpMessage
                toggleOffSwipeHelpMessages= {this.toggleOffSwipeHelpMessages}
                shouldDisplay =
                    { this.state.displaySwipeHelpMessages }
                    messageType="right"/>
            <HelpMessage
                toggleOffSwipeHelpMessages= {this.toggleOffSwipeHelpMessages}
                shouldDisplay =
                    { this.state.displaySwipeHelpMessages }
                    messageType="down"/>
        </div>
        :
        null;
        return content;
    }
    toggleOffClickHelpMessage(){
        if (this.state.displayClickHelpMessage){
            this.setState({ displayClickHelpMessage : false })
        }
    }
    toggleOffSwipeHelpMessages(){
        if (this.state.displaySwipeHelpMessages){
            this.setState({ displaySwipeHelpMessages : false })
        }
    }
    toggleFlashMenuIcon(){
            this.setState({ flashMenuIcon : !this.state.flashMenuIcon })
    }
    render(){
        return (
            <div className='App'>
                { this.clickHelpMessage() }
                { this.swipeHelpMessages() }
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
                                  flagFlashcard: this.flagFlashcard,
                                  toggleOffClickHelpMessage:
                                    this.toggleOffClickHelpMessage,
                                  toggleOffSwipeHelpMessages:
                                    this.toggleOffSwipeHelpMessages
                               } }
                 />
                  <Button
                      className={!this.state.flashMenuIcon?'menuButtonAlone':'flashingMenuButton'}
                       title = {this.state.menuModalDisplay === 'flex'?"Close Menu":"Select Cards"}
                       clickFunc = { this.toggleMenuModal }
                       content = { 0x2630 }
                       active = { this.state.menuModalDisplay === 'flex' }
                  />
                  { this.flagCardButton() }
            </div>
        )
    }
}

export default App;
