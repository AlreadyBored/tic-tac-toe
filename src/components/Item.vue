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
  .menu-item {
    font-size: 28px;
  }
</style>
