<template>
    <!-- fixe la fonte-size identique au portail -->
  <div id="app" style="font-size: 14px; line-height: 1.42857143 ;">
    <!-- img alt="Vue logo" src="./assets/logo.png" -->
    <menu-semaine is-demo></menu-semaine>
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
