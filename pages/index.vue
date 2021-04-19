<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <AccountBox/>
    </v-col>
  </v-row>
</template>

<script>
import AccountBox from '~/components/AccountBox.vue'
import { mapGetters } from "vuex";
export default {
  components: {
    AccountBox,
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      accessToken: 'getAccessToken'
    })
  },
  mounted() {
    if (this.user.email){
      this.$axios.setHeader('Authorization', 'JWT ' + this.accessToken)
      this.$router.push('/home')
    }
  }
}
</script>
