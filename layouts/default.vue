<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="display(item) ? item.to : ''"
          router
          exact
        >
          <v-list-item-action v-if="display(item)">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <div v-else></div>
          <v-list-item-content v-if="display(item)">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <div v-else></div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: 'getUser',
    })
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/home',
          isLoginMenu: true,
          isAdminMenu: false,
        },
        {
          icon: 'mdi-book',
          title: 'Posts Manager',
          to: '/post-manager',
          isLoginMenu: true,
          isAdminMenu: true,
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
          isLoginMenu: true,
          isAdminMenu: false,
        },
      ],
      title: 'Kontinentalist Interview Project - by Arnold Ardianto'
    }
  },
  methods: {
    display(item){
      if(!item.isLoginMenu) return true
      else {
        if(!item.isAdminMenu) return this.user.email
        else {
          return this.user.role === 'Admin'
        }
      }
    }
  }
}
</script>
