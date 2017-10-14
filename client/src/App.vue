<template>
  <v-app>
  
  <router-view></router-view>
  </v-app>
</template>

<script>
import Accounts from './components/Accounts.vue';
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      popup:null
    }
  },
  components:{Accounts},
 
}
</script>

<style lang="scss">
html{
  padding: 0;
}
#app{
}

</style>
