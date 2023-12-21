import { defineStore } from 'pinia'

// THE <-- persist: true --> IS USING NUXT_PINIA_PERSIST PACKAGE TO STORE THESE STORES AS COOKIES
export const useUsersStore = defineStore('user', {
  state: () => ({
    id : '',
    name : '',
    bio : '',
    image : '',
  }),
  actions: {
    //
  },
  persist: true,
})