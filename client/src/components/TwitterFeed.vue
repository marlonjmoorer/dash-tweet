<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>
        <v-avatar size="36px" slot="activator">
          <img :src="account.profile.photos[0].value" />
        </v-avatar>
        {{account.profile.displayName}}

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" fab small dark @click="sheet=true">
        <v-icon>message</v-icon>
      </v-btn>
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
    <v-bottom-sheet inset v-model="sheet">
      <v-form  ref="form">
        <v-card>
          <v-card-title>
            <h6> {{account.profile.displayName}}</h6>
          </v-card-title>
          <v-card-text>

            <v-container grid-list-md>

              <v-layout wrap>
                <v-flex xs12 v-if="direct">
                  <v-select 
                  label="To" 
                  autocomplete 
                  :loading="loading"
                  required 
                  :items="users" 
                  :rules="[() => to.length > 0 || 'You must choose at least one']" 
                  :search-input.sync="search" 
                  v-model="to"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field name="tweet" label="Tweet" v-model="message" textarea counter="140"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select class="headline" :items="options" v-model="type" label="Type" single-line bottom></v-select>
                </v-flex>
              </v-layout>
            </v-container>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click.native="sheet = false" flat>Close</v-btn>
            <v-btn color="primary" @click="send">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-bottom-sheet>

    <v-alert v-if="newTweets.length>0" color="info" icon="info" value="true">
      <button @click="appendNewTweets"> You have {{newTweets.length}} new tweets</button>
    </v-alert>
    <div class="max-column">
      <template v-for="tweet in tweets">
        <tweet :tweet="tweet" :key="tweet.id" />
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
    newTweets: [],
    sheet: false,
    message: "",
    type: "Tweet",
    to: "",
    options: [
      "Tweet",
      "Direct Message",
      "Reply"
    ],
    socket: null,
    loading: false,
    users: [],
    search: null,
    select: [],
  }),
  props: ['account', 'disconnect'],
  components: { Tweet },
  watch: {
      search (val) {
        val && this.searchUsers(val)
      }
  },
  computed:{
    direct:function(){
      return this.type!="Tweet"
    }
  },
  methods: {
    appendNewTweets() {
      this.tweets = this.newTweets.concat(this.tweets)
      this.newTweets = []
    },
    searchUsers(term){
      this.loading=true;
       this.socket.emit("search", term,(users)=>{
          this.loading=false
          this.users=users.map(u=>u.name)
       })
    },
    send() {
      if (this.message) {

        switch (this.type) {
          case 'tweet':
            this.socket.emit("tweet", this.message)
          case 'direct message':
            this.socket.emit("tweet", this.message)
          default:
            break;
        }

        this.message = ""
        this.sheet = false
      }
    }
  },
  mounted() {
    axios.post("/api/twitter/timeline", { account: this.account }).then(res => {
      this.tweets = res.data
    })
    let socket = io("/")
    socket.emit("init", this.account)
    socket.on("tweet", (tweet) => {
      //   console.log(tweet)
      this.newTweets.push(tweet)
    })
    this.socket = socket
  }, updated() {
    console.log(this)
  },

}
</script>

<style scoped>
.max-column {
  max-height: 100vh;
  overflow: scroll;
}
</style>
