<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>{{state[0][0]}}</td>
          <td>{{state[0][1]}}</td>
          <td>{{state[0][2]}}</td>
        </tr>
        <tr>
          <td>{{state[1][0]}}</td>
          <td>{{state[1][1]}}</td>
          <td>{{state[1][2]}}</td>
        </tr>
        <tr>
          <td>{{state[2][0]}}</td>
          <td>{{state[2][1]}}</td>
          <td>{{state[2][2]}}</td>
        </tr>
      </tbody>
    </table>  
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters('playfield', {
    state: 'currentState',
    time: 'time',
    chosenSymbol: 'chosenSymbol',
    xTurns: 'xTurns'
  }),

  }  
}
</script>

<style>

</style>
