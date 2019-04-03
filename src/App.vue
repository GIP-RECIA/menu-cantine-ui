<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <menu-semaine></menu-semaine>
  </div>
</template>

<script>
import MenuSemaine from './components/MenuSemaine.vue'

export default {
  name: 'app',
  components: {
    MenuSemaine
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
