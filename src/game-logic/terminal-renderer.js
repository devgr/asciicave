class TerminalRenderer {
  constructor (gameboard, domController) {
    this.gameboard = gameboard
    this.domController = domController
  }

  render () {
    let board = this.gameboard.board
    let output = ''

    for (let y = 0; y < board.length; y++) {
      let row = board[y]
      for (let x = 0; x < row.length; x++) {
        let spot = row[x]
        let sprite = spot.piece.sprite
        let char = sprite[spot.subY][spot.subX]
        output += char
      }
      output += '\n'
    }

    this.domController.updateTerminal(output)
  }
}

export default TerminalRenderer