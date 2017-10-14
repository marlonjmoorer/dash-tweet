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
                        <v-card-text>
                        <v-container>
                              <v-btn color="primary" @click="login" >Login with Twitter</v-btn>
                              <v-btn color="primary" @click="login" >Login with Facebook</v-btn>
                              <v-btn color="primary" href="/api/twitter/login" >Login with Instagram</v-btn>
                        </v-container>
                        </v-card-text>

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
        login(){
           let child= window.open("/api/twitter/login",'',' scrollbars=yes,menubar=no,width=500,height=500, resizable=yes,toolbar=no,location=no,status=no')
            console.log(child)
           window.loginCallBack=()=>{
              this.$router.push('dashboard')
           }
        },
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
    },created(){
    
    }

}
</script>

<style scoped>
.outter >div{
    
    width: 100%;
    height: 100vh !important;
}
</style>
