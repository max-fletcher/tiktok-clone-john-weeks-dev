import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoginOpen : '',
    isEditProfileOpen : '',
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
})