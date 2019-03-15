console.log("Up and running!");

var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png",
    isFaceUp: false
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png",
    isFaceUp: false
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png",
    isFaceUp: false
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png",
    isFaceUp: false
  }
]

var isButtonClickNeeded = false;
var narrationNo = 1;
var round = 1;
var impassNo = 0;
var impassThrown = false;

var score = {
  current: 0,
  highscore: 0
}


//BORROWED CODE FROM STACK OVERFLOW. add in if time permits.
/*
const out = document.getElementById("out");
let c = 0;

setInterval(function() {
    // allow 1px inaccuracy by adding 1
    const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

    const newElement = document.createElement("div");

    newElement.textContent = format(c++, 'Bottom position:', out.scrollHeight - out.clientHeight,  'Scroll position:', out.scrollTop);

    out.appendChild(newElement);

    // scroll to bottom if isScrolledToBottom is true
    if (isScrolledToBottom) {
      out.scrollTop = out.scrollHeight - out.clientHeight;
    }
}, 500);

function format () {
  return Array.prototype.slice.call(arguments).join(' ');
}
*/






var cardsInPlay = [];

function nextRound() {
  round = round + 1;
  document.getElementById('roundPrint').textContent = round;
}

function resetRound() {
  round = 1;
  document.getElementById('roundPrint').textContent = round;
}

function cantFlip() {
  console.log("Can't flip. Already face-up.");
}

function mustClickButton() {
  var impassNotifier = document.querySelector('.impass');
  if (impassThrown === false) {
    console.log("Please click button below to proceed with gameplay.");
    var impassMessage = document.createElement('p');
    impassMessage.textContent = "Please click 'OK' button to proceed with gameplay.";
    impassNotifier.setAttribute('id', 'impass-p');
    impassNotifier.appendChild(impassMessage);
    impassThrown = true;
    impassNo = impassNo + 1;
  } else {
    if (impassNo % 2 === 0) {
      impassNotifier.setAttribute('id', 'impass-p');
      impassNo = impassNo + 1;
    } else {
      impassNotifier.setAttribute('id', 'impass-y');
      impassNo = impassNo + 1;
    }
  }
}

function noButtonClickNeeded() {
  isButtonClickNeeded = false;
}

function allFaceDown() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].isFaceUp = false;
    document.getElementsByTagName('img')[i].setAttribute('src', 'images/back.png');
  }
  for (i = cardsInPlay.length; i >= 0; i--) {
    cardsInPlay.pop();
  }
}

function lastFaceDown() {
  console.log("Will turn back over ");
  for (var i = 0; i <= 1; i++) {
    var rank = cardsInPlay[cardsInPlay.length - (i+1)].rank;
    var suit = cardsInPlay[cardsInPlay.length - (i+1)].suit;
    console.log(rank + " of " + suit);
    var cardId = cardsInPlay[cardsInPlay.length - (i+1)].cardId;
    var cardToChange = document.getElementsByTagName('img')[cardId];
    cardToChange.src = 'images/back.png';
    cards[cardId].isFaceUp = false;
  }

  //accept 'OK' button press before popping
  for (i = 1; i >= 0; i--) {
    cardsInPlay.pop();
  }
}

function hideAlertCenter(x) {
  var alertCenter = document.querySelector('.alert-center');
  alertCenter.innerHTML = '';
  alertCenter.setAttribute('id', x);
}

function impassDisarm() {
  var impassDiv = document.querySelector('.impass');
  impassDiv.setAttribute('id', 'impass-d');
  impassDiv.innerHTML = '';
  impassNo = 0;
  impassThrown = false;
}

function okButtonEvents() {
  noButtonClickNeeded();
  lastFaceDown();
  hideAlertCenter('neutral');
  impassDisarm();
}

function nextRoundButtonEvents() {
  allFaceDown();
  nextRound();
  hideAlertCenter('neutral');
}

function resetScore() {
  score.highscore = score.current;
  score.current = 0;
  document.getElementById('scorePrint').textContent = score.current;
  document.getElementById('highScorePrint').textContent = score.highscore;
}

function restartButtonEvents() {
  noButtonClickNeeded();
  allFaceDown();
  resetScore();
  resetRound();
  hideAlertCenter('neutral');
  impassDisarm();
}

function recordMessage(newAlertString) {
  console.log(newAlertString);
  //save for last to print all in one line.
  var actionNarration = document.createElement('li');    actionNarration.textContent = newAlertString;
  //actionNarration.setAttribute('message-text', newAlertString);
  //narrationNo.toString();
  document.getElementById('message-list').appendChild(actionNarration);
}

function checkForMatch(newAlertString) {
  if (cardsInPlay.length % 2 === 0) {
    if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
      console.log("You found a match!");
      score.current = score.current + 1;
      newAlertString = newAlertString + " You found a match! +1 pt. Total score now " + score.current + ".";
      console.log(score.current);

      recordMessage(newAlertString);

      document.getElementById('scorePrint').textContent = score.current;
      var hiddenAlert = document.getElementById('neutral');
      if (cardsInPlay.length === cards.length) {
        var alertTextElement = document.createElement('p');
        alertTextElement.setAttribute('id', 'alert-p-good');
        hiddenAlert.appendChild(alertTextElement);
        hiddenAlert.setAttribute('id', 'good');
        document.getElementById('alert-p-good').textContent = "Good matching! Click below button to advance to next round.";
        var proceedButtonElement = document.createElement('button');
        proceedButtonElement.setAttribute('id', 'nextRoundPushButton');
        proceedButtonElement.addEventListener('click', nextRoundButtonEvents);
        document.getElementById('good').appendChild(proceedButtonElement);
      }
    } else {
      isButtonClickNeeded = true;
      console.log("Sorry, try again.");
      score.current = score.current - 1;
      console.log(score.current);
      document.getElementById('scorePrint').textContent = score.current;

      newAlertString = newAlertString + " Sorry, try again. -1 pt. Total score now " + score.current + ".";
      console.log(score.current);

      recordMessage(newAlertString);

      var alertTextElement = document.createElement('p');
      alertTextElement.setAttribute('id', 'alert-p-bad');
      document.querySelector('.alert-center').setAttribute('id', 'bad');
      document.querySelector('.alert-center').appendChild(alertTextElement);
      document.getElementById('alert-p-bad').textContent = "Not a match! 1 point has been deducted. Click button to continue.";
      var okButtonElement = document.createElement('button');
      okButtonElement.setAttribute('id', 'alertPushButton');
      okButtonElement.addEventListener('click', okButtonEvents);
      document.querySelector('.alert-center').appendChild(okButtonElement);
    }
  } else {
    recordMessage(newAlertString);
  }
}

function createBoard() {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  }
  var buttonElement = document.getElementById('restartButton');
  buttonElement.addEventListener('click', restartButtonEvents);
}

function flipCard () {
  var cardId = this.getAttribute('data-id');
  //console.log("cards[" + cardId + "].isFaceUp = " + cards[cardId].isFaceUp);
  if (isButtonClickNeeded) {
    mustClickButton();

  } else if (cards[cardId].isFaceUp===false) {
    console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit) + ".";
    var newAlertString = ("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit + ".");
    cards[cardId].cardId = cardId;  cardsInPlay.push(cards[cardId]);
    this.setAttribute('src', cards[cardId].cardImage);
    cards[cardId].isFaceUp = true;
    checkForMatch(newAlertString);
  } else {
    cantFlip();
  }
}

createBoard();
hideAlertCenter('neutral');

//when done, submit using https://goo.gl/forms/POhiqySbWZs5c0n63
