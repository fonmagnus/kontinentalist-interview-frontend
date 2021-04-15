<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="9">
        <h3>Post(s) by </h3> <p>{{user.email}}</p>
      </v-col>
      <v-col cols="3">
        <v-btn outlined color="orange" @click="toggleShowDialog">
          + Create Post
        </v-btn>
      </v-col>
    </v-row>
    <PostListings :posts="posts"/>
    <PostDialog :showDialog="showDialog" @toggleShowDialog="toggleShowDialog"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { endpoint } from "~/api/endpoint";
import PostListings from "~/components/posts/PostListings";
import PostDialog from "~/components/posts/PostDialog";
export default {
  computed: {
    ...mapGetters({
      user: 'getUser',
      accessToken: 'getAccessToken'
    })
  },
  components: {
    PostListings,
    PostDialog,
  },
  mounted() {
    if(!this.user.email) {
      this.$router.push('/')
    }
    this.$axios.setHeader('Authorization', 'JWT ' + this.accessToken)
    this.$axios.get(endpoint.POSTS).then((response) => {
      this.posts = response.data
    })
  },
  data() {
    return {
      posts: [],
      showDialog: false,
    }
  },
  methods: {
    toggleShowDialog() {
      this.showDialog = !this.showDialog 
    }
  }
}
</script>