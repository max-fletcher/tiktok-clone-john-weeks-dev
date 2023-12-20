import { defineStore } from 'pinia'

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
})