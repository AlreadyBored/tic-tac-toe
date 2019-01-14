<template>
  <div class='menu-item'>{{opt.value}}</div>
</template>

<script>
export default {
  props: {
    opt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
div.menu-item {
    font-size: 48px;
    color: black;
    text-decoration: none;
}
div.menu-item:hover {
  cursor: pointer;
  color: red;
}
</style>
