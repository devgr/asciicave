import pieces from '@/game-logic/pieces'

class PlayerManager {
  constructor (gameManager, gameboard) {
    this.gameManager = gameManager
    this.gameboard = gameboard

    this.spawn()
  }

  spawn () {
    this.piece = new pieces.PlayerShip()
    this.y = 2
    this.x = Math.round(this.gameboard.boardWidth / 2 - this.piece.shape[0].length / 2) // certer horizontally
    this.gameboard.placePiece(this.piece, y, x)
  }

  update (input) {
    return input // TODO
  }

  scroll () {
    // move forward as the game scrolls
    this.gameboard.movePieceTo(this.piece, this.y, this.x, this.y + 1, this.x)
    this.y++
  }
}

export default PlayerManager