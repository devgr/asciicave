class Piece {
  onExit () {}
}

class Blank extends Piece {
  constructor () {
    super()
    this.sprite = [' ']
    this.shape =  ['1']
  }
}

class MainTitle extends Piece {
  constructor () {
    super()
    this.sprite = ['ASCII CAVE']
    this.shape =  ['1111111111']
    this.alreadyExited = false
  }

  onExit (gameManager) {
    if (!this.alreadyExited) {
      gameManager.showStartPrompt()
      this.alreadyExited = true
    }
  }
}

class StartPrompt extends Piece {
  constructor () {
    super()
    this.sprite = ['Press <space> to start.']
    this.shape =  ['11111111111111111111111']
  }
}

class PlayerShip extends Piece {
  constructor () {
    super()
    this.sprite = ['[ ]',
                   '\\@/',
                   ' V ']
    this.shape =  ['1 1',
                   '111',
                   ' 1 ']
  }
}

class Wall extends Piece {
  constructor () {
    super()
    this.sprite = ['#']
    this.shape =  ['1']
  }
}

let pieces = {Blank, MainTitle, StartPrompt, PlayerShip, Wall}

export default pieces