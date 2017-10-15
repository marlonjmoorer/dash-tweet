<template>
  <div>
    <v-toolbar color="primary" dark>
      
      <v-toolbar-title>
       <v-avatar size="36px" slot="activator">
          <img :src="account.profile.photos[0].value"/>
      </v-avatar>  
      {{account.profile.displayName}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="disconnect(account.profile.id)">
            <v-list-tile-title>
              Disconnect
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
     <v-alert v-if="newTweets.lenght>0" color="info" icon="info" value="true">
      This is a info alert.
    </v-alert>
    <div class="max-column" >
      <template v-for="tweet in tweets">
        <tweet :tweet="tweet" :key="tweet.id"/>
      </template>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import Tweet from './Tweet.vue';

export default {

  data: () => ({
    tweets: [],
    newTweets:[]
  }),
  props: ['account','disconnect'],
  components: { Tweet },
  mounted() {
    axios.post("/api/twitter/timeline",{account:this.account}).then(res=>{
        this.tweets=res.data
    })
    let socket = io("/")
    socket.emit("init", this.account)
    socket.on("tweet", (tweet) => {
   //   console.log(tweet)
      this.newTweets.push(tweet)
    })
  }, updated() {
    console.log(this.tweets)
  },

}
</script>

<style scoped>
.max-column {
    max-height: 100vh;
    overflow: scroll;
}
</style>
