<template>
  <div>
    <div>Settings</div>
    <label>
      Color of X
      <select v-model="colorX">
        <option v-for="(item, index) in possibleColors.cross" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
      </select>
    </label>
    <hr>
    <label>
      Color of O
      <select v-model="colorO">
        <option v-for="(item, index) in possibleColors.cross" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
      </select>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorX: '',
      colorO: ''
    }
  }
}
</script>

<style>

</style>
