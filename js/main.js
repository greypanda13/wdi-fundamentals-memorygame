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

var score = {
  current: 0,
  highscore: 0
}

var cardsInPlay = [];

function nextRound() {
  round = round + 1;
  document.getElementById('roundPrint').textContent = round;
}

function cantFlip() {
  console.log("Can't flip. Already face-up.");
}

function mustClickButton() {
  console.log("Please click 'OK' button to proceed with gameplay.");
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
  /*for (var i = 0; i <= 1; i++) {
    console.log(cardsInPlay[cardsInPlay.length - (i + 1)]);

    var n = cardsInPlay[cardsInPlay.length - (i + 1)];
    //cards[n].isFaceUp = false;
    //document.getElementsByTagName('data-id')[n].setAttribute('src', 'images/back.png');
    //console.log(n);
  }*/
  var m = document.getElementsByTagName('data-id');
  console.log(m);

  //accept 'OK' button press before popping
  for (i = 1; i >= 0; i--) {
    cardsInPlay.pop();
  }
}

function hideAlertCenter() {
  var alertCenter = document.getElementById('alert-center');
  alertCenter.innerHTML = '';
}

function okButtonEvents() {
  noButtonClickNeeded();
  lastFaceDown();
  hideAlertCenter();
}

function checkForMatch() {
  if (cardsInPlay.length % 2 === 0) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      console.log("You found a match!");
      score.current = score.current + 1;
      console.log(score.current);
      document.getElementById('scorePrint').textContent = score.current;
      //pause before flipping cards back over, if possible
      if (cardsInPlay.length === cards.length) {
        allFaceDown();
        nextRound();
      }
    } else {
      isButtonClickNeeded = true;
      console.log("Sorry, try again.");
      score.current = score.current - 1;
      console.log(score.current);
      document.getElementById('scorePrint').textContent = score.current;
      //alert player score has gone down; cards will be flipped back over
      var alertTextElement = document.createElement('p');
      alertTextElement.setAttribute('id', 'alert-p')
      document.getElementById('alert-center').appendChild(alertTextElement);
      document.getElementById('alert-p').textContent = "Not a match! 1 point has been deducted.";
      var okButtonElement = document.createElement('button');
      okButtonElement.setAttribute('id', 'alertPushButton');
      okButtonElement.addEventListener('click', okButtonEvents);
      document.getElementById('alert-center').appendChild(okButtonElement);
    }
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
  //var buttonElement = document.createElement('button');
  //cardElement.setAttribute('data-id', 'restartButton');
  //cardElement.addEventListener('click', );
  //document.getElementById('game-board').appendChild(cardElement);
}

function flipCard () {
  var cardId = this.getAttribute('data-id');
  //console.log("cards[" + cardId + "].isFaceUp = " + cards[cardId].isFaceUp);
  if (isButtonClickNeeded) {
    mustClickButton();
  } else if (cards[cardId].isFaceUp===false) {
    console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
    var newAlertString = "User flipped " + cards[cardId].rank + " of " + cards[cardId].suit;
    var actionNarration = document.createElement('li');
    actionNarration.setAttribute('message-text', newAlertString);
    //narrationNo.toString();
    document.getElementById('message-center').appendChild(actionNarration);    cardsInPlay.push(cards[cardId].rank);
    this.setAttribute('src', cards[cardId].cardImage);
    cards[cardId].isFaceUp = true;
    checkForMatch();
  } else {
    cantFlip();
  }
}

createBoard();

//when done, submit using https://goo.gl/forms/POhiqySbWZs5c0n63
