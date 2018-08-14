import pieces from '@/game-logic/pieces'

class MapBuilder {
  constructor (difficulty) {
    this.difficulty = difficulty
    this.rowCount = 0
  }

  fillRow (row) {
    for (let x = 0; x < row.length; x++) {
      if (x % 3 === 0) {
        if (Math.random() < .6) {
          row[x].update(new pieces.Grain(), 0, 0)
        }
      } else {
        if (Math.random() < .05) {
          row[x].update(new pieces.Grain(), 0, 0)
        }
      }
    }
    this.rowCount++
  }
}

export default MapBuilder