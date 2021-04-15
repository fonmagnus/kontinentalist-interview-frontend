<template>
  <v-row>
      <v-card
        v-for="(post, i) in posts"
        :key="post.id"
        class="pa-3 ma-4"
      >
        <v-card-subtitle>
          Posted by {{post.posted_by.email}}
        </v-card-subtitle>
        <v-img
          height="300"
          :src="`https://picsum.photos/300/400.webp?random=${i}`"
        ></v-img>
        <v-card-text>
          <p class="display-1 text--primary">
            {{post.title}}
          </p>
          <div class="text--primary">
            {{truncate(post.content)}}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn outlined color="orange" @click="gotoDetail(post)">
            Read More
          </v-btn>
          <v-btn color="red" outlined @click="deletePost(post)">
            Delete
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="updatePost(post)">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
      <PostDialog 
        :showDialog="show" 
        :id="dialog.id"
        :title="dialog.title" 
        :content="dialog.content" 
        @toggleShowDialog="toggleShowDialog"/>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { endpoint } from '~/api/endpoint';
import PostDialog from '~/components/posts/PostDialog'
export default {
  components: {
    PostDialog,
  }, 
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      show: false,
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
    toggleShowDialog() {
      this.show = !this.show 
    },
    truncate(str){
      return str.replace(/(.{100})..+/, "$1...");
    },
    gotoDetail(post) {
      this.$router.push(`/detail?postId=${post.id}`)
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
    }
  },
}
</script>