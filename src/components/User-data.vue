<template>
<div>
  <v-container>
  <v-row>
    <v-col>
      <v-card
      class="overflow-hidden"
      color=""
    >
      <v-toolbar
        flat
        color="orange lighten-2"
      >
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data User
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/role" style="text-decoration: none;" >
                  <v-btn
                    color="primary"
                    small
                  >
                    <v-icon color="white"
                      class="ma-1" 
                      mdi-key>
                    </v-icon>
                    Data Role
                  </v-btn>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  image
                </th>
                <th class="text-left">
                  Username
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  NIK
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.data"
                :key="index"
              >

                <td>
                  <v-img
                    :lazy-src="data.img"
                    max-height="50"
                    max-width="50"
                    :src="data.img"
                  ></v-img>
                </td>

                <td>{{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.nik}}</td>
                <td>   
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="password = true,edit=data"
                      >
                      mdi-key
                    </v-icon>    
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data"
                      >
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteUser(data)"
                      >
                      mdi-delete
                    </v-icon> 
                </td>
              </tr>
            </tbody>
        </v-simple-table>
            <v-divider></v-divider>
              <div >
                <v-pagination
                  v-model="data.current_page"
                  :length="data.last_page"
                  @input="getUser(data)"
                ></v-pagination>
              </div>
    </v-card>
    </v-col>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="100%"
      height="100%"
    >
      <v-card>
        <v-card-title class="text-h5 orange lighten-2">
          Edit User..
        </v-card-title>

      <v-card-text class="pa-3">
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <div class="d-flex justify-center">
        <v-img
        class="ma-3"
        :lazy-src="img = edit.img"
        max-height="100"
        max-width="100"
        :src="img = edit.img"
        ></v-img>
        </div>
                  
        <div class="ma-3 d-flex justify-center">
        <v-btn
        small
        color="info"
        v-if="!upload"
        @click="upload=true"
        >
          ganti foto ktp
        </v-btn>
        <v-btn
        small
        color="error"
        v-if="upload"
        @click="upload=false"
        >
          gagal
        </v-btn>
        </div>
        <div v-if="upload" class="ma-3">
            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" type="file" @vdropzone-complete="afterComplete" :v-model="edit.img=img"
            >
            </vue-dropzone>
        </div>
        <v-text-field
          small
          outlined
          v-model="edit.name"
          label="Username...."
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.email"
          label="Email...."
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.nik"
          label="Nomor Induk Kependudukan..."
        ></v-text-field>
      </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            small
            @click="dialog=false"
          >
            tutup
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            @click="editUser(edit)"
          >
            simpan data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog
      v-model="password"
      width="100%"
      height="100%"
    >
      <v-card>
        <v-card-title class="text-h5 orange lighten-2">
          Edit User..
        </v-card-title>

      <v-card-text class="pa-3">
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-text-field
          small
          outlined
          v-model="edit.oldPassword"
          label="Password lama ..."
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.newPassword"
          label="Password baru ..."
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.rePassword"
          label="Ulangi password baru ..."
        ></v-text-field>
      </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            small
            @click="password=false"
          >
            tutup
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            @click="passwordUser(edit)"
          >
            simpan data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </v-row>
  </v-container>
  
</div>
</template>
<script>
import axios from 'axios'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components:{
    vueDropzone: vue2Dropzone
  },
    data () {
      return {
        success: false,
        model: null,
        dialog: false,
        edit: false,
        img:null,
        password:null,
        upload:false,
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 300,
          maxFiles: 1,
          addRemoveLinks: true,
          acceptedFiles: ".png,.jpg,.jpeg",
          dictDefaultMessage: "Upload Foto KTP",
          init : function() {
            this.on("maxfilesexceeded", function(file) {
                  this.removeAllFiles();
                  this.addFile(file);
            });
          }
      }
      }
    },
    computed:{
      data(){
        return this.$store.state.user.user.data;        
      },
      errors(){
        return this.$store.state.user.user.error;
      },
      form(){
        return this.$store.state.user.user.form;
      },
      loading(){
        return this.$store.state.user.loading;
      },
    },
    methods: {
      async getUser(data){
        await this.$store.dispatch('user',data.current_page);
      },
      async editUser(data){
        await this.$store.dispatch('editUser',data);
        await this.getUser(this.data.current_page)
      },
      async passwordUser(data){
        await this.$store.dispatch('editPasswordUser',data);
        await this.getUser(this.data.current_page)
      },
      async deleteUser(data){
        await this.$store.dispatch('deleteUser',data);
        await this.getUser(this.data.current_page)
      },
      async afterComplete(file){
        try {
            const formData = new FormData()
            formData.append('img',file)
            console.log(file)
          let response = await axios.post('/api/user/image/'+this.edit.id,formData,{headers: {'Content-Type': 'multipart/form-data','Authorization': 'Bearer '+localStorage.getItem('token')}})          
          if (response.status==200) {
            console.log(response.data)
            this.edit.img = response.data.user.img
            await this.getUser(this.data.current_page)
          }
        } catch (error) {
          console.log(error)
        }

      }
    },
    mounted() {
      this.getUser(1)
    }
  }
</script>
