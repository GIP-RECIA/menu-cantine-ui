<template>
  <div id="menuchoixplat">
    <header v-bind:class="{vide: partie.typeVide}">
      <span>{{partie.choix[0].family}}</span>
    </header>
    <ul>
      <li v-bind:class="['choix', {vide: choix.typeVide, vide0: choix.typeVide && nb_plats <= idxChoix} ]"
          v-for="(choix, idxChoix) in partie.choix"
          :key="idxChoix">
        <div  v-if="choix.nutritions 
                    || (choix.gemrcn && choix.gemrcn.length > 0) 
                    || (choix.allergens && choix.allergens.length > 0)
                    || choix.labelsInfo"
              @click="display_modal(choix)">
          
          <span v-if="choix.nutritions" class="nutrition colorText">N</span>
          <span v-if="choix.allergens && (choix.allergens.length > 0)" class="allergen colorText">A</span>
          <img v-if="choix.labelsInfo && choix.labelsInfo[0].logo " v-bind:src="url_img(choix.labelsInfo[0].logo)"/>
          <span>{{choix.name}}</span>
          <span v-for="(code_gemrcn, idx) in choix.gemrcn"
                :key="idx"
                :style="'background-color:' + gem_rcn_data[code_gemrcn].color + ';'"
                class="color"
              >&nbsp;
          </span>
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
    url_img: Function,
    gem_rcn_data: Array,
    nb_plats: Number
  }
}
</script>

<style scoped lang='scss'>
div#menuchoixplat {
  header {
    //margin-left: 8px;
    //margin-right : 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    &.vide {
      background-color: transparent;
    }
    span {
      margin-left: auto;
    }
  
  }
  .vide.vide0 {
    display: none;
  }
  span, .choix div {
      display: table;
      margin: auto;
      white-space: nowrap
  }
  ul {
    padding-left:0;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    li.choix {
      margin-top:0.5em;
      margin-bottom: 0.5em;
      // height: 1em;
      //font-size: 100%;
      list-style-type: none;
      div {
        white-space: nowrap;
        img {
          height: 20px;
          margin-top: -3px;
          margin-bottom: -3px;
          margin-right: 2px;
        }
        > span {
          cursor: pointer;
          display: inline-block;
          &.color {
            width: 1em;
            height: 1em;
            border-radius: 0.5em;
            margin-right: 0.2ex;
            margin-left: 0.2ex;
          }
          &.colorText {
            line-height: 14px;
            border-radius: 1em;
            padding-left: 0.4em;
            padding-right: 0.4em;
            color: white;  
            vertical-align: top;
            margin-right: 0.4ex;
            font-size: 10px;
            font-weight: bold;
          }
          &.allergen {
            background-color: #fb8f03
          }
          &.nutrition {
            background-color: #093ddf
          }
        }
      }
    }
  }
}
 header {
   background-color: #D0D0D0;
   color:#303030;
   font-weight: bold;
 }




.lundi header deleted {
  background-color: #ce9f45;
}
.mardi header deleted{
  background-color: #b04f46;
}
.mercredi header deleted{
  background-color: #b02a6f;
}
.jeudi header deleted{
  background-color: #682c72;
}
.vendredi header deleted{
  background-color: #353f7c;
}
.samedi header deleted{
  background-color: #61998a;
}
.dimanche header deleted{
  background-color: #e8cf80;
}
</style>
