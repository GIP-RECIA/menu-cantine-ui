<template>
  <div id="menusemaine">
    <select v-if="mode_env" v-model="selected" @change="loadMenu();">
      <option disabled value>Choisissez</option>
      <option value="0450782F">lycée VOLTAIRE</option>
      <option value="0370038R">lycée GRANDMONT</option>
      <option value="0370032J">lycée CLOUET</option>
      <option value="0410899E">lycée hôtelier de Blois</option>
      <option value="0180823X">lycée VAUVERT 6</option>
      <option value="0281047L">LP Jean-Félix PAULSEN 6</option>
      <option value="0360017Y">EPLEFPA de l'INDRE 4</option>
      <option value="0370036N">LGT BALZAC 2</option>
      <option value="0451104F">EREA Simone VEIL 5</option>
      <option value="0451463W">EPLEFPA DU LOIRET - Site BELLEGARDE 51</option>
    </select>
    <input v-if="mode_env || true" v-model="noSemaine" @change="loadMenu();">
    <div v-if="erreur">{{erreur}}</div>

    <header v-if="menuSemaine" class="titre">
      <span>Menu Cantine</span>
      <button v-if="prevWeek" @click="callPrevWeek()" type='button' >&lt;</button>
      <span>du {{ debutPeriode }}</span><wbr/>
      <span> au {{ finPeriode }}</span>
      <button v-if="nextWeek"  @click="callNextWeek()" type='button' >&gt;</button>
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
import config from './config.js'
import { Glide, GlideSlide } from 'vue-glide-js'
import MenuModal from '@/components/MenuModal'
import MenuJour from '@/components/MenuJour'
// import 'vue-glide-js/dist/vue-glide.css' en single file compoment les ccs doivent être importer dans la section css 

function initPost (dJour, etab, noSem) {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-COM-PERSIST': 'TRUE'
    },
    method: 'POST',
    credentials: 'omit',
    mode: 'cors',
    body: JSON.stringify({
      semaine: noSem,
      dateJour: dJour,
      uai: etab
    })
  }
}

function calculMaxSemaine (jours, startAt, perView) {
  var maxSemaine = {}
  if (perView) {
    var idxJour
    var stopAt = startAt + perView
    for (idxJour = startAt; idxJour < stopAt; idxJour++) {
      var jour = jours[idxJour]
      if (jour) {
        var maxJour = jour.serviceChoixNbPlats
        if (maxJour) {
          for (const service in maxJour) {
            var ssMenu = maxJour[service]
            if (ssMenu) {
              var ssMenuMax = maxSemaine[service]
              if (ssMenuMax) {
                for (const choix in ssMenu) {
                  var nb = ssMenu[choix]
                  if (nb) {
                    var max = ssMenuMax[choix]
                    if (nb > (max || -1)) {
                      ssMenuMax[choix] = nb
                    }
                  }
                }
              } else {
                // on clone
                maxSemaine[service] = JSON.parse(JSON.stringify(ssMenu))
              }
            }
          }
        }
      }
    }
  }
  return maxSemaine
}

function calculMaxJour (service, partie, maxPlats) {
  if (maxPlats) {
    maxPlats = maxPlats[service]
    if (maxPlats) {
      var nb = maxPlats[partie]
      if (nb) {
        return nb
      }
    }
  }
  return 0
}

function pauseBreakpoint (objVue) {
  objVue.glideOptions['breakpoints'] = []
  for (var nbCol = 1; nbCol <= objVue.nbJour;) {
    var o = { perView: nbCol++ }
    objVue.glideOptions['breakpoints'][nbCol * 275] = o
  }
}

function traitementReponse (json, objvue) {
  if (json.ErrorCode) {
    objvue.erreur = json
    objvue.menuSemaine = ''
    objvue.defaultStyle = { display: 'none' }
  } else {
    objvue.menuSemaine = json
    objvue.debutPeriode = json.debut
    objvue.finPeriode = json.fin
    objvue.gemRcnData = json.allGemRcn
    objvue.jours = json.jours
    objvue.defaultStyle = {}
    objvue.nbJour = json.nbJours
    objvue.nextWeek = json.nextWeek
    objvue.prevWeek = json.previousWeek
    pauseBreakpoint(objvue)
    objvue.glideOptions.perView = json.nbJours
  }
}

export default {
  name: 'MenuSemaine',
  data () {
    return {
      mode_env: (process.env.NODE_ENV === 'development' || config.mode_env ),
      menuSemaine: '',
      debutPeriode: '',
      finPeriode: '',
      jours: '',
      plat: '',
      selected: '',
      noSemaine: '6',
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
      }
    }
  },
  components: {
    modal: MenuModal,
    jour: MenuJour,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },

  created () {
    pauseBreakpoint(this, this.nbJour)
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.onresize);
    })
  },
  methods: {

    callPrevWeek: function () {
      // console.log('prevWeek' + this.prevWeek)
      this.loadMenu(this.prevWeek)
    },

    callNextWeek: function () {
      // console.log('nextWeek' + this.nextWeek)
      this.loadMenu(this.nextWeek)
    },

    onresize: function () {
      if (this.menuSemaine) {
        var nbView = this.$refs.glideref.glide.settings.perView
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
      this.$nextTick(() => {
        var nbView = this.$refs.glideref.glide.settings.perView
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
      })
    },

    loadMenu: function (dJour) {
      this.menuSemaine = ''
      this.erreur = ''

      if (dJour) {
        this.noSemaine = ''
      }

      fetch(
        config.api_url,
        initPost(dJour, this.selected, this.noSemaine)
      )
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          return { ErrorCode: response }
        })
        .then(json => traitementReponse(json, this))
        .catch(
          error => (this.erreur = 'Erreur de connexion : ' + error.message)
        )
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
    font-size: 80%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
