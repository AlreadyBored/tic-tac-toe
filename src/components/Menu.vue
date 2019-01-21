<template>
  <div>
    <ul class='menu-list'>
         <router-link :to='startLink'
                      tag='li'>
        <div class='menu-item'>START</div>
         </router-link>
         <router-link 
         v-for='option in additionalMenu'
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
      additionalMenu: 'options'
    }),
    ...mapGetters('state', {
      runsCnt: 'runsCnt'
    }),
    startLink() {
      if(this.runsCnt === 0) {
        return '/auth';
      } else {
        return '/game';
      }
    }
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
