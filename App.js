import  { cardMaster }  from 'data.js';


//When the play button is pressed, hide menuWindow, and open gameWindow

//1 Click on deck to draw cards, 3 cards are randomly chosen, then played on board.

//2 Click on card on board, that card is moved to center, and the other cards are removed.

//3 Card flips over, task is revealed. 

//4 wait 10s, then move deck into view.

//back to 1

//use information from personal public hosted API



//----------------------------------------------- 
//DOM Variables
//----------------------------------------------- 


const domDeck = document.getElementById("deck");

const domCard1 = document.getElementById('card1');
const comCard1F = document.getElementById("card-1-front");
const domCard1B = document.getElementById("card-1-back");
const domCard1Btxt = document.getElementById("card-1-back-text")
const domCard1Img = document.getElementById("card-1-front-img")


const domCard2 = document.getElementById('card2');
const domCard2B = document.getElementById("card-2-back");
const domCard2Btxt = document.getElementById("card-2-back-text");
const domCard2Img = document.getElementById("card-2-front-img")

const domCard3 = document.getElementById('card3');
const domCard3B = document.getElementById("card-3-back");
const domCard3Btxt = document.getElementById("card-3-back-text");
const domCard3Img = document.getElementById("card-3-front-img")

//----------------------------------------------- 
//image Variables
//----------------------------------------------- 
const rootContext = document.body.getAttribute("data-root");

const bgImgDoOrDrink = './src/imgs/imgMug.png';
const bgImgConfessional = './src/imgs/imgMirror.png';
const bgImgJudgement = './src/imgs/imgHammer.png';
const bgImgHistory = './src/imgs/imgBook.png';
const bgImgSimonSays = 'https://placehold.co/333x500?text=Simon-Says';
const bgImgDeck =  'https://placehold.co/333x500?text=?';



//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 

let cardBank = cardMaster;



const debugOFF = false;

let chosenCards = [];

let card1 = {};
let card2 = {};
let card3 = {};


//----------------------------------------------- 
//Logic Functions
//----------------------------------------------- 

console.log('cardbank = ' + cardBank);

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
  initializeCards();
  drawCard();
  domDeck.classList.remove('deck-hide');
  hideDeck();
}); 

//sets all cards
function initializeCards(){
  setCard1();
  setCard2();
  setCard3();
  //assign the card1/2/3 to the index locations of currentcardbank
  console.log('card 1 = ' + card1.task);
  console.log('card 2 = ' + card2.task);
  console.log('card 3 = ' + card3.task);
  setRandomFailure();
  setCardBacks();
  checkCards();

  function setCard1(){
      //sets random card from cardBank. 
    let rndMax = cardBank.length -1;
    (!debugOFF) ? console.log('CardBank Length = ' + cardBank.length) : null;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard1 = ' + rndCardIndex) : null;
    card1 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card1.id, card1.type, card1, ) : null;
    domCard1Btxt.innerHTML = card1.task;

      //set card ID
    domCard1B.querySelector('.card-id').innerHTML = "card id = " + card1.cardNumber;
  }
  
  function setCard2(){
      //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard2 = ' + rndCardIndex) : null;
    card2 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card2.id, card2.type, card2, ) : null;
    domCard2Btxt.innerHTML = card2.task;

      //set card ID
    domCard2B.querySelector('.card-id').innerHTML = "card id = " + card2.cardNumber;
  }
  
  function setCard3(){
      //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard3 = ' + rndCardIndex) : null;
    card3 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card3.id, card3.type, card3, ) : null;
    domCard3Btxt.innerHTML = card3.task;

      //set card ID
    domCard3B.querySelector('.card-id').innerHTML = "card id = " + card3.cardNumber;
  }
  
  function setRandomFailure(){
    if('orElse' in card1){
    let card1Rand = Math.floor(Math.random() * card1.orElse.length);
    (!debugOFF) ? console.log('card1 fail choice = ' + card1Rand) : null;
    domCard1Btxt.querySelector('.fail').innerHTML = card1.orElse[card1Rand];
    }else{(!debugOFF) ? console.log('card 1 has no fail state') : null; }


    if('orElse' in card2){
    let card2Rand = Math.floor(Math.random() * card2.orElse.length);
    (!debugOFF) ? console.log('card 2 fail choice = ' + card2Rand) : null;
    domCard2Btxt.querySelector('.fail').innerHTML = card2.orElse[card2Rand];
    }else{(!debugOFF) ? console.log('card 2 has no fail state') : null; }


    if('orElse' in card3){
    let card3Rand = Math.floor(Math.random() * card3.orElse.length);
    (!debugOFF) ? console.log('card 3 fail choice = ' + card3Rand) : null;
    domCard3Btxt.querySelector('.fail').innerHTML = card3.orElse[card3Rand];
    } else{(!debugOFF) ? console.log('card 3 has no fail state') : null; }
  }

  function setCardBacks(){
    let card1Type = card1.type;
    let card2Type = card2.type;
    let card3Type = card3.type;

    switch(card1Type){
      case 'confessional':
        domCard1Img.src = bgImgConfessional;
        (!debugOFF) ? console.log('card 1 drawn as confessional') : null;
      break;

      case 'do_or_drink':
        domCard1Img.src = bgImgDoOrDrink;
        (!debugOFF) ? console.log('card 1 drawn as do_or_drink') : null;
      break;

      case 'simon_says':
        domCard1Img.src = bgImgSimonSays;
        (!debugOFF) ? console.log('card 1 drawn as simon_says') : null;
      break;

      case 'judgement_day':
        domCard1Img.src = bgImgJudgement;
        (!debugOFF) ? console.log('card 1 drawn as judgement') : null;
      break;

      case "history_lesson":
        domCard1Img.src = bgImgHistory;
        (!debugOFF) ? console.log('card 1 drawn as history') : null;
      break;

      default:
        domCard1Img.src = bgImgDeck;
        (!debugOFF) ? console.log('card 1 drawn as mystery????') : null; 
      break;
    }

    switch(card2Type){
      case 'confessional':
        domCard2Img.src = bgImgConfessional;
        (!debugOFF) ? console.log('card 2 drawn as confessional') : null;
      break;

      case 'do_or_drink':
        domCard2Img.src = bgImgDoOrDrink;
        (!debugOFF) ? console.log('card 2 drawn as do_or_drink') : null;
      break;

      case 'simon_says':
        domCard2Img.src = bgImgSimonSays;
        (!debugOFF) ? console.log('card 2 drawn as simon_says') : null;
      break;

      case 'judgement_day':
        domCard2Img.src = bgImgJudgement;
        (!debugOFF) ? console.log('card 2 drawn as judgement') : null;
      break;

      case "history_lesson":
        domCard2Img.src = bgImgHistory;
        (!debugOFF) ? console.log('card 2 drawn as history') : null;
      break;

      default:
        domCard2Img.src = bgImgDeck;
        (!debugOFF) ? console.log('card 2 drawn as mystery????') : null; 
      break;
    }

    switch(card3Type){
      case 'confessional':
        domCard3Img.src = bgImgConfessional;
        (!debugOFF) ? console.log('card 3 drawn as confessional') : null;
      break;

      case 'do_or_drink':
        domCard3Img.src = bgImgDoOrDrink;
        (!debugOFF) ? console.log('card 3 drawn as do_or_drink') : null;
      break;

      case 'simon_says':
        domCard3Img.src = bgImgSimonSays;
        (!debugOFF) ? console.log('card 3 drawn as simon_says') : null;
      break;

      case 'judgement_day':
        domCard3Img.src = bgImgJudgement;
        (!debugOFF) ? console.log('card 3 drawn as judgement') : null;
      break;

      case "history_lesson":
        domCard3Img.src = bgImgHistory;
        (!debugOFF) ? console.log('card 3 drawn as history') : null;
      break;

      default:
        domCard3Img.src = bgImgDeck;
        (!debugOFF) ? console.log('card 3 drawn as mystery????') : null; 
      break;
    }
  }

  function checkCards(){
  if(chosenCards.includes(card1.cardNumber)){
    setCard1();
    (!debugOFF) ? console.log('card 1 repull') : null;
  }
  if(chosenCards.includes(card2.cardNumber)){
    setCard2();
    (!debugOFF) ? console.log('card 2 repull') : null;
  }
  if(chosenCards.includes(card3.cardNumber)){
    setCard3();
    (!debugOFF) ? console.log('card 3 repull') : null;
  }
  
  }
  endGameCheck();
}




function cardStateClear(){
  domCard1.classList.remove('card-draw1');
  domCard2.classList.remove('card-draw2');
  domCard3.classList.remove('card-draw3');

  domCard1.classList.remove('card-discard1');
  domCard2.classList.remove('card-discard2');
  domCard3.classList.remove('card-discard3');

  domCard1.classList.remove('card-focus1');
  domCard2.classList.remove('card-focus2');
  domCard3.classList.remove('card-focus3');

  domCard1.querySelector('.card-inner').classList.remove('cardflip');
  domCard2.querySelector('.card-inner').classList.remove('cardflip');
  domCard3.querySelector('.card-inner').classList.remove('cardflip');
  
}

function drawCard(){

  cardStateClear();
  domCard1.classList.add('card-draw1');
  domCard2.classList.add('card-draw2');
  domCard3.classList.add('card-draw3');

}

function chooseCard(num){
  if (num == 1){
    domCard1.classList.remove('card-draw1');
    domCard1.classList.add('card-focus1');
    domCard1.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    removedCard(num);
  }
  if (num == 2){
    domCard2.classList.remove('card-draw2');
    domCard2.classList.add('card-focus2');
    domCard2.querySelector('.card-inner').classList.add('cardflip')
    
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    removedCard(num);
  }

  if (num == 3){
    domCard3.classList.add('card-focus3');
    domCard3.classList.remove('card-draw3');
    domCard3.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
    removedCard(num);
  }
showDeck();
}

function hideDeck(){
  domDeck.classList.remove('deck-hide');
  domDeck.classList.remove('deck-show');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-hide');
}

function showDeck(){
  domDeck.classList.remove('deck-hide');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-show');

}

function removedCard(num){

  let boolCheck = chosenCards.includes(num);

  if(boolCheck){
    (!debugOFF) ? console.log('Already picked card# = ' + num + 'quit Clicking the same card') : null; }
  
  else{
  //adds chosen CardID to chosenCards
  switch (num){
    case 1:
      if(!chosenCards.includes(card1.cardNumber)){
        chosenCards.push(card1.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card1.cardNumber + '. quit Clicking the same card') : null; }
    break;
    case 2:
      if(!chosenCards.includes(card2.cardNumber)){
        chosenCards.push(card2.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card2.cardNumber + '. quit Clicking the same card') : null; }

    break;
    case 3:
      if(!chosenCards.includes(card3.cardNumber)){
        chosenCards.push(card3.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card3.cardNumber + '. quit Clicking the same card') : null; }
    break;
    default:
      break;
  }}
  (!debugOFF) ? console.log('Chosen card ID = ' + chosenCards) : null;
}

function endGameCheck(){
  if ( chosenCards.length == (cardBank.length-2)){
    alert("Wow, you've used up all the cards!\nRefresh to play again!")

  } else {
    (!debugOFF) ? console.log((cardBank.length - chosenCards.length + ' cards left')) : null;
  }
  
}