import  { cardMaster }  from './modules/data.js';


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
//image Variables
//----------------------------------------------- 
const rootContext = document.body.getAttribute("data-root");

const bgImgDoOrDrink = './src/imgs/imgDrink.png';
const bgImgConfessional = './src/imgs/imgConfess.png';
const bgImgJudgement = './src/imgs/imgJudgement.png';
const bgImgSimonSays = './src/imgs/imgSimonSays.png';
const bgImgDeck =  'https://placehold.co/333x500?text=?';



//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
let debugOFF = false;

const cardBank = cardMaster;
let discardPile = [];
let card1 = {};
let card2 = {};
let card3 = {};

let deckOFF = false;

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

domDeck.addEventListener("touchstart", function(){
  (!debugOFF) ? console.log('deck touch read') : null;
  initializeCards();
  drawCard();

  hideDeck();
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

//sets all cards
function initializeCards(){
  cardStateClear();
  setCard1();
  setCard2();
  setCard3();
  checkCards();

  //assign the card1/2/3 to the index locations of currentcardbank
  setCardBacks();
  endGameCheck();

  (!debugOFF) ? console.log('CardBank Length = ' + cardBank.length) : null;

  function setCard1(){
      //sets random card from cardBank. 
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    card1 = cardBank[rndCardIndex];

    (!debugOFF) ? console.log('initializeCard1 = ' + rndCardIndex) : null;
    (!debugOFF) ? console.log('card 1 = ' + card1.task) : null;

    //sets the task text
    (!debugOFF) ? console.log('card1 = ' + card1.cardNumber, card1.type, card1, ) : null;
    domCard1Btxt.innerHTML = card1.task;

      //set card ID
    domCard1B.querySelector('.card-id').innerHTML = "card id = " + card1.cardNumber;

      //set Spice level
    (!debugOFF) ? console.log('card 1 spice = '+ card1.spiceLevel) : null;
    if(card1.spiceLevel == 5){
      document.getElementById('card-1-front').classList.add('card-spice');
    }

      //set failure
    if('orElse' in card1){
      let card1Rand = Math.floor(Math.random() * card1.orElse.length);
      (!debugOFF) ? console.log('card1 fail choice = ' + card1Rand) : null;
      domCard1Btxt.querySelector('.fail').innerHTML = card1.orElse[card1Rand];
      }else{(!debugOFF) ? console.log('card 1 has no fail state') : null; }
  }
  
  function setCard2(){
      //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    card2 = cardBank[rndCardIndex];

    (!debugOFF) ? console.log('initializeCard2 = ' + rndCardIndex) : null;
    (!debugOFF) ? console.log('card 2 = ' + card2.task) : null;

      //sets the task text
    (!debugOFF) ? console.log('card2 = ' + card2.cardNumber, card2.type, card2, ) : null;
    domCard2Btxt.innerHTML = card2.task;

      //set card ID
    domCard2B.querySelector('.card-id').innerHTML = "card id = " + card2.cardNumber;

      //set Spice level
      (!debugOFF) ? console.log('card 2 spice = '+ card2.spiceLevel) : null;
    if(card2.spiceLevel == 5){
      document.getElementById('card-2-front').classList.add('card-spice');
    }
      //set failure
    if('orElse' in card2){
      let card2Rand = Math.floor(Math.random() * card2.orElse.length);
      (!debugOFF) ? console.log('card 2 fail choice = ' + card2Rand) : null;
      domCard2Btxt.querySelector('.fail').innerHTML = card2.orElse[card2Rand];
      }else{(!debugOFF) ? console.log('card 2 has no fail state') : null; }
  }
  
  function setCard3(){
      //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    card3 = cardBank[rndCardIndex];

    (!debugOFF) ? console.log('initializeCard3 = ' + rndCardIndex) : null;
    (!debugOFF) ? console.log('card 3 = ' + card3.task) : null;
    
        //sets the task text
    (!debugOFF) ? console.log('card3 = ' + card3.cardNumber, card3.type, card3, ) : null;
    domCard3Btxt.innerHTML = card3.task;

      //set card ID
    domCard3B.querySelector('.card-id').innerHTML = "card id = " + card3.cardNumber;

          //set Spice level
    (!debugOFF) ? console.log('card 3 spice = '+ card3.spiceLevel) : null;
    if(card3.spiceLevel == 5){
      document.getElementById('card-3-front').classList.add('card-spice');
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

  function checkCards(){
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

  domCard1F.classList.remove('card-spice');
  domCard2F.classList.remove('card-spice');
  domCard3F.classList.remove('card-spice');

  domCard1.querySelector('.card-inner').classList.remove('cardflip');
  domCard2.querySelector('.card-inner').classList.remove('cardflip');
  domCard3.querySelector('.card-inner').classList.remove('cardflip');
  
};

function drawCard(){


  domCard1.classList.add('card-draw1');
  domCard2.classList.add('card-draw2');
  domCard3.classList.add('card-draw3');

};

function chooseCard(num){
  if (num == 1){
    domCard1.classList.remove('card-draw1');
    domCard1.classList.add('card-focus1');
    domCard1.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    addToDiscardPile(num);
  }
  if (num == 2){
    domCard2.classList.remove('card-draw2');
    domCard2.classList.add('card-focus2');
    domCard2.querySelector('.card-inner').classList.add('cardflip')
    
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
    addToDiscardPile(num);
  }

  if (num == 3){
    domCard3.classList.add('card-focus3');
    domCard3.classList.remove('card-draw3');
    domCard3.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
    addToDiscardPile(num);
  }
  setTimeout(showDeck, 3000);

};

function hideDeck(){
  domDeck.classList.remove('deck-hide');
  domDeck.classList.remove('deck-show');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-hide');
};

function showDeck(){
  domDeck.classList.remove('deck-hide');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-show');
  deckOFF = false;

};

function addToDiscardPile(num){
  //adds chosen CardID to discardPile
  switch (num){
    case 1:
      if(!discardPile.includes(card1.cardNumber)){
        discardPile.push(card1.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card1.cardNumber + '. quit Clicking the same card') : null; }
    break;

    case 2:
      if(!discardPile.includes(card2.cardNumber)){
        discardPile.push(card2.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card2.cardNumber + '. quit Clicking the same card') : null; }
    break;

    case 3:
      if(!discardPile.includes(card3.cardNumber)){
        discardPile.push(card3.cardNumber);
      } else {(!debugOFF) ? console.log('Already picked card# = ' + card3.cardNumber + '. quit Clicking the same card') : null; }
    break;
    
    default:
      break;
    }

  (!debugOFF) ? console.log('Chosen card IDs = ' + discardPile) : null;
}

function endGameCheck(){
  if ( discardPile.length == (cardBank.length-2)){
    alert("Wow, you've used up all the cards!\nRefresh to play again!")

  } else {
    (!debugOFF) ? console.log((cardBank.length - discardPile.length + ' cards left')) : null;
  }
  
}