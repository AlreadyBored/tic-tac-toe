<template>
  <div>
    <div>Winner: {{winner}}</div>
    <div>Time spent: {{time}} seconds</div>
    <div>Turns made: {{turns}}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters('playfield', {
      time: 'time',
      winner: 'winner',
      turns: 'turns'
    })
  }
}
</script>

<style>

</style>
