class KeyboardInput {
  constructor (domController) {
    this.domController = domController
  }

  start () {
    window.console.log('todo')
  }

  getInput () {
    return {
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
}

export default KeyboardInput