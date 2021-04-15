<template>
  <div>
    <h3 class="my-5">Posts Manager</h3>
    <v-list
      subheader
      two-line
      class="mt-5"
    >
      <v-list-item
        v-for="(post, i) in posts"
        :key="post.id"
      >
        <v-list-item-avatar>
          <v-img :src="`https://picsum.photos/150/150.webp?random=${i}`"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="post.title"></v-list-item-title>
          <v-list-item-subtitle v-text="post.posted_by.email"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="red" outlined @click="deletePost(post)">
            <v-icon color="red">mdi-delete</v-icon> Delete
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn color="blue" outlined @click="updatePost(post)">
            <v-icon color="blue">mdi-pen</v-icon> Edit
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <PostDialog 
        :showDialog="showDialog" 
        :id="dialog.id"
        :title="dialog.title" 
        :content="dialog.content" 
        @toggleShowDialog="toggleShowDialog"/>
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
      dialog: {
        id: 0,
        title: '',
        content: '',
      }
    }
  },
  methods: {
    updatePost(post) {
      this.dialog = {
        ...post
      }
      this.toggleShowDialog()
    },
    deletePost(post) {
      this.$swal({
        title: 'Are you sure?',
        text: 'When this post is deleted, it will be deleted permanently',
        imageUrl: 'https://cdn.dribbble.com/users/1560133/screenshots/4675646/confused.gif',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'orange',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if(result.value) {
          this.$axios.delete(`${endpoint.DELETE_POST}/${post.id}`)
          location.reload()
        }
      })
    },
    toggleShowDialog() {
      this.showDialog = !this.showDialog 
    }
  }
}
</script>