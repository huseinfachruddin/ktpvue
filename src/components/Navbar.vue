<template>
<div id="navbar">
    <v-toolbar 
    color="light-blue darken-4 opacity-">
    <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="d-flex justify-center">
      <h3 class="ma-1 white--text d-none d-sm-flex">Data User</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-yellow--text text--accent-4"
        >
      <v-list-item class="yellow">
        <router-link to="/" style="text-decoration: none;" >
        <v-list-item-content v-if="profile.name">
          <v-list-item-title class="text-h6">
            {{profile.name}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{profile.email}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="!profile.name">
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
        </v-list-item-content>
        </router-link>
      </v-list-item>

      <v-divider></v-divider>
          <router-link to="/" style="text-decoration: none;" >
              <v-list-item>
                <v-list-item-title >data User</v-list-item-title>
              </v-list-item>
          </router-link>
          <v-list-item>
            <v-list-item-title >
              <v-btn
              v-if="login"
              @click="logout()"
              color="error"
              small
              >
              <v-icon>
                    mdi-logout
              </v-icon>
                logout
          </v-btn>
          <router-link to="/login" style="text-decoration: none;" >
          <v-btn
              v-if="!login"
              color="info"
              small
              >
              <v-icon>
                    mdi-login
              </v-icon>
                Login
          </v-btn>
          </router-link>
          </v-list-item-title>
                </v-list-item>


        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style >

</style>


<script>
import axios from 'axios'

  export default {
    data: () => ({
      drawer: false,
      group: null,
      role:null,
      profile:{},
      login:false
    }),
    computed:{

    },
    methods:{
      logout(){
        return this.$store.dispatch('logout')
      },
      async getProfile(){
            try{
                let response = await axios.get('/api/profile',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.login=true
                  this.profile=response.data.profile
                }
            }catch(errors){
              console.log(errors)
              this.login=false
            }
      }
    },
    mounted() {
        this.getProfile()
    },
  }
</script>