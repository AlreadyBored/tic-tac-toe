<template>
  <div>
    <table>
      <tbody>
        <row>
          <td></td>
          <td></td>
          <td></td>
        </row>
        <row>
          <td></td>
          <td></td>
          <td></td>
        </row>
        <row>
          <td></td>
          <td></td>
          <td></td>
        </row>
      </tbody>
    </table>  
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  ...mapGetters('playfield', {
    currentState: 'currentState',
    time: 'time',
    chosenSymbol: 'chosenSymbol',
    xTurns: 'xTurns'
  })
}
</script>

<style>

</style>
