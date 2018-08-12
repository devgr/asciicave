import pieces from '@/game-logic/pieces'

class MapBuilder {
  constructor (difficulty) {
    this.difficulty = difficulty
    this.rowCount = 0
    this.leftTrend = 1
    this.rightTrend = -1
    this.leftWall = 0
    this.rightWall = 79
  }

  fillRow (row) {
    if (this.rowCount === 0) {
      this.leftWall = 0
      this.rightWall = row.length - 1
      row[this.leftWall].update(new pieces.Wall(), 0, 0)
      row[this.rightWall].update(new pieces.Wall(), 0, 0)
      // keep the default trends going inward.
    } else {
      for (let x = 0; x <= this.leftWall + this.leftTrend; x++) {
        row[x].update(new pieces.Wall(), 0, 0)
      }
      for (let x = this.rightWall + this.rightTrend; x < row.length; x++) {
        row[x].update(new pieces.Wall(), 0, 0)
      }
      this.updateTrends(row.length - 1)
    }

    this.rowCount++
  }

  updateTrends (maxRight) {
    let probScaleChange = .4 * this.difficulty
    let maxChange = 20 * this.difficulty

    if (Math.random() < probScaleChange) {
      this.leftTrend = (Math.random() - .5) * maxChange
      if (this.leftTrend < 0 && this.leftWall <= 0) {
        this.leftTrend = 0
      }
      this.leftTrend = Math.round(this.leftTrend)
    }

    if (Math.random() < probScaleChange) {
      this.rightTrend = (Math.random() - .5) * maxChange
      if (this.rightTrend > 0 && this.rightWall >= maxRight) {
        this.rightTrend = 0
      }
      this.rightTrend = Math.round(this.rightTrend)
    }

    if ((this.rightWall + this.rightTrend) - (this.leftWall + this.leftTrend) <= 3) {
      this.leftTrend = 0
      this.rightTrend = 0
    }
  }
}

export default MapBuilder