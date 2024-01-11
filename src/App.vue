<template>
    <!-- fixe la fonte-size identique au portail -->
  <div id="app" style="font-size: 14px; line-height: 1.42857143 ;">
    <!-- img alt="Vue logo" src="./assets/logo.png" -->
    <menu-semaine
      is-demo
      :app-portal-context="VUE_APP_PORTAL_CONTEXT"
      :app-user-info-uri="VUE_APP_USER_INFO_URI"
      :app-url-img="VUE_APP_URL_IMG"
      :app-url-rest-api="VUE_APP_URL_REST_API"
      :app-url-api-etab="VUE_APP_URL_API_ETAB"
      :app-url-rest-api-demo="VUE_APP_URL_REST_API_DEMO"
    />
  </div>
</template>

<script>
import MenuSemaine from './components/MenuSemaine.vue'

const {
  VUE_APP_PORTAL_CONTEXT,
  VUE_APP_USER_INFO_URI,
  VUE_APP_URL_IMG,
  VUE_APP_URL_REST_API,
  VUE_APP_URL_API_ETAB,
  VUE_APP_URL_REST_API_DEMO
} = process.env;

export default {
  name: 'app',
  components: {
    MenuSemaine
  },
  data () {
    return {
      VUE_APP_PORTAL_CONTEXT,
      VUE_APP_USER_INFO_URI,
      VUE_APP_URL_IMG,
      VUE_APP_URL_REST_API,
      VUE_APP_URL_API_ETAB,
      VUE_APP_URL_REST_API_DEMO
    }
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