import pieces from '@/game-logic/pieces'

const gameState = {
  INIT: 'INIT',
  MAIN_TITLE: 'MAIN_TITLE',
  START_PROMPT: 'START_PROMPT',
  GAME: 'GAME'
}

class GameManager {
  constructor (gameboard, playerClass) {
    this.gameboard = gameboard
    this.playerClass = playerClass
    this.player = null
    this.state = gameState.INIT
    this.scrollFactor = 1 // wait this many frames between scrolls
    this.framesSinceScroll = 0
    this.level = 0
  }

  loadMainTitle () {
    // show the title scrolling up the screen
    this.state = gameState.MAIN_TITLE
    let title = new pieces.MainTitle()
    let startY = this.gameboard.boardHeight - title.shape.length // start at bottom of screen
    let startX = Math.round(this.gameboard.boardWidth / 2 - title.shape[0].length / 2)
    this.gameboard.placePiece(title, startY, startX)
    this.scrollFactor = 3
  }

  update (input) {
    // called from main game loop
    if (this.state === gameState.START_PROMPT && input.space.isPressed) {
      this.startGame()
    } else if (this.state === gameState.GAME) {
      this.player.update(input)
    }

    // scroll the board
    if (this.framesSinceScroll >= this.scrollFactor) {
      if (this.state === gameState.GAME) {
        // move the player foward as the game scrolls
        this.player.scroll()
      }
      this.gameboard.scroll(this)
      this.framesSinceScroll = 0
    } else {
      this.framesSinceScroll++
    }
  }

  showStartPrompt () {
    this.state = gameState.START_PROMPT
    this.startPrompt = new pieces.StartPrompt()
    this.startPromptY = Math.round(this.gameboard.boardHeight / 2 - this.startPrompt.shape.length / 2) // center vertically
    this.startPromptX = Math.round(this.gameboard.boardWidth / 2 - this.startPrompt.shape[0].length / 2) // certer horizontally
    this.gameboard.placePiece(this.startPrompt, startPromptY, startPromptX)
    this.scrollFactor = Number.POSITIVE_INFINITY
  }

  startGame (input) {
    // remove start prompt piece
    this.gameboard.removePieceAt(this.startPrompt, startPromptY, startPromptX)
    this.state = gameState.GAME
    this.level = 1
  }

  createPlayer () {
    this.player = new playerClass(this, this.gameboard)
  }

}

export default GameManager