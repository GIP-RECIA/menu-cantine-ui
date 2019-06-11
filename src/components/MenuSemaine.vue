<template>
  <div id="menusemaine" ref="menuSemaineRef">
    <select v-if="mode_dev" v-model="selected" @change="loadMenu();">
      <option disabled value>Choisissez</option>
      <option value="0450782F">lycée VOLTAIRE</option>
      <option value="0370038R">lycée GRANDMONT</option>
      <option value="0370032J">lycée CLOUET</option>
      <option value="0410899E">lycée hôtelier de Blois</option>
      <option value="0180823X">lycée VAUVERT 6</option>
      <option value="0280700J">Jean-Félix PAULSEN 6</option>
      <option value="0360017Y">EPLEFPA de l'INDRE 4</option>
      <option value="0370036N">LGT BALZAC 2</option>
      <option value="0451104F">EREA Simone VEIL 5</option>
      <option value="0451463W">EPLEFPA DU LOIRET - Site BELLEGARDE 51</option>
      <option value="0180005H">0180005H 14 15</option>
      <option value="0370016S">0370016S 14 15</option>
    </select>
    <input v-if="mode_dev" v-model="noSemaine" @change="loadMenu();">
    <header  class="titre">
      <button v-if="prevWeek" @click="callPrevWeek()" type='button' >&lt;</button>
      <div v-if="debutPeriode">
      <span>Semaine </span><wbr/>
      <span>du {{ debutPeriode }} </span><wbr/>
      <span>au {{ finPeriode }} </span>
      </div>
      <button v-if="nextWeek"  @click="callNextWeek()" type='button' >&gt;</button>
      <h3 v-if="erreur">{{erreur}}</h3>
    </header>
    
    <modal
      v-if="showModal"
      @close="showModal = false"
      v-bind:plat="plat"
      v-bind:gemrcn_list="gemRcnData">
    </modal>
    <section ref="semaineref" v-if="menuSemaine" class="semaine">
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
            :nb_plats_max="maxPlats"
          />
        </vue-glide-slide>
      </vue-glide>
    </section>
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
// import 'vue-glide-js/dist/vue-glide.css' en single file compoment les ccs doivent être importer dans la section css 

export default {
  name: 'MenuSemaine',
 /* computed: {
    getActive (){return this.active},
    setActive (arg){this.active = arg}
  },
*/
  props: {
    isDemo: Boolean
  },
  data () {
    return {
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
        rewind: false
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
    [GlideSlide.name]: GlideSlide
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
        objVue.loadMenuEncoded(encoded);
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
            process.env.VUE_APP_PORTAL_CONTEXT + process.env.VUE_APP_USER_INFO_URI,
            process.env.VUE_APP_URL_API_ETAB,
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
        const encoded = (await oidc({ userInfoApiUrl: process.env.VUE_APP_PORTAL_CONTEXT + process.env.VUE_APP_USER_INFO_URI })).encoded
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
      } 
      
      var url;
      if (this.isDemo ) {
        
        if (this.selected) {
          uaiEtab = this.selected
        }
        url = process.env.VUE_APP_URL_REST_API_DEMO
      } else {
        url = process.env.VUE_APP_URL_REST_API
      }
      var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }

      if (encoded != null) {
        headers['Authorization'] = 'Bearer ' + encoded
      } 

      fetch(
        url,
        //initPost(dJour, uaiEtab, this.noSemaine, encoded)
        {
          headers: headers,
          method: 'POST',
          credentials: 'omit',
          mode: 'cors',
          body: JSON.stringify({
            semaine: this.noSemaine,
            dateJour: dJour,
            uai: uaiEtab
          })
        }
      ) .then(response => {
          if (response.ok) {
            return response.json()
          }
          return { ErrorCode: response }
        })
        .then(json => this.traitementReponse(json))
        .catch(
          () => (this.erreur = 'Erreur de connexion !')
        )
    },
    traitementReponse (json) {
      if (json.ErrorCode) {
        this.erreur = 'Menu Indisponible !'
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
        this.nextWeek = json.nextWeek
        this.prevWeek = json.previousWeek
        this.glideOptions.animationDuration = 0
        this.glideOptions.perView = json.nbJours
        this.glideOptions.breakpoints = initBreakpoints(this.nbJour)
        
        this.active = activeByBreakpoint(this.glideOptions.breakpoints, json.requete.dateJour, json.nbJours, json.jours)
        
          // on rétablit l'animation
        this.$nextTick(() => {
          this.$refs.glideref.glide.settings.animationDuration = 1000
        })  
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../node_modules/vue-glide-js/dist/vue-glide.css';
div#menusemaine {
  > header {
    display: table;
    margin-left:auto;
    margin-right: auto;
    font-size: 110%;
    white-space: pre-wrap;
    > span:first-child {
      display: table;
      margin-left: auto;
      margin-right: auto;
    }
    span {
      white-space: nowrap;
    }
    div {
      display: inline-table;
      max-width: 55vw;
      text-align: center;
    }
  }
  button {
    border-radius: 18px;
    border: 2px solid white;
    background-color: #fff;
    opacity: 0.5;
    font-size: 32px;
    font-weight: bold;
    &[data-glide-dir]{
      &.hide {
        display: none;
      }
      position: fixed;
      top: 50vh ;

      &.right {
        right: 0;
      }
      &.left {
        left:0;
      }
    }
  }
  .semaine {
    font-size: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
