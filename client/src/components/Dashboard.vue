<template>
    <v-layout fill-height row wrap>
        <v-speed-dial :direction="'left'">
            <v-btn slot="activator" color="blue darken-2" absolute class="hidden-md-and-up fab" bottom fab fixed right small dark hover>
                <v-icon>account_circle</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn fab dark small color="green">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
                <v-icon>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-speed-dial>
        <v-dialog v-model="linkDialog">
            <v-card>
                <v-card-title class="headline">Conect Account</v-card-title>
                <v-card-text>
                    <v-btn color="primary" @click="connect">Twitter</v-btn>
                    <v-btn color="primary" href="/api/twitter/login">Twitter</v-btn>
                    <v-btn color="primary" href="/api/twitter/login"> Twitter</v-btn>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red darken-1" flat="flat" @click.native="linkDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-flex xs1 class="v-column black hidden-sm-and-down text-xs-center" align-content-center>
            <v-btn color="primary" fab small dark @click="sheet=true">
                <v-icon>message</v-icon>
            </v-btn>
            <v-btn color="primary" fab small dark @click="linkDialog=true">
                <v-icon>link</v-icon>
            </v-btn>
            <v-btn color="error" fab small dark @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12 sm6 md4 class="v-column" v-for="account in accounts" :key="account.profile.id">
            <twitter-feed :disconnect="disconnectAccount" :account="account"></twitter-feed>
        </v-flex>
        <!--  <v-navigation-drawer dark persistent light :mini-variant.sync="mini" v-model="drawer">
                <v-toolbar flat class="transparent">
                    <v-list class="pa-0">
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>John Leider</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon @click.native.stop="mini = !mini">
                                    <v-icon>chevron_left</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <v-list class="pt-0" dense>
                    <v-divider></v-divider>
                    <v-list-tile v-for="item in items" :key="item.title">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
     -->
        <v-bottom-sheet inset v-model="sheet">
            
            <v-card>
                <v-card-title>
                    <v-select class="headline" :items="displayNames" v-model="selectedAccount" label="Select" single-line bottom></v-select>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field name="input-1" label="Label Text"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field name="input-1" label="Label Text" textarea counter="140"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select class="headline" :items="displayNames" v-model="e1" label="Type" single-line bottom></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="sheet = false">Close</v-btn>
                    <v-btn color="primary" @click.native="sheet = false">Send</v-btn>
                </v-card-actions>
            </v-card>
        </v-bottom-sheet>

    </v-layout>
</template>

<script>
import TwitterFeed from './TwitterFeed.vue';
import axios from 'axios';
import Api from '../Api';

export default {
    data: () => ({
        accounts: [],
        options: [
            { title: "Connect Account", action: () => { alert() } },
            { title: "Logout", action: () => { } }
        ],
        linkDialog: false,
        sheet: false,
        
        
    }),
    computed: {
        displayNames: function() {
            console.log(this.accounts.map(a => a.profile))
            if (this.accounts.length > 0) {
                return this.accounts.map(a => a.profile.displayName)
            }
            return []
        },
        selectedAccount:function(){
             console.log(this.accounts.map(a => a.profile))
            if (this.accounts.length > 0) {
                return this.displayNames[0]
            }
            return null
        }
    },
    mounted() {
        this.loadAccounts()
    },
    methods: {
        connect() {
            let child = window.open("/api/twitter/login", '', ' scrollbars=yes,menubar=no,width=500,height=500, resizable=yes,toolbar=no,location=no,status=no')
            this.linkDialog = false;
            window.loginCallBack = () => {
                this.loadAccounts()
            }
        },
        loadAccounts() {
            Api.get("/api/twitter/accounts").then((res) => {
                console.log(res)
                this.accounts = res.data

            })
        },
        disconnectAccount(id) {
            alert(id)
            axios.post("/api/twitter/disconnect", { profileId: id }).then((res) => {
                this.loadAccounts()
            })
        },
        logout() {
            if (confirm("Logout?")) {
                localStorage.removeItem("token")
                this.$router.push("/")
            }
        }
    },
    components: { TwitterFeed },

    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('token')) {
            next()
        } else { next({ path: "/" }) }
    },


}
</script>

<style scroped>
.v-column {
    max-height: 100vh;
    overflow: hidden;
}

.fab {
    margin-bottom: 20px;
}
</style>
