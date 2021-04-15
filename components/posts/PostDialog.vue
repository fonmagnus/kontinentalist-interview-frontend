<template>
  <div class="text-center">
    <v-dialog
      v-model="showDialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
        {{id ? "Edit Post" : "Create Post"}}
        </v-card-title>

        <v-card-text class="mt-5">
          <v-text-field
            color="orange"
            v-model="inputForm.title"
            placeholder="Post Title"
            label="Post Title"
            :rules="[inputForm.rules.required]"
            class="mb-5"
          >
            Test
          </v-text-field>
          <v-textarea
            class="mt-5"
            color="orange"
            v-model="inputForm.content"
            placeholder="Content"
            label="Content"
            :rules="[inputForm.rules.required]"
          >
            Test
          </v-textarea>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="orange"
            outlined
            @click="toggleShowDialog"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            outlined
            @click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { endpoint } from "~/api/endpoint";
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    inputForm: function() {
      return {
        title: this.title,
        content: this.content,
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    }
  },
  methods: {
    toggleShowDialog() {
      this.$emit('toggleShowDialog')
    },
    submit() {
      if (!this.id) {
        this.$axios.post(endpoint.CREATE_POST, {
          title: this.inputForm.title,
          content: this.inputForm.content
        }).then(() => {
          this.toggleShowDialog()
          location.reload()
        })
      } else {
        this.$axios.put(`${endpoint.UPDATE_POST}/${this.id}`, {
          title: this.inputForm.title,
          content: this.inputForm.content
        }).then(() => {
          this.toggleShowDialog()
          location.reload()
        })
      }
    }
  }
}
</script>