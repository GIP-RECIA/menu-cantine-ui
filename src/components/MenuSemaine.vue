<template>
  <div id="menusemaine" ref="menuSemaineRef">
    <loading :active.sync="isLoading"
             :can-cancel="false"
             :is-full-page="true"/>
    <div v-if="mode_dev">
      <span>Vous pouvez saisir l'UAI de l'établissement </span> 
      <input v-if="mode_dev" v-model="selected" @change="loadMenu('');">
      <input v-if="mode_dev" v-model="noSemaine" @change="loadMenu('');">
    </div>
    <header  class="titre">
      <div v-if="debutPeriode">
        <button class="week" v-if="prevWeek" @click="callPrevWeek()" type='button' >&lt;</button>
        <div>
        <!-- span>Semaine </span><wbr/-->
        <span>   {{ debutPeriode | minusYear}} </span><wbr/>
        <span>au {{ finPeriode | minusYear }}</span>
        </div>
        <button class="week" v-if="nextWeek"  @click="callNextWeek()" type='button' >&gt;</button>
      </div>  
    </header>
    <div v-if="erreur">{{erreur}}</div>
    <modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:plat="plat"
      v-bind:gemrcn_list="gemRcnData"
      v-bind:url_img="urlImg">
    </modal>
    <section ref="semaineref" v-if="menuSemaine && (nbJour > 0)" class="semaine">
      <vue-glide ref="glideref" :options="glideOptions" @change="calculMaxPlats" v-model="active" >
        <template slot="control">
          <button data-glide-dir="<" class="left" :class="{hide : hidePrev}">&lt;</button>
          <button data-glide-dir=">" class="right" :class="{hide : hideNext}" >&gt;</button>

        </template>
        <vue-glide-slide v-for="(jour, index) in jours" :key="index">
          <jour
            ref="jourref"
            :jour="jour"
            :gem_rcn_data="gemRcnData"
            :display_modal="displayModal"
            :url_img="urlImg"
            :nb_plats_max="maxPlats"
          />
        </vue-glide-slide>
      </vue-glide>
    </section>
    <div v-if="! menuSemaine" id="divVideMenuSemaine" style="width: 100%">&nbsp;<!-- une div non vide pour le calcul de la largeur de breakpoint --></div>
  </div>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import MenuModal from '@/components/MenuModal'
import MenuJour from '@/components/MenuJour'
 // eslint-disable-next-line
import fetchUserInfoAndOrg from '../services/fetchUserInfoAndOrgs';
import oidc from '@uportal/open-id-connect';
import { nbViewByBreakpoint, initBreakpoints, activeByBreakpoint } from  '../services/breakpointService';
import { calculMaxJour , calculMaxSemaine } from  '../services/calculMaximum';
import Loading from 'vue-loading-overlay';
// import 'vue-glide-js/dist/vue-glide.css' en single file compoment les ccs doivent être importer dans la section css 

export default {
  name: 'MenuSemaine',
 /* computed: {
    getActive (){return this.active},
    setActive (arg){this.active = arg}
  },
*/
  props: {
    isDemo: Boolean,
    appPortalContext: String,
    appUserInfoUri: String,
    appUrlImg: String,
    appUrlRestApi: String,
    appUrlApiEtab: String,
    appUrlRestApiDemo: String
  },
  data () {
    return {
      isLoading: false,
      mode_dev: (process.env.NODE_ENV === 'development' || process.env.VUE_APP_ENV === 'dev' ),
      menuSemaine: '',
      debutPeriode: '',
      finPeriode: '',
      jours: '',
      plat: '',
      selected: '',
      noSemaine: '',
      erreur: '',
      showModal: false,
      gemRcnData: '',
      // eslint-disable-next-line 
      maxPlats: (service, partie) => {
        return 0
      },
      active: 0,
      nbJour: 6,
      hideNext: false,
      hidePrev: false,
      nextWeek: false,
      prevWeek: false,
      glideOptions: {
        type: 'slider',
        breakpoints: {},
        perView: 5,
        bound: true,
        perTouch: 1,
        rewind: false,
        gap: 0
      },
      info: {
        organizations: [],
        user: {},
        uai: ''
      },
    }
  },
  components: {
    modal: MenuModal,
    jour: MenuJour,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    loading: Loading
  },
  filters: {
    minusYear: function(jour) {
      if (!jour) return ''
      var tab = jour.split(' ')
      return '' + tab[0] + ' ' + tab[1]
    }
  },
  created () {
     // setBreakpoint(this.nbJour, this.glideOptions)
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.onresize);
    })
    if (! this.isDemo) {
      var objVue = this;
      this.fetchUserInfo().then( encoded => {
        objVue.loadMenuEncoded(encoded, '');
      }).catch(function(err){
        // eslint-disable-next-line
        console.log('erreur: ' + err);
      });
    }
  },

  
  methods: {
    callPrevWeek: function () {
      this.loadMenu(this.prevWeek)
    },

    callNextWeek: function () {
      this.loadMenu(this.nextWeek)
    },

    onresize: function () {
      if (this.menuSemaine) {
      //  var nbView = this.$refs.glideref.glide.settings.perView
        var nbView = nbViewByBreakpoint(this.glideOptions.breakpoints)
        var nbBlanc = nbView - this.nbJour + this.active
        if (nbBlanc > 0) {
          this.active = this.active - nbBlanc
        }
      }
    },

    displayModal: function (plat) {
      this.plat = plat
      this.showModal = true
    },
    urlImg: function (img){
      if (img && img.indexOf('/') < 0 ) {
        return this.appUrlImg + img 
      } 
      return img
    },

    calculMaxPlats: function () {
      
     // var nbView = this.$refs.glideref.glide.settings.perView
        var nbView = nbViewByBreakpoint(this.glideOptions.breakpoints)
        this.hideNext = this.nbJour <= (nbView + this.active)
        this.hidePrev = this.active <= 0
        var allMaxPlat = calculMaxSemaine(
          this.jours,
          this.active,
          nbView
        )
        this.maxPlats = (service, partie) => {
          return calculMaxJour(service, partie, allMaxPlat)
        }
      
    },
    async fetchUserInfo() {
      // this.loadingState.user = false;
      // this.loadingState.organization = false;
      if (process.env.NODE_ENV !== 'development' ) {
        const {user, organizations, bearer} =  await fetchUserInfoAndOrg(
            this.appPortalContext + this.appUserInfoUri,
            this.appUrlApiEtab,
            'ESCOSIRENCourant',
            false
        );
        this.info.user = Object.assign({}, this.info.user, user)
        
        // this.loadingState.user = true;
        this.info.organizations = organizations

        if (organizations) {
          this.info.uai = organizations[0].code
        }

        return bearer
      }
    },
    async loadMenu(dJour) {

      if (this.isDemo) {
        this.loadMenuEncoded(null, dJour);
      } else {
        const encoded = (await oidc({ userInfoApiUrl: this.appPortalContext + this.appUserInfoUri })).encoded
        this.loadMenuEncoded(encoded, dJour);
      }
    },
    
    loadMenuEncoded(encoded, dJour) {
      // this.fetchUserInfo() 
      this.menuSemaine = ''
      this.erreur = ''

      if (dJour) {
        this.noSemaine = ''
      }
      
      var uaiEtab = this.info.uai
      
      if (! uaiEtab) {
        uaiEtab = this.selected
        if (this.info.user) {
          this.mode_dev = true
        }
      } 
      
      var url;
      if (this.isDemo) {
        
        if (this.selected) {
          uaiEtab = this.selected
        }
        url = this.appUrlRestApiDemo
      } else {
        url = this.appUrlRestApi
      }
      var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }

      if (encoded != null) {
        headers['Authorization'] = 'Bearer ' + encoded
      }

      this.isLoading = true;

      if(uaiEtab != ""){
        fetch(
          url+"?uai="+uaiEtab+"&dateJour="+dJour+"&semaine="+this.noSemaine,
          {
            headers: headers,
            method: 'GET',
            credentials: 'omit',
            mode: 'cors'
          }
        ) .then(response => {
              return response.json()
          })
          .then(json => this.traitementReponse(json))
          .catch(error => this.traitementErreur(error))
      }
        
    },
    traitementReponse (json) {
      if (json.messageErreur) {
        this.erreur = json.messageErreur
        this.menuSemaine = ''
        this.debutPeriode = json.debut
        this.finPeriode = json.fin
        this.nextWeek = json.nextWeek
        this.prevWeek = json.previousWeek
      } else {
        this.menuSemaine = json
        this.debutPeriode = json.debut
        this.finPeriode = json.fin
        this.gemRcnData = json.allGemRcn
        this.jours = json.jours
        this.nbJour = json.nbJours
        if(json.nbJours == 0){
          this.erreur = "Aucun menu n'a été trouvé pour cette semaine."
        }
        this.nextWeek = json.nextWeek
        this.prevWeek = json.previousWeek
        this.glideOptions.animationDuration = 0
        this.glideOptions.perView = json.nbJours
        this.glideOptions.breakpoints = initBreakpoints(this.nbJour)
        
        this.active = activeByBreakpoint(this.glideOptions.breakpoints, json.requete.dateJour, json.nbJours, json.jours)

        this.isLoading = false;
        
          // on rétablit l'animation
        this.$nextTick(() => {
          if(this.nbJour > 0){
            this.$refs.glideref.glide.settings.animationDuration = 1000
          }       
        })  
      }
    },
    traitementErreur(error){
      this.erreur = 'Une erreur de connexion au serveur est survenue :' + error;
      this.isLoading = false;
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../node_modules/vue-glide-js/dist/vue-glide.css';
@import '../../node_modules/vue-loading-overlay/dist/vue-loading.css';
// @import '../css/vue-glide.css';
div#menusemaine {
  font-size: 14px;
  line-height: 20px;
  .semaine {
    //font-size: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    /deep/ ul {
      margin-top: 0;
    }
  }
  > header {
    display: block;
    margin-left:auto;
    margin-right: auto;
    font-size: 16px;
    white-space: pre-wrap;
    text-align: center;
    background-color: #545454;
    button {
      //color: #686868;
      //color: #e1e1e1;
      border: 0px;
      //opacity: 1;
      background-color: transparent;
      font-size: 32px;
      font-weight: bold;
      margin-top: -10px;
      margin-bottom: -12px;
      padding-left: 16px;
      padding-right: 16px;
    }
    > span:first-child {
      display: table;
      margin-left: auto;
      margin-right: auto;
    }
    span {
      white-space: nowrap;
    }
    div {
      display: inline-flex;
      max-width: 55vw;
      text-align: center;
      color: white;
      div {
        display: inline-block;
        padding-top: 3px;
      }
    }
  }
  button {
    //color: #686868;
    color: #888;
    &.week {
      color: #D0D0D0
    }
    border-radius: 18px;
    border: 2px solid transparent;
    background-color: transparent;
    //opacity: 0.5;
    font-size: 32px;
    font-weight: bold;
    &[data-glide-dir]{
      &.hide {
        display: none;
      }
      position: absolute;
      top: 0 ;

      &.right {
        right: 0;
      }
      &.left {
        left:0;
      }
    }
  }
}
</style>
