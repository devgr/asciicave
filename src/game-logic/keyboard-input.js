class KeyboardInput {
  constructor () {
    this.frameSnapshot = {
      up: {
        isPressed: false,
        isHeld: false
      },
      down: {
        isPressed: false,
        isHeld: false
      },
      left: {
        isPressed: false,
        isHeld: false
      },
      right: {
        isPressed: false,
        isHeld: false
      },
      space: {
        isPressed: false,
        isHeld: false
      }
    }
  }

  start () {
    // You know it's a game jam project when we're putting in raw event listeners.
    window.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'Space':
          this.frameSnapshot.space.isPressed = true
          this.frameSnapshot.space.isHeld = true
          break
        case 'ArrowUp':
          this.frameSnapshot.up.isPressed = true
          this.frameSnapshot.up.isHeld = true
          break
        case 'ArrowDown':
          this.frameSnapshot.down.isPressed = true
          this.frameSnapshot.down.isHeld = true
          break
        case 'ArrowLeft':
          this.frameSnapshot.left.isPressed = true
          this.frameSnapshot.left.isHeld = true
          break
        case 'ArrowRight':
          this.frameSnapshot.right.isPressed = true
          this.frameSnapshot.right.isHeld = true
          break
      }
    })
    window.addEventListener('keyup', (e) => {
      // don't change isPressed on keyup, it'll get reset at the end of the frame.
      switch(e.code) {
        case 'Space':
          this.frameSnapshot.space.isHeld = false
          break
        case 'ArrowUp':
          this.frameSnapshot.up.isHeld = false
          break
        case 'ArrowDown':
          this.frameSnapshot.down.isHeld = false
          break
        case 'ArrowLeft':
          this.frameSnapshot.left.isHeld = false
          break
        case 'ArrowRight':
          this.frameSnapshot.right.isHeld = false
          break
      }
    })
  }

  getInput () {
    let pastFrame = this.frameSnapshot
    this.resetPressed(pastFrame)
    return pastFrame
  }

  resetPressed (pastFrame) {
    this.frameSnapshot = {
      up: {
        isPressed: false,
        isHeld: pastFrame.up.isHeld
      },
      down: {
        isPressed: false,
        isHeld: pastFrame.down.isHeld
      },
      left: {
        isPressed: false,
        isHeld: pastFrame.left.isHeld
      },
      right: {
        isPressed: false,
        isHeld: pastFrame.right.isHeld
      },
      space: {
        isPressed: false,
        isHeld: pastFrame.space.isHeld
      }
    }
  }
}

export default KeyboardInput