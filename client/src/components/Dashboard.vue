<template>
    <v-tabs dark fixed centered v-model="displayNames[0]">
        <v-toolbar dark color="primary" flat>
            <v-toolbar-title class="white--text">Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--  <v-menu >
                <v-btn icon slot="activator">
                    <v-icon left >more_vert</v-icon> Connect Account
                </v-btn>
                <v-list>
                    <v-list-tile v-for="item in options" :key="item.title">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> -->
            
            <v-menu offset-y>
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="item in options" :key="item.title" @click="item.action">
                        <v-list-tile-title >
                            {{ item.title }}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>
        <v-tabs-bar class="primary">
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item v-for="name in displayNames" :key="name" :href="`#${name}`">
                {{ name}}
            </v-tabs-item>
        </v-tabs-bar>

        <v-tabs-items>
            <v-tabs-content v-for="account in accounts" :key="account.profile.id" :id="account.profile.displayName">
                <v-card flat>
                    <v-card-text>
                        <twitter-feed :account="account"></twitter-feed>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import TwitterFeed from './TwitterFeed.vue';
import axios from 'axios';

export default {
    data: () => ({
        accounts: [],
        options:[
            {title:"Connect Account",action:()=>{alert()}},
            {title:"Logout"}
        ]
    }),
    computed: {
        displayNames: function() {
            console.log(this.accounts.map(a => a.profile))
            if (this.accounts.length > 0) {
                return this.accounts.map(a => a.profile.displayName)
            }
            return []
        }
    },
    mounted() {
        console.log(this)
        axios.get("/api/twitter/accounts").then((res) => {
            console.log(res)
            this.accounts = res.data
            // this.popup=res.data
            // this.dialog=true;
        })
    },
    methods:{

    },
    components: { TwitterFeed },

    created() {

    }

}
</script>

<style>

</style>
