<template>
  <div>
    <div>Settings</div>
    <div class='error'>{{errorMsg}}</div>
    <br>
    <label>
      Color of X
      <select v-model="settings.colors.colorX">
        <option v-for="(item, index) in possibleColors.cross" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>
    </label>
    <br>
    <label>
      Color of O
      <select v-model="settings.colors.colorO">
        <option v-for="(item, index) in possibleColors.nought" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>
    </label>
    <br>    
    <button @click='quitSave'
            class="btn btn-success">Save & quit</button>
    <button @click='quit'
            class="btn btn-warning">Quit with saving</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data() {
    return {
      settings: {
        colors: {
          colorX: '',
          colorO: ''
        }
      },
      errorDur: 1500,
      errorMsg: ''       
    }
  },
  methods: {
    ...mapActions('settings', {
      sendSettings: 'getSettings'
    }),
    hideErrorDeff() {
      setTimeout(() => {
        this.errorMsg = ''
      }, this.errorDur);
    },
    quitSave() {
      if(this.checkSettings()) {
        this.sendSettings(this.settings);
        this.$router.push('/menu');
      }
    },
    quit() {
      this.$router.push('/menu');
    },
    checkSettings() {
      const colors = this.possibleColors,
      colorX = this.settings.colors.colorX,
      colorO = this.settings.colors.colorO;  
      
      if(!~this.colorsArr.cross.indexOf(colorX) || !~this.colorsArr.nought.indexOf(colorO)) {
        this.errorMsg = 'Choose correct colors!';
        this.hideErrorDeff();
        return false;
      }
      if(this.settings.colors.colorX === this.settings.colors.colorO) {
        this.errorMsg = 'Symbols cannot both have same color, choose different!';
        this.hideErrorDeff();
        return false;
      }

      return true;
    }
  },
  computed: {
    ...mapGetters('settings', {
      possibleColors: 'possibleColors',
      colorsArr: 'colorsArr'
    })
  }
}
</script>

<style>
.error {
  color: red;
  font-size: 24px;
  height: 45px;
}
</style>
