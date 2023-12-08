import  { cardMaster }  from './modules/Data.js';


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
const bgImgDoOrDrink = 'https://placehold.co/333x500?text=Do-Or-Drink';
const bgImgConfessional = 'https://placehold.co/333x500?text=Confessional';
const bgImgJudgement = 'https://placehold.co/333x500?text=Judgement';
const bgImgHistory = 'https://placehold.co/333x500?text=History-Lesson';
const bgImgSimonSays ='https://placehold.co/333x500?text=Simon-Says';
const bgImgDeck =  'https://placehold.co/333x500?text=?';



//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
/*const cardMaster = [
  /*{
      type: "" The type of task,
      task: "" description,
      orElse: "" if you dont do it, do the fail task,
      spiceLevel: 5 how NSFW the task is, 1 is least 5 is super spice,
      tags:['clothing', 'food', 'social media', 'other']
  },

  {
      "id": 1,
      "type": "do_or_drink",
      "task": "Guess a fantasy of the player across from you, or take <span class='fail'></span>!",
      "orElse": "a drink, a shot,",
      "spiceLevel": 4,
      "tags": "guess, drink, across, 4+, sex"
  },
  {
      "id": 2,
      "type": "confessional",
      "task": "Tell the group your favourite sex position, or take <span class='fail'></span> to hide your shame!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": "confess, sex, group"
  },
  {
      "id": 3,
      "type": "simon_says",
      "task": "Act out your favourite sex position, or take  <span class='fail'></span>. Anyone who laughs takes two drinks!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": "charades, payback"
  },
  {
      "id": 4,
      "type": "confessional",
      "task": "Tell everyone what was the best thing your parents genes gave you? Gloat or take <span class='fail'></span>!",
      "orElse": "two drinks, a drink",
      "spiceLevel": 3,
      "tags": "gloat"
  },
  {
      "id": 5,
      "type": "history_lesson",
      "task": "Describe your first kiss, or take <span class='fail'></span>! If you havent kissed anyone, drink double!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 2,
      "tags": "kiss, double"
  },
  {
      "id": 6,
      "type": "assumptions_hurt",
      "task": "Have every player guess how many sexual partners you've had. The player with the closest guess gives <span class='fail'></span>!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": "sex, past, guess"
  },
  {
      "id": 7,
      "type": "confessional",
      "task": "Tell everyone the most adventurous location you've had sex, or take <span class='fail'></span> and hope you'll be more fun!",
      "orElse": "two drinks, a drink, a shot",
      "spiceLevel": 4,
      "tags": "public, sex"
  },
  {
      "id": 8,
      "type": "confessional",
      "task": "Tell the group about your most embarassing kiss or take <span class='fail'></span>, and look forward to better days!",
      "orElse": "two drinks, a drink, a shot",
      "spiceLevel": 4,
      "tags": "kiss, embarass"
  },
  {
      "id": 9,
      "type": "confessional",
      "task": "Tell everyone about your biggest turn off, or take <span class='fail'></span>!",
      "orElse": "a drink, a shot",
      "spiceLevel": 3,
      "tags": "turnoff, confess"
  },
  {
      "id": 10,
      "type": "confessional",
      "task": "What gives you the ick about the opposite sex? Everyone take <span class='fail'></span> to feel better about it. ",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 3,
      "tags": "group, "
  },
  {
      "id": 11,
      "type": "confessional",
      "task": "Have you bought any sex toys? No need to blush, just <span class='fail'></span> for each one you own!",
      "orElse": "a sip",
      "spiceLevel": 4,
      "tags": null
  },
  {
      "id": 12,
      "type": "odd_one_out",
      "task": "Everyone share their most embarassing sex story, and vote on who has it worst. Winner gives out <span class='fail'></span>!",
      "orElse": "two drinks, a drink, a shot, two shots",
      "spiceLevel": 5,
      "tags": null
  },
  {
      "id": 13,
      "type": "confessional",
      "task": "Take <span class='fail'></span> if you've ever sent a sext to the wrong person!",
      "orElse": "a drink, a shot",
      "spiceLevel": 4,
      "tags": null
  },
  {
      "id": 14,
      "type": "confessional",
      "task": "What is the sexiest song you've ever heard? Play it or take <span class='fail'></span>!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": null
  },
  {
      "id": 15,
      "type": "judgement_day",
      "task": "Whoever has had the most orgasms in a day gives out <span class='fail'></span>!",
      "orElse": "two drinks, two shot, three shots, three drinks",
      "spiceLevel": 5,
      "tags": null
  },
  {
      "id": 16,
      "type": "confessional",
      "task": "Tell everyone about the wierdest sex dream you've had or take <span class='fail'></span> in shame!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": null
  },
  {
      "id": 17,
      "type": "judgement_day",
      "task": "Take <span class='fail'></span> if you've ever had sex with a stranger or one-night-stange!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 5,
      "tags": null
  },
  {
      "id": 18,
      "type": "confessional",
      "task": "Tell everyone everyone about your biggest (non-sexual) turn on, or take <span class='fail'></span>!",
      "orElse": "a drink",
      "spiceLevel": 3,
      "tags": null
  },
  {
      "id": 19,
      "type": "confessional",
      "task": "What is #1 on your sex-bucket list? Speak or take <span class='fail'></span>!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 5,
      "tags": null
  },
  {
      "id": 20,
      "type": "judgement_day",
      "task": "Everyone take <span class='fail'></span> if you've been caught during sex!",
      "orElse": "two drinks, a drink, a shot,",
      "spiceLevel": 4,
      "tags": null
  }
];
*/
let cardBank = cardMaster;



const debugOFF = false;


let card1 = {};
let card2 = {};
let card3 = {};


//----------------------------------------------- 
//Logic Functions
//----------------------------------------------- 

console.log('cardbank = ' + cardBank);

domCard3.addEventListener("click", function(){
  console.log('eer');
  chooseCard(3);
}); 

domCard2.addEventListener("click", function(){
  console.log('eer');
  chooseCard(2);
}); 

domCard1.addEventListener("click", function(){
  console.log('eer');
  chooseCard(1);
}); 




domDeck.addEventListener("click", function(){
  console.log('eer');
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

  function setCard1(){
    //sets random card from cardBank. 
    let rndMax = cardBank.length -1;
    (!debugOFF) ? console.log('CardBank Length = ' + cardBank.length) : null;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard1 = ' + rndCardIndex) : null;
    card1 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card1.id, card1.type, card1, ) : null;
    domCard1Btxt.innerHTML = card1.task;
  }
  
  function setCard2(){
    //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard2 = ' + rndCardIndex) : null;
    card2 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card2.id, card2.type, card2, ) : null;
    domCard2Btxt.innerHTML = card2.task;
  }
  
  function setCard3(){
    //take random number from 0 to cardbank length
    let rndMax = cardBank.length -1;
    let rndCardIndex = Math.floor(Math.random() * (rndMax));
    (!debugOFF) ? console.log('initializeCard3 = ' + rndCardIndex) : null;
    card3 = cardBank[rndCardIndex];
    (!debugOFF) ? console.log(card3.id, card3.type, card3, ) : null;
    domCard3Btxt.innerHTML = card3.task;
  }
  
  function setRandomFailure(){
    if('orElse' in card1){
    let card1Rand = Math.floor(Math.random() * card1.orElse.length);
    (!debugOFF) ? console.log('card 2 fail choice = ' + card1Rand) : null;
    domCard1Btxt.querySelector('.fail').innerHTML = card1.orElse[card1Rand];
    }
    if('orElse' in card2){
    let card2Rand = Math.floor(Math.random() * card2.orElse.length);
    (!debugOFF) ? console.log('card 2 fail choice = ' + card2Rand) : null;
    domCard2Btxt.querySelector('.fail').innerHTML = card2.orElse[card2Rand];
    }
    if('orElse' in card3){
    let card3Rand = Math.floor(Math.random() * card3.orElse.length);
    (!debugOFF) ? console.log('card 2 fail choice = ' + card3Rand) : null;
    domCard3Btxt.querySelector('.fail').innerHTML = card3.orElse[card3Rand];
    }
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
}


function drawCard(){
  domDeck.classList.remove('deck-hide');

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
  
  domCard1.classList.add('card-draw1');
  domCard2.classList.add('card-draw2');
  domCard3.classList.add('card-draw3');
  domDeck.classList.add('deck-hide');
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
  }
  if (num == 2){
    domCard2.classList.remove('card-draw2');
    domCard2.classList.add('card-focus2');
    domCard2.querySelector('.card-inner').classList.add('cardflip')
    
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
  
    domCard3.classList.add('card-discard3');
    domCard3.classList.remove('card-draw3');
  }

  if (num == 3){
    domCard3.classList.add('card-focus3');
    domCard3.classList.remove('card-draw3');
    domCard3.querySelector('.card-inner').classList.add('cardflip')
    
    domCard2.classList.add('card-discard2');
    domCard2.classList.remove('card-draw2');
  
    domCard1.classList.add('card-discard1');
    domCard1.classList.remove('card-draw1');
  }
showDeck();
}

function hideDeck(){
  domDeck.classList.remove('deck-hide');
  void domDeck.offsetWidth;
  domDeck.classList.add('deck-hide');
}
function showDeck(){
  domDeck.classList.remove('deck-hide');

}



/*function createCard(cardItem){
  //create div elements for card construction
  const cardElem = document.createElement('div');
  const cardInnerElem = createElement('div');
  const cardFrontElem = createElement('div');
  const cardBackElem = createElement('div');

  //create front and back images
  const cardBackImg = createElement('img');
  const cardInfo = createElement('div');

  //add class and Id to card element
  addClassToElement(cardElem, 'card');
  addIdToElement(cardElem, cardBank.id);

  //add class to inner card element
  addClassToElement(cardInnerElem, 'card-inner');

  //add class to back card element
  addClassToElement(cardBackElem, 'back');

  //add class to front card element
  addClassToElement(cardFrontElem, 'front');

  //add src attribute to img - card back
  addSrcToImageElem(cardBackElem, )



}

function createElement(elemType){
  return document.createElement(elemType);
}

function addClassToElement(elem, className){
  elem.classList.add(className);
}

function addIdToElement(elem, id){
  elem.id = id;
}
function addSrcToImageElem(imgElem, src){
  imgElem.src = src;
}




function drawCards(){
    //if there are cards on the table, then add animation to move off screen, then remove.
    //if deck is visible, when player clicks, it adds 3 cards to the table
    //cards smooth transition from deck to table


}

//removes cards from table


function cardReveal(){
}

function deckVisibility(){
    //let deckVis = domDeck.classList.contains('visible');
    domDeck.classList.toggle("visible");
}

function deckCheck(){
    //if the deck is visible, return true
    //if deck is visible, and cards on table,
    //if the deck is invisible, return false
    }
    
*/    
function endGame(){
  alert("Wow, you've used up all the cards!\nRefresh to play again!")
}