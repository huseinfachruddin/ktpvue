import axios from 'axios'
import router from '../router'
export default{
    state:{
        profile:{
          data:{},
          error:[],
          form:{}
        },
        loading:false
    },
    getters: {

    },
    mutations:{
        setForm(state,data){
            state.profile.form=data
        },
        setData(state,data){
            state.profile.data=data        
        },
        setErrors(state,data){
            state.profile.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async login({commit},data) {
            commit('setLoading',true)
            try {
              let response = await axios.post("/api/login",data);
              if (response.status == 200) {
                commit('setData',response.data.user)
                localStorage.setItem("token", response.data.token)
                commit('setLoading',false)
                console.log(response.data.user)
                router.push('/')                
              }
            } catch (errors) {
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async register({commit},data){
            commit('setLoading',true)
            const formData = new FormData
            formData.append('name',data.name)
            formData.append('email',data.email)
            formData.append('nik',data.nik)
            formData.append('img',data.img)
            formData.append('password',data.password)
            formData.append('rePassword',data.rePassword)
            try {
              let response = await axios.post('/api/register',formData,{headers: {'Content-Type': 'multipart/form-data'}});
              if (response.status==200){
                alert('Registrasi Berhasil')
                commit('setForm',{})
                commit('setErrors',{})
                commit('setLoading',false)
                return router.push('/login');
              }
            } catch (errors) {
              commit('setErrors',errors.response.data.errors)
              commit('setLoading',false)
            }
      
          },
        async logout({commit}){
          commit('setLoading',true)
          try{
            let response = await axios.get('/api/logout',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}});
            if (response.status == 200) {
                localStorage.removeItem("token")
                commit('setData',{})
                commit('setLoading',false)
                return router.push({ name: 'login' })                
            }
          }catch (errors) {
            commit('setErrors',errors.response.data.errors)
            commit('setLoading',false)
        }
        },
        async profile({commit}){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/profile',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setLoading',false)
                return router.push('/login');
            }
        },
        async editProfile({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/profile',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Data berhasil disimpan')
                }
            }catch(errors){
              console.log(errors.response.data)
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
        async editPassword({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/profile/password',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.profile)
                    commit('setLoading',false)
                    commit('setForm',{})
                    commit('setErrors',{})
                    alert('Password berhasil diganti')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
      
    }
}