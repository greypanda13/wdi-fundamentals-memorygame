console.log("Up and running!");

var cardOne;
var cardTwo;
var cardThree;
var cardFour;

var cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];

cardOne = cards[0];
cardsInPlay.push(cardOne);
console.log("User flipped " + cardOne);

cardTwo = cards[2];
cardsInPlay.push(cardTwo);
console.log("User flipped " + cardTwo);

if (cardsInPlay.length === 2) {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    alert("You found a match!")
  } else {
    alert("Sorry, try again.")
  }
}
