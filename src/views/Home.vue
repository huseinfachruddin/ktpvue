<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        <userData/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import userData from '../components/User-data.vue'

export default {
  components:{
    userData
  },
  data() {
      return {

        }
    },
}
</script>



