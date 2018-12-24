<template>
  <div>
    <ul class='menu-list'>
      <li v-for='option in menu'
         :key="option.id">
         <router-link :to='option.path'>
           <Item :opt='option'></Item>
         </router-link>     
         </li>
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
}

.menu-list>li:hover {
  color: red;
  cursor: pointer;
}
</style>
