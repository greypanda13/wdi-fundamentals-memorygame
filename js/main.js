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
    console.log(cardsInPlay[cardsInPlay.length - (i + 1)]);
    /*var n = cardsInPlay[cardsInPlay.length - (i + 1)];
    cards[n].isFaceUp = false;
    document.getElementsByTagName('img')[n].setAttribute('src', 'images/back.png');*/
  }

  //accept 'OK' button press before popping
  for (i = 1; i >= 0; i--) {
    cardsInPlay.pop();
  }
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
      console.log("Sorry, try again.");
      score.current = score.current - 1;
      console.log(score.current);
      document.getElementById('scorePrint').textContent = score.current;
      //flip cards back over
      lastFaceDown();
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
  if (cards[cardId].isFaceUp===false) {
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
