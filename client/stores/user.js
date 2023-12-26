import { defineStore } from 'pinia'
import axios from '../plugins/axios' // import axios instance from axios.js.

const $axios = axios().provide.axios //getting the axios instance provided by provider. See that file.

// THE <-- persist: true --> IS USING NUXT_PINIA_PERSIST PACKAGE TO STORE THESE STORES AS COOKIES
export const useUsersStore = defineStore('user', {
  state: () => ({
    id : '',
    name : '',
    bio : '',
    image : '',
  }),
  actions: {
    async getTokens(){
      // SETS CSRF TOKEN FOR THE AXIOS INSTANCE. BECAUSE WE SET 'axios.defaults.withCredentials = true'
      await $axios.get('/sanctum/csrf-cookie')
    },

    async register(name, email, password, confirmPassword){
      console.log('register info', name, email, password, confirmPassword);
      let user = await $axios.post('register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })
    },

    async login(email, password){
      console.log('login info', email, password);
      let user = await $axios.post('login', {
        email: email,
        password: password
      })
    },

    async logout(){
      await $axios.post('/logout')
      this.resetUser()
    },

    // Just a function so no need for async.
    resetUser(){
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.bio = ''
      this.$state.image = ''
    },

    async getUser(){
      let res = await $axios.get('/api/logged-in-user')

      this.$state.id = res.data.data.id
      this.$state.name = res.data.data.name
      this.$state.email = res.data.data.name
      this.$state.bio = res.data.data.bio
      this.$state.image = res.data.data.image
    },
  },
  persist: true,
})