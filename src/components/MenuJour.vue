<template>
  <article id="menujour" v-bind:class="['jour',  jour.jour]">
    <!-- template  v-for="(service, idx) in jour.destinations" -->
    <header>
      <span class="name" >{{jour.jour}}</span>
      <div>
        <span class="date">{{jour.date | dayOnly}}</span>
      </div>
    </header>
    <template  v-for="(service) in jour.destinations" >
      <article v-bind:class="['service', {vide: service.typeVide, vide0: !nb_plats_max(service.name)}]"  :key="service.name">
        <header>
          <span>{{service.name}}</span>
        </header>
        <ul>
          <li v-for="(partie) in service.menu"
              :key="partie.rank"
              v-bind:class="[ 'partie',
                              'rank'+partie.rank,
                              {vide: partie.typeVide, vide0: !nb_plats_max(service.name, partie.rank)}]" >
            <choixplat  v-if="partie.choix[0]"
                        :partie="partie"
                        :gem_rcn_data="gem_rcn_data"
                        :display_modal="display_modal"
                        :url_img="url_img"
                        :nb_plats="nb_plats_max(service.name, partie.rank)"
                        >
            </choixplat>
          </li>
        </ul>
      </article>
    </template>
    <footer>&nbsp;</footer>
  </article>
</template>
<script>
import MenuChoixPlat from '@/components/MenuChoixPlat'

export default {
  name: 'MenuJour',
  props: {
    jour: {
      type: Object,
      required: true,
      validator: function (obj) {
        return obj.typeVide ? true : obj.destinations
      }
    },
    display_modal: Function,
    url_img: Function,
    gem_rcn_data: Array,
    nb_plats_max: Function
  },
  components: {
    'choixplat': MenuChoixPlat
  },
  filters: {
    dayOnly: function(jour) {
      if (!jour) return ''
      return jour.split('/')[0]
    }
  }

}
</script>

<style scoped lang='scss'>

article#menujour {
  border-left: 1px solid #e1e1e1;
  border-right: 1px solid #e1e1e1;
  margin-top: 0;

  article.service {
    > ul {
      overflow: hidden;
    }
    > header {
      color: white;
    //  background-color: transparent;
      font-size: 16px;
    //  padding-bottom: 0px;
     // padding-top:0.5em;
    }
  }

  li.vide {
    header {
      background-color: white;
    }
    &.vide0 {
      display: none;
    }
  }
  span, .choix div {
    display: table;
    margin: auto;
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
  header {
    //margin-top: 0.5em;
    //margin-left: 8px;
    //margin-right : 8px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  > header {
    > span {
      font-size: 16px;
      font-weight: bold;
      &.name {
        text-transform: capitalize;
      }
    }
  }
  article.service {
    //margin-top:0.5em;
    // margin-bottom: 1.5em;
  }

  ul {
    padding: 0;
    margin: 0;

  }

  li.partie {
    //margin-top: 1em;
    font-size: 14px;
    list-style-type: none;
    > span {
      font-weight: bold;
    }
    span {
      height: 1em;
      margin-top: 0;
      margin-top: 0;
    }

    li.choix {
      margin-top:0.5em;
      height: 1em;
      //font-size: 100%;
      list-style-type: none;
    }
  }

}
.vide {
  .vide0 {
    display : none;
  }
}

.service.vide {
  span {
    color: transparent;
  }
  &.vide0 {
    display: none;
  }
}


.lundi {
  .service > header, footer{
    background-color: #ce9f45;
  }
}
.mardi {
  .service >header, footer {
    background-color: #b04f46;
  }
}
.mercredi {
  .service >header, footer {
  background-color: #b02a6f;
  }
}

.jeudi {
  .service >header, footer {
    background-color: #682c72;
  }
}
.vendredi {
  .service >header, footer {
    background-color: #353f7c;
  }
}
.samedi {
  .service >header, footer {
    background-color: #61998a;
  }
}
.dimanche {
  .service >header, footer {
  background-color: #e8cf80;
  }
}
  footer {
    max-height: 1em;
    display:block;
    //margin-top:0.5em;
    // margin-bottom: 0.5em;
   // margin-left: 8px;
   // margin-right: 8px;
    //background-color: transparent;
  }

</style>
