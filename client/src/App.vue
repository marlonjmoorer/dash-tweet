<template>
  <v-app>
    <v-toolbar dark color="primary">
    <v-toolbar-title> -Tweet</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <accounts></accounts>
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
</style>
