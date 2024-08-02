import  { cardMaster }  from './modules/Data.js';


//When the play button is pressed, hide menuWindow, and open gameWindow

//1 Click on deck to draw cards, 3 cards are randomly chosen, then played on board.

//2 Click on card on board, that card is moved to center, and the other cards are removed.

//3 Card flips over, task is revealed. 

//4 wait 10s, then move deck into view.

//back to 1

//use information from personal public hosted API



//----------------------------------------------- 
//Game Dom
//----------------------------------------------- 


const domDeck = document.getElementById("deck");

const domCard1 = document.getElementById('card1');
const domCard1F = document.getElementById("card-1-front");
const domCard1B = document.getElementById("card-1-back");
const domCard1Btxt = document.getElementById("card-1-back-text")
const domCard1Img = document.getElementById("card-1-front-img")


const domCard2 = document.getElementById('card2');
const domCard2F = document.getElementById("card-2-front");
const domCard2B = document.getElementById("card-2-back");
const domCard2Btxt = document.getElementById("card-2-back-text");
const domCard2Img = document.getElementById("card-2-front-img")

const domCard3 = document.getElementById('card3');
const domCard3F = document.getElementById("card-3-front");
const domCard3B = document.getElementById("card-3-back");
const domCard3Btxt = document.getElementById("card-3-back-text");
const domCard3Img = document.getElementById("card-3-front-img")

//----------------------------------------------- 
//Menu Dom
//-----------------------------------------------
const modal = document.getElementById("options-modal");
const btn = document.getElementById("options-btn");
const close = modal.querySelector(".close");
const startBtn = document.getElementById('start-btn-wrapper');


//options
const spice1 = document.getElementById('spice1');
const spice2 = document.getElementById('spice2');
const spice3 = document.getElementById('spice3');
const spice4 = document.getElementById('spice4');
const spice5 = document.getElementById('spice5');
const spice6 = document.getElementById('spice6');

//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
let debugOFF = true;

let cardBank = [];

let spiceBank1 = [];
let spiceBank2 = [];
let spiceBank3 = [];
let spiceBank4 = [];
let spiceBank5 = [];
let spiceBank6 = [];

let discardPile = [];
let card1 = {};
let card2 = {};
let card3 = {};

let deckOFF = false;

let spiceDeck4 = false;
let spiceDeck5 = false;
let spiceDeck6 = false;


//----------------------------------------------- 
//Menu Variables
//-----------------------------------------------




//----------------------------------------------- 
//Event Listeners
//----------------------------------------------- 

//Mobile 
domCard3.addEventListener("touchstart", function(){
  (!debugOFF) ? console.log('card 3 click read') : null;
  chooseCard(2);
}); 
domCard2.addEventListener("touchstart", function(){
  (!debugOFF) ? console.log('card 2 click read') : null;
  chooseCard(2);
}); 
domCard1.addEventListener("touchstart", function(){
  (!debugOFF) ? console.log('card 1 click read') : null;
  chooseCard(1);
}); 
domDeck.addEventListener("touchstart", function(){
  (!debugOFF) ? console.log('deck click read') : null;
  if (deckOFF === false){
    console.log('deck activated')
    initializeCards();
    drawCard();
    hideDeck(); 
    deckOFF = true;
  } else{ 
    (!debugOFF) ? console.log('already clicked the deck') : null; }
}); 


//PC 
domCard3.addEventListener("click", function(){
  (!debugOFF) ? console.log('card 3 click read') : null;
  chooseCard(3);
}); 

domCard2.addEventListener("click", function(){
  (!debugOFF) ? console.log('card 2 click read') : null;
  chooseCard(2);
}); 

domCard1.addEventListener("click", function(){
  (!debugOFF) ? console.log('card 1 click read') : null;
  chooseCard(1);
}); 

domDeck.addEventListener("click", function(){
  (!debugOFF) ? console.log('deck click read') : null;
  if (deckOFF === false){
    console.log('deck activated')
    initializeCards();
    drawCard();
    hideDeck(); 
    deckOFF = true;
  } else{ 
    (!debugOFF) ? console.log('already clicked the deck') : null; }
}); 


//----------------------------------------------- 
//Menu Functions
//-----------------------------------------------


console.log(spice1.checked , spice2.checked , spice3.checked , spice4.checked , spice5.checked , spice6.checked);


// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
} 

//start-btn 
startBtn.addEventListener('click', ()=>{
  startGame();
  modal.style.display = "none";
})

//----------------------------------------------- 
//Start Commands
//----------------------------------------------- 
//domDeck.style.visibility = 'hidden';
//domCard1.style.visibility = 'hidden';
//domCard2.style.visibility = 'hidden';
//domCard3.style.visibility = 'hidden';


console.log('cardbank = ' + cardBank);
cardMaster.forEach(sortDeck);
//sorts deck by card spice levels
function sortDeck(card){
  switch(card.spiceLevel){
    case 1:
      spiceBank1.push(card);
      //(!debugOFF) ? console.log("added card to Spicebank4") : null;
      break;

    case 2:
      spiceBank2.push(card);
      //(!debugOFF) ? console.log("added card to Spicebank4") : null;
      break;

    case 3:
      spiceBank3.push(card);
      //(!debugOFF) ? console.log("added card to cardbank") : null;
    break;

    case 4:
      spiceBank4.push(card);
      //(!debugOFF) ? console.log("added card to Spicebank4") : null;
      break;

    case 5:
      spiceBank5.push(card);
      //(!debugOFF) ? console.log("added card to spicebank5") : null;
      break;

    case 6:
      spiceBank6.push(card);
      //(!debugOFF) ? console.log("added card to spicebank6") : null;
      break;
    default:
      break;

  }  
};
//----------------------------------------------- 
//Logic Functions
//----------------------------------------------- 


function startGame(){
  stateClearCard1();
  stateClearCard2();
  stateClearCard3();
  buildDeck();
}



//sets all cards
function initializeCards(){
  
  setCard1();
  setCard2();
  setCard3();

  addCards();
  checkDiscards();

  //assign the card1/2/3 to the index locations of currentcardbank
  setCardBacks();
  endGameCheck();


  (!debugOFF) ? console.log('CardBank Length = ' + cardBank.length) : null;

  function setCard1(){
    stateClearCard1();
      //sets random card from cardBank. 
    card1 = pickCard();

    (!debugOFF) ? console.log('card 1 = ' + card1.task) : null;

    //sets the task text
    (!debugOFF) ? console.log('card1 = ' + card1.cardNumber, card1.type, card1, ) : null;
    domCard1Btxt.innerHTML = card1.task;

      //set card ID
    domCard1B.querySelector('.card-id').innerHTML = "card id = " + card1.cardNumber;

      //set Spice level
    (!debugOFF) ? console.log('card 1 spice = '+ card1.spiceLevel) : null;
    switch(card1.spiceLevel){
      case 4:
      domCard1F.classList.add('card-spice-4');
        break;

      case 5:
        domCard1F.classList.add('card-spice-5');
        break;
      
      case 6:
        domCard1F.classList.add('card-spice-6');
        break;

      default:
      break;
      
    }

      //set failure
    if('orElse' in card1){
      let card1Rand = Math.floor(Math.random() * card1.orElse.length);
      (!debugOFF) ? console.log('card1 fail choice = ' + card1Rand) : null;
      domCard1Btxt.querySelector('.fail').innerHTML = card1.orElse[card1Rand];
      }else{(!debugOFF) ? console.log('card 1 has no fail state') : null; }
  }
  
  function setCard2(){
    stateClearCard2();
      //take random number from 0 to cardbank length
    card2 = pickCard();

    (!debugOFF) ? console.log('card 2 = ' + card2.task) : null;

      //sets the task text
    (!debugOFF) ? console.log('card2 = ' + card2.cardNumber, card2.type, card2, ) : null;
    domCard2Btxt.innerHTML = card2.task;

      //set card ID
    domCard2B.querySelector('.card-id').innerHTML = "card id = " + card2.cardNumber;

      //set Spice level
    (!debugOFF) ? console.log('card 2 spice = '+ card2.spiceLevel) : null;
    switch(card2.spiceLevel){
        case 4:
        domCard2F.classList.add('card-spice-4');
          break;
  
        case 5:
          domCard2F.classList.add('card-spice-5');
          break;
        
        case 6:
          domCard2F.classList.add('card-spice-6');
          break;
  
        default:
        break;
        
      }
      //set failure
    if('orElse' in card2){
      let card2Rand = Math.floor(Math.random() * card2.orElse.length);
      (!debugOFF) ? console.log('card 2 fail choice = ' + card2Rand) : null;
      domCard2Btxt.querySelector('.fail').innerHTML = card2.orElse[card2Rand];
      }else{(!debugOFF) ? console.log('card 2 has no fail state') : null; }
  }
  
  function setCard3(){
    stateClearCard3();
      //take random number from 0 to cardbank length
    card3 = pickCard();

    (!debugOFF) ? console.log('card 3 = ' + card3.task) : null;
    
      //sets the task text
    (!debugOFF) ? console.log('card3 = ' + card3.cardNumber, card3.type, card3, ) : null;
    domCard3Btxt.innerHTML = card3.task;

      //set card ID
    domCard3B.querySelector('.card-id').innerHTML = "card id = " + card3.cardNumber;

      //set Spice level
    (!debugOFF) ? console.log('card 3 spice = '+ card3.spiceLevel) : null;
    switch(card3.spiceLevel){
      case 4:
      domCard3F.classList.add('card-spice-4');
        break;

      case 5:
        domCard3F.classList.add('card-spice-5');
        break;
      
      case 6:
        domCard3F.classList.add('card-spice-6');
        break;

      default:
      break;
      
    }
      //set failure
    if('orElse' in card3){
      let card3Rand = Math.floor(Math.random() * card3.orElse.length);
      (!debugOFF) ? console.log('card 3 fail choice = ' + card3Rand) : null;
      domCard3Btxt.querySelector('.fail').innerHTML = card3.orElse[card3Rand];
      } else{(!debugOFF) ? console.log('card 3 has no fail state') : null; }
  }

  function setCardBacks(){
    domCard1Img.src = './src/imgs/img' + card1.type + '.png';
    domCard2Img.src = './src/imgs/img' + card2.type + '.png';
    domCard3Img.src = './src/imgs/img' + card3.type + '.png';
  }

  function checkDiscards(){
    //repulls card until not a card in discard pile
    while(discardPile.includes(card1.cardNumber)){
      (!debugOFF) ? console.log('>card 1 repull') : null;
      setCard1();
      if(!discardPile.includes(card1.cardNumber)){
        break;
      }
    }

    while(discardPile.includes(card2.cardNumber)){
      (!debugOFF) ? console.log('>card 2 repull') : null;
      setCard2();
      if(!discardPile.includes(card2.cardNumber)){
        break;
      }
    }

    while(discardPile.includes(card3.cardNumber)){
      (!debugOFF) ? console.log('>card 3 repull') : null;
      setCard3();
      if(!discardPile.includes(card3.cardNumber)){
        break;
      }
    }
  }

};

//clears classes from cards

function stateClearCard1(){
  domCard1.classList.remove('card-draw1');
  domCard1.classList.remove('card-discard1');
  domCard1.classList.remove('card-focus1');
  domCard1F.classList.remove('card-spice-4');
  domCard1F.classList.remove('card-spice-5');
  domCard1F.classList.remove('card-spice-6');
  domCard1.querySelector('.card-inner').classList.remove('cardflip');
};

function stateClearCard2(){
  domCard2.classList.remove('card-draw2');
  domCard2.classList.remove('card-discard2');
  domCard2.classList.remove('card-focus2');
  domCard2F.classList.remove('card-spice');
  domCard2F.classList.remove('card-spice-4');
  domCard2F.classList.remove('card-spice-5');
  domCard2F.classList.remove('card-spice-6');
  domCard2.querySelector('.card-inner').classList.remove('cardflip');
};

function stateClearCard3(){
  domCard3.classList.remove('card-draw3');
  domCard3.classList.remove('card-discard3');
  domCard3.classList.remove('card-focus3');
  domCard3F.classList.remove('card-spice');
  domCard3F.classList.remove('card-spice-4');
  domCard3F.classList.remove('card-spice-5');
  domCard3F.classList.remove('card-spice-6');
  domCard3.querySelector('.card-inner').classList.remove('cardflip');
};


//adds card draw class to cards
function drawCard(){
  domCard1.classList.add('card-draw1');
  domCard2.classList.add('card-draw2');
  domCard3.classList.add('card-draw3');
};

//focuses the chosen card, hides the others
function chooseCard(num){
  if (num == 1){
    domCard1.classList.remove('card-draw1');
    domCard1.classList.add('card-focus1');
    domCard1.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    (!debugOFF) ? console.log('removing card# =' + card1.cardNumber) : null;
    removeCard(card1.cardNumber);
  }
  if (num == 2){
    domCard2.classList.remove('card-draw2');
    domCard2.classList.add('card-focus2');
    domCard2.querySelector('.card-inner').classList.add('cardflip')
    
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    (!debugOFF) ? console.log('removing card# =' + card2.cardNumber) : null;
    removeCard(card2.cardNumber);
  }

  if (num == 3){
    domCard3.classList.add('card-focus3');
    domCard3.classList.remove('card-draw3');
    domCard3.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
    (!debugOFF) ? console.log('removing card# =' + card3.cardNumber) : null;
    removeCard(card3.cardNumber);
  }
  setTimeout(showDeck, 3000);

};

//hide deck on click. Resets Animation
function hideDeck(){
  domDeck.classList.remove('deck-hide');
  domDeck.classList.remove('deck-show');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-hide');
};

//show deck, resets animation
function showDeck(){
  domDeck.classList.remove('deck-hide');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-show');
  deckOFF = false;

};

//adds card to discard pile, removes it from game
function removeCard(cardId){
  let index = cardBank.findIndex(x => x["cardNumber"] == cardId)
  if (index > -1) { // only splice array when item is found
    cardBank.splice(index, 1); // 2nd parameter means remove one item only
    (!debugOFF) ? console.log('Card deleted') : null;
  }else{
      (!debugOFF) ? console.log('OddErr = Card not found in CardBank') : null;
  }
};

//check if there are enough cards to play
function endGameCheck(){
  if ( discardPile.length == (cardBank.length-2)){
    alert("Wow, you've used up all the cards!\nRefresh to play again!")

  } else {
    (!debugOFF) ? console.log((cardBank.length - discardPile.length + ' cards left')) : null;
  }
};

function buildDeck(){
  cardBank = [];
  (spice1.checked) ? cardBank.push(spiceBank1) : null;
  (spice2.checked) ? cardBank.push(spiceBank2) : null;
  (spice3.checked) ? cardBank.push(spiceBank3) : null;
  (spice4.checked) ? cardBank.push(spiceBank4) : null;
  (spice5.checked) ? cardBank.push(spiceBank5) : null;
  (spice6.checked) ? cardBank.push(spiceBank6) : null;
  cardBank = cardBank.flat();
}

function pickCard(){
  //checks what decks are enabled.adds enabled decks together.
  //Finds a random number between 0 and totaldecklength
  let rndMax = cardBank.length -1;
  let rndCardIndex = Math.floor(Math.random() * (rndMax));

  let newCard = cardBank[rndCardIndex];
  //returns the card found
  return newCard

};

function addCards(){
  if(discardPile.length >= 2 && isSpice4Allow && spiceDeck4 == false ){
    spiceDeck4 = true
    cardBank = cardBank.concat(spiceBank4);
    (!debugOFF) ? console.log("added spice 4 cards to deck") : null;
  } else if (discardPile.length >= 5 && isSpice5Allow && spiceDeck5 == false ){
    spiceDeck5 = true
    cardBank = cardBank.concat(spiceBank5);
    (!debugOFF) ? console.log("added spice 5 cards to deck") : null;
  } else if (discardPile.length >= 8 && isSpice6Allow && spiceDeck6 == false ){
    spiceDeck6 = true
    cardBank = cardBank.concat(spiceBank6);
    (!debugOFF) ? console.log("added spice 6 cards to deck") : null;
  }
};


