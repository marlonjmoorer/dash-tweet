

<template>
   <v-card>
        <!-- <v-card-media :src="account.profile.photos[0].value" height="200px">
        </v-card-media> -->
        <v-card-title primary-title>
          <v-avatar size="36px" slot="activator">
              <img :src="account.profile.photos[0].value" alt="">
          </v-avatar>
          <h5>{{account.profile.username}}</h5>
        </v-card-title>
         <v-list three-line>
          <template v-for="tweet in tweets">
            <tweet :tweet="tweet" :key="tweet.id"/>
          </template>
        </v-list>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import Tweet from './Tweet.vue';

export default {

    data:()=>({
        tweets:[]
    }),
    props:['account'],
    components:{Tweet},
    mounted(){
      // axios.post("api/timeline",{account:this.account}).then(res=>{
         
       //})
       let socket= io({path:"/io"})
       socket.emit("init",this.account)
       socket.on("tweet",(tweet)=>{
         console.log(tweet)
          this.tweets.push(tweet)
       })
    },updated(){
      console.log(this.tweets)
    },
    
}
</script>

<style>

</style>
