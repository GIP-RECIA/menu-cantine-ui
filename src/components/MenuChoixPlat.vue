<template>
  <div id="menuchoixplat">
    <header v-bind:class="{vide: partie.typeVide}">
      <span>{{partie.choix[0].family}}</span>
    </header>
    <ul>
      <li v-bind:class="['choix', {vide: choix.typeVide, vide0: choix.typeVide && nb_plats <= idxChoix} ]"
          v-for="(choix, idxChoix) in partie.choix"
          :key="idxChoix">
        <div  v-if="choix.nutritions || (choix.gemrcn && choix.gemrcn.length > 0) || (choix.allergens && choix.allergens.length > 0)"
              @click="display_modal(choix)">
          <span v-for="(code_gemrcn, idx) in choix.gemrcn"
                :key="idx"
                :style="'background-color:' + gem_rcn_data[code_gemrcn].color + ';'"
                class="color"
              >&nbsp;
          </span>
          <span>{{choix.name}}</span>
          <span v-if="choix.nutritions">*</span>
          <span v-if="choix.allergens && (choix.allergens.length > 0)" class="allergen">Allergène</span>
        </div>
        <span v-else>{{choix.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuChoixPlat',
  props: {
    partie: {
      type: Object,
      required: true,
      validator: function (val) { return val.choix }
    },
    display_modal: Function,
    gem_rcn_data: Array,
    nb_plats: Number
  }
}
</script>

<style scoped lang='scss'>
div#menuchoixplat {
  header {
    margin-left: 8px;
    margin-right : 8px;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    &.vide {
      background-color: transparent;
    }
  }
  .vide.vide0 {
    display: none;
  }
  span, .choix div {
      display: table;
      margin: auto;
  }
  ul {
    padding-left:0;
    li.choix {
      margin-top:0.2em;
      // height: 1em;
      font-size: 100%;
      list-style-type: none;
      div {
        white-space: nowrap;
        > span {
          cursor: pointer;
          display: inline-block;
          &.color {
            width: 1em;
            height: 1em;
            border-radius: 0.5em;
          }
        }
      }
    }
  }
}
 header {
   color:White;
 }

span.allergen {
  vertical-align: top;
  font-size: 75%;
}
.lundi header {
  background-color: #ce9f45;
}
.mardi header {
  background-color: #b04f46;
}
.mercredi header {
  background-color: #b02a6f;
}
.jeudi header {
  background-color: #682c72;
}
.vendredi header {
  background-color: #353f7c;
}
.samedi header {
  background-color: #61998a;
}
.dimanche header {
  background-color: #e8cf80;
}
</style>
