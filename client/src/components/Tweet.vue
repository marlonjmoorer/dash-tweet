<template>
    <!-- <v-list-tile avatar :key="tweet.id">
        <v-list-tile-avatar>
        <img v-bind:src="tweet.user.profile_image_url"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
        <v-list-tile-title>
            <b>{{tweet.user.name}}</b>@{{tweet.user.screen_name}}
        </v-list-tile-title>
        <p>{{tweet.text}}</p>
        </v-list-tile-content>
    </v-list-tile> -->
     <v-card>
        <img class="ml-2 mt-2" v-bind:src="tweet.user.profile_image_url"/>
        <v-card-title primary-title>
          <div>
            <span class="headline mb-0"><b>{{tweet.user.name}}</b>@{{tweet.user.screen_name}}</span>
            <div>{{tweet.text}}</div>
          </div>
        </v-card-title>
       <!--  <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
      </v-card>
</template>

<script>
export default {
  data:()=>({
       
    }),
    props:['tweet'],

}
</script>

<style>

</style>
