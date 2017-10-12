

<template>
   <v-card>
        <v-card-media :src="account.profile.photos[0].value" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
         <v-list three-line>
          <template v-for="tweet in tweets">
            
           
            <v-list-tile avatar :key="tweet.id">
              <v-list-tile-avatar>
                <img v-bind:src="tweet.user.profile_image_url"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="tweet.user.name" >A</v-list-tile-title>
                <v-list-tile-sub-title>B</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
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
export default {

    data:()=>({
        tweets:[]
    }),
    props:['account'],
    mounted(){
       let socket= io({path:"/io"})
       socket.emit("init",this.account)
       socket.on("tweet",(tweet)=>{
         console.log(tweet)
          this.tweets.push(tweet)
       })
    },updated(){
      console.log(this.tweets)
    }
}
</script>

<style>

</style>
