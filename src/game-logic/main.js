import Gameboard from '@/game-logic/gameboard'
import TerminalRenderer from '@/game-logic/terminal-renderer'
import KeyboardInput from '@/game-logic/keyboard-input'
import PlayerManager from '@/game-logic/player-manager'
import GameManager from '@/game-logic/game-manager'

export default function gameMain (domController) {
  let gameboard = new Gameboard()
  let renderer = new TerminalRenderer(gameboard, domController)
  let inputer = new KeyboardInput(domController)
  let game = new GameManager(gameboard, PlayerManager)

  inputer.start()
  game.loadMainTitle()

  let gameLoop = () => {
    let input = inputer.getInput()
    game.update(input)
    renderer.render()
  }

  const FPS = 30
  const frameTimeMs = 1 / FPS * 1000
  window.setInterval(gameLoop, frameTimeMs)
}