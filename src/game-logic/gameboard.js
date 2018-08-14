import pieces from '@/game-logic/pieces'

const boardHeight = 24
const boardWidth = 80

class Spot {
  constructor (piece, subY, subX) {
    this.update(piece, subY, subX)
  }

  update (piece, subY, subX) {
    this.piece = piece
    this.subY = subY
    this.subX = subX
  }
}

class Gameboard {
  constructor () {
    this.boardHeight = boardHeight
    this.boardWidth = boardWidth
    this.worldY = 0 // vertical scroll distance

    // fill the board with empty pieces
    this.board = this.newBoard()
  }

  newBoard () {
    let board = []
    for (let y = 0; y < this.boardHeight; y++) {
      board.push(this.newRow())
    }
    return board
  }

  newRow () {
    let row = []
    for (let x = 0; x < this.boardWidth; x++) {
      let piece = new pieces.Blank()
      let spot = new Spot(piece, 0, 0)
      row.push(spot)
    }
    return row
  }

  setBoard (filledBoard) {
    this.worldY = 0
    this.board = filledBoard
  }

  placePiece (piece, startY, startX) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === '1') {
          let spot = this.board[startY + y][startX + x]
          if (spot.piece instanceof pieces.Grain) {
            this.worldY++
          }
          spot.piece = piece
          spot.subY = y
          spot.subX = x
        }
      }
    }
  }

  removePieceAt (piece, boardY, boardX) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === '1') {
          let spot = this.board[boardY + y][boardX + x]
          spot.piece = new pieces.Blank()
          spot.subY = 0
          spot.subX = 0
        }
      }
    }
  }

  movePieceAtTo (piece, atY, atX, toY, toX) {
    this.removePieceAt(piece, atY, atX)
    this.placePiece(piece, toY, toX)
  }

  addRow (filledRow) {
    this.board.push(filledRow)
  }

  scroll (gameManager) {
    // check the pieces being removed and call their onExit methods
    let topRow = this.board[0]
    for (let x = 0; x < topRow.length; x++) {
      topRow[x].piece.onExit(gameManager)
    }
    this.board.shift() // remove the top row
  }

}

export default Gameboard