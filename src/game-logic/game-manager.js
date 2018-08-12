import pieces from '@/game-logic/pieces'

const gameState = {
  INIT: 'INIT',
  MAIN_TITLE: 'MAIN_TITLE',
  START_PROMPT: 'START_PROMPT',
  GAME: 'GAME'
}

class GameManager {
  constructor (gameboard, playerClass, mapBuilderClass) {
    this.gameboard = gameboard
    this.playerClass = playerClass
    this.mapBuilderClass = mapBuilderClass
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
    let scoreStr = ' '
    if ((this.state === gameState.START_PROMPT || this.state === gameState.MAIN_TITLE) && input.space.isPressed) {
      this.startGame()
    } else if (this.state === gameState.GAME) {
      this.player.update(input)
      scoreStr = 'Score: ' + this.gameboard.worldY
    }


    // scroll the board
    if (this.framesSinceScroll >= this.scrollFactor) {
      if (this.state === gameState.GAME) {
        // add a new row
        let row = this.gameboard.newRow()
        // fill with generated map stuff
        this.mapBuilder.fillRow(row)
        this.gameboard.addRow(row)
        // move the player foward as the game scrolls
        this.player.scroll()
      } else {
        let row = this.gameboard.newRow()
        this.gameboard.addRow(row)
      }
      this.gameboard.scroll(this)

      this.framesSinceScroll = 0
    } else {
      this.framesSinceScroll++
    }
    return scoreStr
  }

  showStartPrompt () {
    this.state = gameState.START_PROMPT
    this.startPrompt = new pieces.StartPrompt()
    this.startPromptY = Math.round(this.gameboard.boardHeight / 2 - this.startPrompt.shape.length / 2) // center vertically
    this.startPromptX = Math.round(this.gameboard.boardWidth / 2 - this.startPrompt.shape[0].length / 2) // certer horizontally
    this.gameboard.placePiece(this.startPrompt, this.startPromptY, this.startPromptX)
    this.scrollFactor = Number.POSITIVE_INFINITY
  }

  startGame () {
    // remove start prompt piece
    this.state = gameState.GAME
    this.level = 1
    this.scrollFactor = 3
    
    this.mapBuilder = new this.mapBuilderClass(this.level)
    let board = this.gameboard.newBoard()
    for (let y = 0; y < board.length; y++) {
      this.mapBuilder.fillRow(board[y])
    }
    this.gameboard.setBoard(board)

    this.player = new this.playerClass(this, this.gameboard)
  }

}

export default GameManager