<template>
    <v-list-tile avatar :key="tweet.id">
        <v-list-tile-avatar>
        <img v-bind:src="tweet.user.profile_image_url"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
        <v-list-tile-title>
            <b>{{tweet.user.name}}</b>@{{tweet.user.screen_name}}
        </v-list-tile-title>
        <p>{{tweet.text}}</p>
        </v-list-tile-content>
    </v-list-tile>
    
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
