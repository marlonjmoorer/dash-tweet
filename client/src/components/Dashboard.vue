<template>
    <!-- <v-tabs dark fixed centered v-model="displayNames[0]">
                    <v-toolbar dark color="primary" flat>
                        <v-toolbar-title class="white--text">Title</v-toolbar-title>
                        <v-spacer></v-spacer>

                        <v-btn icon @click.native.stop="dialog = true">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-menu offset-y>
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="item in options" :key="item.title" @click="item.action">
                                    <v-list-tile-title>
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
                <v-dialog v-model="dialog">
                    <v-card>
                        <v-card-title class="headline">Conect Account</v-card-title>
                        <v-card-text>
                            <v-btn color="primary" @click="login">Twitter</v-btn>
                            <v-btn color="primary" href="/api/twitter/login">Twitter</v-btn>
                            <v-btn color="primary" href="/api/twitter/login"> Twitter</v-btn>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="red darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
    <v-layout fill-height row wrap>
        <v-flex xs12 sm6  md4  class="max-column" v-for="account in accounts" :key="account.profile.id"> 
             <twitter-feed :account="account"></twitter-feed>
        </v-flex>
    </v-layout>
</template>

<script>
import TwitterFeed from './TwitterFeed.vue';
import axios from 'axios';

export default {
    data: () => ({
        accounts: [],
        options: [
            { title: "Connect Account", action: () => { alert() } },
            { title: "Logout", action: () => { } }
        ],
        dialog: false
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
        this.loadAccounts()
    },
    methods: {
        login() {
            let child = window.open("/api/twitter/login", '', ' scrollbars=yes,menubar=no,width=500,height=500, resizable=yes,toolbar=no,location=no,status=no')

            this.dialog = false;
            window.loginCallBack = () => {
                this.loadAccounts()
            }
        },
        loadAccounts() {
            axios.get("/api/twitter/accounts").then((res) => {
                console.log(res)
                this.accounts = res.data

            })
        }
    },
    components: { TwitterFeed },

    created() {

    }

}
</script>

<style scroped>
.max-column {
    max-height: 100vh;
    overflow: hidden;
}
</style>
