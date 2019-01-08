<template>
<label>
  {{dictionary[cnt]}} player name:
  <input v-model="name"
         type="text" 
         maxlength="10" 
         placeholder="Enter your nickname here">
<label>
  <button @click='submitNickname'
          class="btn btn-success">Submit</button>
</template>

<script>
export default {
  data() {
    return {
     name: '',
     cnt: 1,
     dictionary: {
       1: 'First',
       2: 'Second',
       3: 'Third',
       4: 'Fourth',
       5: 'Fifth',
       6: 'Sixth',
       7: 'Seventh',
       8: 'Eighth',
       9: 'Ninth',
       10: 'Tenth'
     },
     players: 2
    }
  },
  methods: {
    submitNickname() {
      
    }
  },
  computed: {
   
  }
}
</script>

<style>
</style>