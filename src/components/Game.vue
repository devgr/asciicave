<template>
  <div class="hello">
    <pre>{{ terminal }}</pre>
  </div>
</template>

<script>
import gameMain from '@/game-logic/main'
export default {
  name: 'Game',
  data () {
    let initialScreen = ''
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 80; x++) {
        initialScreen += ' '
      }
      initialScreen += '\n'
    }

    return {
      terminal: initialScreen
    }
  },
  methods: {
    updateTerminal (text) {
      this.terminal = text
    }
  },
  created () {
    // send a reference to this to the game main function, and start the game.
    gameMain(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  border: 1px white solid;
  display: inline-block;
}
pre {
  display: inline-block;
  margin: 20px;
}
</style>
