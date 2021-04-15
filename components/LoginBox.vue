<template>
  <v-card class="my-5">
    <v-img
      height="250"
      src="https://bobsegarini.files.wordpress.com/2020/06/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f703853565265506d6d71433133413d3d2d37333.gif"
    ></v-img>
    <v-card-title class="headline text-center">
      {{title}}
    </v-card-title>
    <v-card-subtitle>
      {{subtitle}}
    </v-card-subtitle>
    <v-card-text class="mt-5">
      <v-text-field
        v-model="inputForm.email"
        placeholder="My Email"
        label="My Email"
        :rules="[inputForm.rules.required, inputForm.rules.validateEmail]"
      >
        Test
      </v-text-field>
      <v-text-field
        v-model="inputForm.password"
        placeholder="My Password"
        label="My Password"
        :append-icon="inputForm.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="inputForm.showPassword = !inputForm.showPassword"
        :type="inputForm.showPassword ? 'text' : 'password'"
        :rules="[inputForm.rules.required]"
      >
        Test
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        nuxt
        to="/inspire"
        class="my-3 mx-3"
        outlined
      >
        Make an account
      </v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        class="my-3 mx-3"
        @click="doLogin"
        :disabled="!validData()"
      >
        Enter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { endpoint } from "~/api/endpoint.js";
import { mapActions } from "vuex";
export default {
  computed: {
    inputForm: function() {
      return {
        email: '',
        password: '',
        showPassword: false,
        rules: {
          required: value => !!value || 'Required.',
          validateEmail: (value) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase()) || 'Email must have a valid format';
          },
        },
      }
    },
  },
  data() {
    return {
      title: 'Hello :)',
      subtitle: 'I want to enter, please'
    }
  },
  methods: {
    ...mapActions({
      setUser: 'setUser',
      setAccessToken: 'setAccessToken',
      setRefreshToken: 'setRefreshToken',
    }), 
    validData() {
      return this.inputForm.rules.required(this.inputForm.email) && 
             this.inputForm.rules.required(this.inputForm.password) &&
             this.inputForm.rules.validateEmail(this.inputForm.email);
    },
    doLogin() {
      this.$axios.post(endpoint.GET_TOKEN, {
        email: this.inputForm.email,
        password: this.inputForm.password
      }).then((resp) => {
        this.$axios.setHeader('Authorization', 'JWT ' + resp.data.access)
        this.setAccessToken(resp.data.access)
        this.setRefreshToken(resp.data.refresh)

        this.$axios.get(endpoint.ME).then((resp) => {
          this.setUser(resp.data)
          this.$router.push('/home')
        })
      })
    }
  }
}
</script>