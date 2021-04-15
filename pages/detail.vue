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
      accessToken: 'getAccessToken'
    }),
  },
  data() {
    return {
      post: {}
    }
  },
  mounted () {
    this.$axios.setHeader('Authorization', 'JWT ' + this.accessToken)
    this.$axios.get(`${endpoint.POSTS}/${this.$route.query.postId}`).then((response) => {
      this.post = response.data
    })
  }
}
</script>