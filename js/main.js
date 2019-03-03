console.log("Up and running!");

var cardOne;
var cardTwo;
var cardThree;
var cardFour;

var cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];

function checkForMatch() {
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      console.log("You found a match!");
    } else {
      console.log("Sorry, try again.");
    }
  }
}

function flipCard (cardId) {
  console.log("User flipped " + cards[cardId]);
  cardsInPlay.push(cardId);

  checkForMatch();
}

flipCard(0);
flipCard(2);
