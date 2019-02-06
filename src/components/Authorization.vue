<template>
<div>
<span class='error'>{{errorMsg}}</span>
<br>
<label class='name-field'>
  {{dictionary[cnt]}} player name:
  <br><br>
  <input autofocus
         v-model="name"
         @keyup.enter="submitNickname"
         type="text"
         maxlength="10" 
         placeholder="Enter your nickname here">
</label>
<br>
  <div @click='submitNickname'
          class="btn-start">Submit</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
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
  }
}
</script>

<style>
.error {
  color: red;
  font-size: 24px;
}
.btn-start {
  font-size: 64px;
  color: green;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
}
.name-field {
  font-size: 24px;
}
</style>