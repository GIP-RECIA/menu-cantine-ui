<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click="function(event){event.stopPropagation();}">
          <header>{{plat.name}}</header>
          <div class="ifLabel" v-if="plat.labelsInfo" >
            <div class="forLabel" v-for="(label, index) in plat.labelsInfo" :key="index">
              <img v-bind:src="url_img(label.logo)" /> 
              {{label.nom}} 
            </div>
          </div>
          <div class="ifPlat" v-if="plat.gemrcn">
            <div class="forColor" v-for="(code_gemrcn, index) in plat.gemrcn" :key="index">
              <span class="color" :style="'background-color:' + gemrcn_list[code_gemrcn].color + ';'"/>
              <span >{{gemrcn_list[code_gemrcn].comment}}</span>
            </div>
          </div>
          <div class="ifAllergens" v-if="plat.allergens && plat.allergens.length">
            <span class="color" :style="'background-color: #fb8f03'" ></span>
            <span>Allergène&#8239;:</span>
            <ul>
              <li v-for="(elem, index) in plat.allergens" :key="index">{{elem}}</li>
            </ul>
          </div>
          <div class="ifNutrition" v-if="plat.nutritions && plat.nutritions.length">
            <span class="color" :style="'background-color: #093ddf'" ></span>
            <span>Nutrition&#8239;:</span>
            <ul>
              <li v-for="(elem, index) in plat.nutritions" :key="index">
                <span>{{elem.name}}:</span>
                <span>{{elem.value}}</span>
                <span>{{elem.unit}}</span>
              </li>
            </ul>
          </div>
          <footer>
            <button class="modal-default-button" @click="$emit('close')">Fermer</button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MenuModal',
  data: function () {
    return { nutData: [{ name: 'test', value: 'val', unit: 'u' }] }
  },
  // template: modalTemplate,
  props: ['plat', 'gemrcn_list', 'url_img']
}
</script>

<style scoped lang='scss'>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      header {
        //font-size: 110%;
        font-weight: bold;
        //padding-bottom: 0.5em;
      }
      footer {
        margin-top: 0.5em; 
        text-align: right;
      }
      div {
        margin-top: 0.5em;
      }
      text-align: left;
      min-width: 300px;
      width: 50vw;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #f3f3f3;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
      ul {
        margin: 0px;
      }
      img {
        height: 2em;
      }
      span.color {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 0.5em;
        margin-right: 1px; 
      }
    }
  }
}
</style>
