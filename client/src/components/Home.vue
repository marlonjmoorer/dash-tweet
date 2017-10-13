<template>
    <div class="outter">
       <v-parallax src="http://www.elsa-belgium.org/wp-content/uploads/2014/12/Parallax-Background-Dark-11-1.jpg">
        <v-container grid-list-md text-xs-center fill-height column align-content-center justify-center dark>
            <v-layout row wrap align-center>
                <v-flex xs12 md6 class="mt-5">
                    <img src="https://netdna.webdesignerdepot.com/uploads/circular_logos/Accelrys.jpg" alt="Vuetify.js" height="200">
                    <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1>
                    <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card color="secondary" dark flat class="mt-5">
                        <v-card-title primary-title>
                            <h3 class="headline mb-0">Login</h3>
                        </v-card-title>
                        <v-container>
                            <v-form v-model="valid"  ref="form" lazy-validation>
                                <span>{{error}}</span>
                                <v-text-field  dark label="Username" v-model="username" :rules="usernameRules" required></v-text-field>
                                <v-text-field  dark label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
                                <span>Not a member?
                                    <a>Sign Up</a>
                                </span>
                                <v-btn @click="submit" color="primary" :disabled="!valid">
                                    Login
                                </v-btn>
                                <v-btn @click="clear">clear</v-btn>

                            </v-form>
                        </v-container>

                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
       </v-parallax>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        valid: true,
        username: '',
        usernameRules: [
            function(v) { return !!v || 'Username is required' },
            //function(v) { return v && v.length <= 10 || 'Username must be less than 10 characters' }
        ],
        password: '',
        passwordRules: [
            function(v) { return !!v || 'Password is required' },
            //function(v) { return v && v.length <= 8 || 'Password must be less than 8 characters' }
        ],
        error:null
    }),
    methods: {
        submit() {
            this.error=null;
            if (this.$refs.form.validate()) {
                axios.post("api/login", ({
                    username: this.username,
                    password: this.password
                })).then(res => {

                }).catch(error => {
                    console.log(error.response)
                    this.error=error.response.data.message
                });
                console.log("here")
            }
        },
        clear() {
            this.error=null;
            this.$refs.form.reset()
        }
    }

}
</script>

<style scoped>
.outter >div{
    
    width: 100%;
    height: 100vh !important;
}
</style>
