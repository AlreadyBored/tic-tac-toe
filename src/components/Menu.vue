<template>
  <div>
    <ul class='menu-list'>
      <li v-for='option in menu'
         :key="option.id">
         <Item :opt='option'></Item>
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
