import axios from 'axios'
export default{
    state:{
        user:{
          data:{},
          error:[],
          form:{}
        },
        loading:false
    },
    mutations:{
        setForm(state,data){
            state.user.form=data
        },
        setData(state,data){
            state.user.data=data        
        },
        setErrors(state,data){
            state.user.error=data        
        },
        setLoading(state,set){
            state.loading=set
        },
    },
    actions:{
        async user({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.get('/api/user?page='+data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setData',response.data.user)
                    commit('setLoading',false)
                }
            }catch(errors){
                commit('setLoading',false)
            }
        },
        async editUser({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/user/'+data.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if ( response.status==200) {
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Data berhasil diubah')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        },
        async editPasswordUser({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.put('/api/user/password/'+data.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Data berhasil diubah')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
        async deleteUser({commit},data){
            commit('setLoading',true)
            try{
                let response = await axios.delete('/api/user/'+data.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    commit('setLoading',false)
                    commit('setErrors',{})
                    alert('Data berhasil dihapus')
                }
            }catch(errors){
                commit('setErrors',errors.response.data.errors)
                commit('setLoading',false)
            }
        }, 
    }
}