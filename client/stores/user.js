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

    async login(email, password){
      console.log('email & pass', email, password);
      let user = await $axios.post('api/login', {
        email: email,
        password: password
      })

      console.log('user login', user);
    },

    async getUser(){
      let res = await $axios.get('/api/logged-in-user')

      this.$state.id = res.data[0].id
      this.$state.name = res.data[0].name
      this.$state.bio = res.data[0].bio
      this.$state.image = res.data[0].image
    }
  },
  persist: true,
})