import Gameboard from '@/game-logic/gameboard'
import TerminalRenderer from '@/game-logic/terminal-renderer'
import KeyboardInput from '@/game-logic/keyboard-input'
import PlayerManager from '@/game-logic/player-manager'
import GameManager from '@/game-logic/game-manager'
import MapBuilder from '@/game-logic/map-builder'

class GameMain {
  constructor (domController) {
    this.gameboard = new Gameboard()
    this.renderer = new TerminalRenderer(this.gameboard, domController)
    this.inputter = new KeyboardInput()
    this.gameManager = new GameManager(this.gameboard, PlayerManager, MapBuilder)

    this.inputter.start()
    this.gameManager.loadMainTitle()

    // Schedule the game loop
    const FPS = 30
    const frameTimeMs = 1 / FPS * 1000
    window.setInterval(() => {
      this.gameLoop() // lexical this for the win
    }, frameTimeMs)
  }

  gameLoop () {  
    let input = this.inputter.getInput()
    let ui = this.gameManager.update(input)
    this.renderer.render(ui)
    // wow, game dev is easy! 3 lines of code! oh wait...
  }
}

export default GameMain