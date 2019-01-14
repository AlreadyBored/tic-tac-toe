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
    })
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
