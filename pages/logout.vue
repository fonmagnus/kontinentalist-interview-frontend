<template>
  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
      setUser: 'setUser'
    })
  },
  mounted() {
    this.setAccessToken('')
    this.setRefreshToken('')
    this.setUser({})
    this.$router.push('/')
  }
}
</script>