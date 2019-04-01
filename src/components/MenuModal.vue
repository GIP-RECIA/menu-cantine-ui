<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span>{{plat.name}}</span>
          <div class="ifPlat" v-if="plat.gemrcn">
            <div class="forColor" v-for="(code_gemrcn, index) in plat.gemrcn" :key="index">
              <span :style="'color:' + gemrcn_list[code_gemrcn].color + ';'">{{gemrcn_list[code_gemrcn].comment}}</span>
            </div>
          </div>
          <div class="ifAllergens" v-if="plat.allergens && plat.allergens.length">
            <span>Allergène&#8239;:</span>
            <ul>
              <li v-for="(elem, index) in plat.allergens" :key="index">{{elem}}</li>
            </ul>
          </div>
          <div class="ifNutrition" v-if="plat.nutritions && plat.nutritions.length">
            <span>Nutrition&#8239;:</span>
            <ul>
              <li v-for="(elem, index) in plat.nutritions" :key="index">
                <span>{{elem.name}}:</span>
                <span>{{elem.value}}</span>
                <span>{{elem.unit}}</span>
              </li>
            </ul>
          </div>
          <button class="modal-default-button" @click="$emit('close')">X</button>
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
  props: ['plat', 'gemrcn_list']
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
      text-align: left;
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
      ul {
        margin: 0px;
      }
    }
  }
}
</style>
