<template>
  <v-row>
      <v-card
        v-for="(post, i) in posts"
        :key="post"
        class="pa-3 ma-4"
      >
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
          <v-btn outlined color="orange">
            Read More
          </v-btn>
          <v-btn color="red" outlined>
            Delete
          </v-btn>
          <v-spacer />
          <v-btn color="primary">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
  methods: {
    truncate(str){
      return str.replace(/(.{100})..+/, "$1...");
    },
  },
}
</script>