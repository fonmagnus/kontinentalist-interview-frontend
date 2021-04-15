<template>
  <v-container>
    <v-row justify="center" class="my-5">
      <v-img
        :src="`https://picsum.photos/400/600?random=${$route.query.postId}`"
        max-height="400"
        max-width="600"
      >
      </v-img>
    </v-row>  
    <v-row justify="center" class="mt-5">
      <h1>{{post.title}}</h1>
    </v-row>
    <v-row justify="center" class="mt-5">
      <p>{{post.content}}</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    post:{
      type: Object,
      required: true,
    }
  }
}
</script>