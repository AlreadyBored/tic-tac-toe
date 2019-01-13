<template>
<div>
<span class='error'>{{errorMsg}}</span>
<br>
<label>
  {{dictionary[cnt]}} player name:
  <br>
  <input v-model="name"
         @keyup.enter="submitNickname"
         type="text"
         maxlength="10" 
         placeholder="Enter your nickname here">
</label>
<br>
  <button @click='submitNickname'
          class="btn btn-success">Submit</button>
</div>
</template>

<script>
export default {
  data() {
    return {
     name: '',
     usedNames: [],
     errorMsg: '',
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
      if(this.name === '') {
        this.errorMsg = 'Name cannot be an empty string, you have to type at least one symbol!';
        return;
      } 
      if(~this.usedNames.indexOf(this.name)) {
        this.errorMsg = 'This name has been already used, choose another one!';
        return;
      }
      this.$store.dispatch('playfield/getPlayer', {
        number: this.cnt,
        name: this.name
      })
      this.usedNames.push(this.name);
      if(this.cnt === this.players) {
        this.$router.push('/game');
        return;
      } 
      this.cnt++;
      this.name = '';
      this.errorMsg = '';
      
    }
  },
  computed: {
   
  }
}
</script>

<style>
.error {
  color: red;
  font-size: 16px;
}
</style>