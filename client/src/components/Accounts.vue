

<template>
    <v-container grid-list-md text-xs-center color="black">
    <v-layout row wrap>
      <v-flex xs12 md4  v-for="account in accounts" :key="account.id">
        <twitter-feed :account="account"></twitter-feed>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent>
      <v-card>
      </v-card>
    </v-dialog>
    
     <v-btn
              color="teal"
              dark
              small
              bottom
              right
              fab
              fixed
              href="/api/twitter/login"
              
           >
           <v-icon>add</v-icon>
      </v-btn>
  </v-container>
</template>

<script>

import TwitterFeed from './TwitterFeed.vue';
import axios from 'axios';
export default {

    data:()=>({
      dialog:false,
      accounts:[]
    }),
    components:{TwitterFeed},
     mounted(){
    
    axios.get("/api/twitter/accounts").then((res)=>{
      console.log(res)
      this.accounts=res.data
     // this.popup=res.data
     // this.dialog=true;
    })
  }

}
</script>

<style>

</style>
