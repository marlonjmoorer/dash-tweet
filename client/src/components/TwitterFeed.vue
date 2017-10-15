<template>
  <div>
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>{{account.profile.displayName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
              Disconnect
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-list three-line class="max-column" >
      <template v-for="tweet in tweets">
        <tweet :tweet="tweet" :key="tweet.id"/>
      </template>
    </v-list>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import Tweet from './Tweet.vue';

export default {

  data: () => ({
    tweets: []
  }),
  props: ['account'],
  components: { Tweet },
  mounted() {
    axios.post("/api/twitter/timeline",{account:this.account}).then(res=>{
        this.tweets=res.data
    })
    let socket = io({ path: "/io" })
    socket.emit("init", this.account)
    socket.on("tweet", (tweet) => {
      console.log(tweet)
      this.tweets.push(tweet)
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
