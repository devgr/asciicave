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
    this.gameboard.placePiece(this.piece, this.y, this.x)
  }

  update (input) {
    let changeY = 0
    let changeX = 0

    if (input.down.isHeld && !input.down.isPressed) { // been held for more than 1 frame
      changeY += 2
    } else if (input.down.isPressed) { // pressed during this frame
      changeY += 1
    }
    if (input.up.isHeld && !input.up.isPressed) {
      changeY -= 2
    } else if (input.up.isPressed) {
      changeY -= 1
    }
    if (input.right.isHeld && !input.right.isPressed) {
      changeX += 2
    } else if (input.right.isPressed) {
      changeX += 1
    }
    if (input.left.isHeld && !input.left.isPressed) {
      changeX -= 2
    } else if (input.left.isPressed) {
      changeX -= 1
    }

    if (this.y + changeY >= this.gameboard.boardHeight - 3 || this.y + changeY < 0) {
      changeY = 0
    }
    if (this.x + changeX >= this.gameboard.boardWidth - 2 || this.x + changeX < 0) {
      changeX = 0
    }

    this.gameboard.movePieceAtTo(this.piece, this.y, this.x, this.y + changeY, this.x + changeX)
    this.y += changeY
    this.x += changeX
  }

  scroll () {
    // board about to be scrolled, need to remove y sprite, put back at y + 1
    this.gameboard.movePieceAtTo(this.piece, this.y, this.x, this.y + 1, this.x)
  }
}

export default PlayerManager