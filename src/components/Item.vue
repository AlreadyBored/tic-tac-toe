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

<style>
div.menu-item {
    font-size: 64px;
    color: black;
    text-decoration: none;
}
div.menu-item:hover {
  cursor: pointer;
  color: red;
}
</style>
