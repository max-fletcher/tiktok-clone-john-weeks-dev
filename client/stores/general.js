import { defineStore } from 'pinia'

// THE <-- persist: true --> IS USING NUXT_PINIA_PERSIST PACKAGE TO STORE THESE STORES AS COOKIES
export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoginOpen : '',
    isEditProfileOpen : false,
    selectedPost : '',
    ids : '',
    isBackUrl: '',
    posts: '',
    suggested: '',
    following: '',
  }),
  actions: {
    //
  },
  persist: true,
})