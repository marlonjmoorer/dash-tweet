<template>
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

<script>
export default {
  data:()=>({
       
    }),
    props:['tweet'],

}
</script>

<style>

</style>
