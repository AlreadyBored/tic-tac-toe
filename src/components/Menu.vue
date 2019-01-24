<template>
  <div>
    <ul class='menu-list'>
         <router-link 
         v-for='option in menu'
         :key="option.id"
         :to='option.path'
         tag='li'>
           <Item :opt='option'></Item>
         </router-link>     
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Item from './Item.vue';

export default {
  computed: {
    ...mapGetters('menu', {
      menu: 'options'
    }),
    ...mapGetters('state', {
      runsCnt: 'runsCnt'
    }),
    routeName() {
      if(this.runsCnt === 0) {
        return 'authorization';
      } else {
        return 'game';
      }
    }
  },
  beforeRouteLeave (to, from, next) {
      next();
  },
  components: {
    Item
  }
}
</script>

<style>

.menu-list {
  list-style: none;
  text-decoration: none;
  color: black;
}

</style>
