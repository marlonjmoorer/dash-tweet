<template>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 v-for="account in accounts" :key="account.id">
        <twitter-feed :account="account"></twitter-feed>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <!-- <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions> -->
        <div v-html="popup"></div>
      </v-card>
    </v-dialog>
    <a href="http://localhost:4000/twitter/login"> LL</a>
     <v-btn
              color="pink"
              dark
              small
              bottom
              right
              fab
              fixed
              href="api/twitter/login"
              
           >
           <v-icon>add</v-icon>
      </v-btn>
  </v-container>
</template>

<script>
import Api from '../Api';
import TwitterFeed from './TwitterFeed.vue';

export default {

    data:()=>({
      dialog:false,
      popup:null,
      accounts:[]
    }),
    components:{TwitterFeed},
     mounted(){
    
    Api.get("/twitter/accounts").then((res)=>{
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
