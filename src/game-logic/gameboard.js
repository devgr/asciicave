import pieces from '@/game-logic/pieces'

const boardHeight = 24
const boardWidth = 80

class Spot {
  constructor (piece, subY, subX) {
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
    this.board = []
    for (let y = 0; y < this.boardHeight; y++) {
      this.board.push(this.newRow())
    }
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

  placePiece (piece, startY, startX) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === '1') {
          let spot = this.board[startY + y][startX + x]
          spot.piece = piece
          spot.subY = y
          spot.subX = x
        }
      }
    }
  }

  // removePiece (piece) {
  //   // I know this is a terrible algirithm :)
  //   for (let y = 0; y < this.boardHeight; y++) {
  //     for (let x = 0; x < this.boardWidth; x++) {
  //       let spot = this.board[y][x]
  //       if (spot.piece === piece) {
  //         spot.piece = new pieces.Blank()
  //         spot.subY = 0
  //         spot.subX = 0
  //       }
  //     }
  //   }
  // }

  removePieceAt (piece, y, x) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === '1') {
          let spot = this.board[startY + y][startX + x]
          spot.piece = new pieces.Blank()
          spot.subY = 0
          spot.subX = 0
        }
      }
    }
  }

  movePieceAtTo (piece, atY, atX, toY, toX) {
    self.removePieceAt(piece, atY, atX)
    self.placePiece(piece, toY, toX)
  }

  scroll (gameManager) {
    // check the pieces being removed and call their onExit methods
    let topRow = this.board[0]
    for (let x = 0; x < topRow.length; x++) {
      topRow[x].piece.onExit(gameManager)
    }
    this.board.shift() // remove the top row
    this.board.push(this.newRow())
    this.worldY++
  }

}

export default Gameboard