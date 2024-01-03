import { defineStore } from 'pinia'
import axios from '../plugins/axios' // import axios instance from axios.js.

const $axios = axios().provide.axios //getting the axios instance provided by provider. See that file.

// THE <-- persist: true --> IS USING NUXT_PINIA_PERSIST PACKAGE TO STORE THESE STORES AS COOKIES
export const useProfileStore = defineStore('profile', {
  state: () => ({
    id : '',
    name : '',
    bio : '',
    image : '',
    post: '',
    posts: '',
    allLikes: ''
  }),
  actions: {
    async getProfile(id){
      this.resetUser()
      let res = await $axios.get(`/api/profiles/${id}`)

      this.$state.id = res.data.user.id
      this.$state.name = res.data.user.name
      this.$state.bio = res.data.user.bio
      this.$state.image = res.data.user.image
      this.$state.posts = res.data.posts
    },

    // Just a function so no need for async.
    resetUser(){
      this.$state.id = ''
      this.$state.name = ''
      this.$state.bio = ''
      this.$state.image = ''
      this.$state.posts = ''
    },
  },
  persist: true,
})