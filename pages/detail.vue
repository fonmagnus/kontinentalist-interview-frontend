<template>
  <PostDetail :post="post"/>
</template>

<script>
import { mapGetters } from "vuex";
import PostDetail from '~/components/posts/PostDetail'
import { endpoint } from "~/api/endpoint";
export default {
  components: {
    PostDetail,
  },
  computed: {
    ...mapGetters({
      accessToken: 'getAccessToken',
      user: 'getUser'
    }),
  },
  data() {
    return {
      post: {}
    }
  },
  mounted () {
    if(!this.user.email) {
      this.$router.push('/')
    }
    this.$axios.setHeader('Authorization', 'JWT ' + this.accessToken)
    this.$axios.get(`${endpoint.POSTS}/${this.$route.query.postId}`).then((response) => {
      this.post = response.data
    })
  }
}
</script>