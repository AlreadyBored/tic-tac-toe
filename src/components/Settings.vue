<template>
  <div>
    <div class='settings-header'>Settings</div>
    <div class='error'>{{errorMsg}}</div>
    <br>
    <label class='setting-label'>
      Color of X
      <select v-model="settings.colors.colorX">
        <option v-for="(item, index) in possibleColors.cross" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>
    </label>
    <br>
    <label class='setting-label'>
      Color of O
      <select v-model="settings.colors.colorO">
        <option v-for="(item, index) in possibleColors.nought" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>
    </label>
    <br>
    <label class='setting-label'>
      Nickname color
      <select v-model="settings.nick.color">
        <option v-for="(item, index) in possibleColors.nick" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>    
    </label>
    <br>
    <label class='setting-label'>
      Nickname font size
      <select v-model="settings.nick['font-size']">
        <option v-for="(item, index) in possibleTextSize" 
                :value="item.value"
                :key="'c' + index">{{item.name}}
        </option>
      </select>    
    </label>
    <br>
    <label class='setting-label'>
      Enable intellectual mode
        <input type="checkbox" v-model="settings.flags.intMode">
    </label>
    <br>
    <label class='setting-label'>
      End game on draw result
        <input type="checkbox" v-model="settings.flags.drawMode">
    </label>
    <br>    
    <div @click='quitSave'
            class="btn-start">Save & quit</div>
    <div @click='quit'
            class="btn-start">Quit with saving</div>
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
          'font-size': '',
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
.settings-header {
  font-size: 64px;
  color: black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.setting-label {
  font-size: 32px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
}

.setting-label:hover {
  opacity: 0.5;
}

.error {
  color: red;
  font-size: 24px;
  height: 45px;
}
.btn-start {
  font-size: 64px;
  color: green;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
}
</style>
