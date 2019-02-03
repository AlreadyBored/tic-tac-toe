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
    <label>
      Nickname color
      <select v-model="settings.nick.color">
        <option v-for="(item, index) in possibleColors.nick" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>    
    </label>
    <br>
    <label>
      Nickname font size
      <select v-model="settings.nick['font-size']">
        <option v-for="(item, index) in possibleTextSize" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>    
    </label>
    <br>
    <label>
      Enable intellectual mode
        <input type="checkbox" v-model="settings.flags.intMode">
    </label>
    <br>
    <label>
      End game on draw result
        <input type="checkbox" v-model="settings.flags.drawMode">
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
        },
        flags: {
          intMode: '',
          drawMode: ''
        },
        nick: {
          size: '',
          color: ''
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
    syncSettings() {
      this.settings.colors.colorX = this.defaultSettings.colX;
      this.settings.colors.colorO = this.defaultSettings.colO;
      this.settings.flags.intMode = this.defaultSettings.flags.int;
      this.settings.flags.drawMode = this.defaultSettings.flags.draw;
      this.settings.nick['font-size'] = this.defaultSettings.nick['font-size'];
      this.settings.nick.color = this.defaultSettings.nick.color;
    },
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
      if(colorX === colorO && colorX !== 'black') {
        this.errorMsg = 'Symbols cannot both have same color except black, choose different!';
        this.hideErrorDeff();
        return false;
      }
      return true;
    }
  },
  computed: {
    ...mapGetters('settings', {
      possibleColors: 'possibleColors',
      possibleTextSize: 'possibleTextSize',
      colorsArr: 'colorsArr',
      defaultSettings: 'settings'
    })
  },
  mounted() {
    this.syncSettings();
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
