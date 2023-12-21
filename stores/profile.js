import { defineStore } from 'pinia'

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
    //
  },
  persist: true,
})