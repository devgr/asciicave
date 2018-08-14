<template>
  <div id="app">
    <h1>ASCII FARMER</h1>
    <Game />
    <br />
    <pre>{{ instructions }}</pre>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  },
  data () {
    return {
      instructions: "Instructions:\n\nArrow keys to move.\nSpace to fire.\nCollect power-ups.\nDon't crash."
    }
  }
}
</script>

<style>
#app {
  font-family: monospace;
  text-align: center;
  color: white;
  margin-top: 60px;
}
h1{
  margin: 0;
  padding: 10px;
}
html{
  background-color: black;
}
</style>
