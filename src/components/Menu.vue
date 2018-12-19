<template>
  <div>
    <div v-for='item in menu'
         :key="item.id">
         {{item.value}}    
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters('menu', {
      menu
    })
  }
}
</script>

<style>

</style>
