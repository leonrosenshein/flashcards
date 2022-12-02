// const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Round = require('./Round');
const Deck = require('./Deck');

class Game {
  constructor() {
    this.currentRound = 0
  }
  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }
  printQuestion(round) {
    return util.main(round);
  }
  setUpFunctions() { 
    this.deck = new Deck()
    this.round = new Round(this.deck)
  }
  async start() {
    this.setUpFunctions()
    this.printMessage(this.deck,this.round)
    const d = await this.printQuestion(this.round)
    return Promise.resolve(d)
  }
  async playGame() {
    var score
    do {
      const duration = await this.start()
      console.log(`Your round took ${duration} milliseconds to play.`)
      score = this.round.calculatePercentCorrect()
      if (score < 90) {
        console.log(`Sorry. You only got ${score}% correct and you need >= 90% to pass. Please try again.`)
      } else {
        console.log(`Congratulations!!!. You got ${score}%.`)
      }
    } while (score < 90)
  }
}

module.exports = Game;