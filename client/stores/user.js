import { defineStore } from 'pinia'
import axios from '../plugins/axios' // import axios instance from axios.js.
import { useGeneralStore } from './general'

const $axios = axios().provide.axios //getting the axios instance provided by provider. See that file.

// THE <-- persist: true --> OPTION IS USING NUXT_PINIA_PERSIST PACKAGE TO STORE THESE STORES AS COOKIES
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

    async createPost(data){
      return await $axios.post('/api/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },

    async addComment(post, comment){
      let res = await $axios.post(`/api/comments`, {
        post_id: post.id,
        comment: comment
      })

      if(res.status === 200){
        await this.updateComments(post)
      }
    },

    async deleteComment(post, commentId){
      let res = await $axios.delete(`/api/comments/${commentId}`, {
        post_id: post.id
      })

      if(res.status === 200){
        await this.updateComments(post)
      }
    },

    // MAKES AN API 
    async updateComments(post){
      let res = await $axios.get(`/api/profiles/${post.user.id}`)

      console.log('update comments res' ,res);

      for (let i = 0; i < res.data.posts.length; i++) {
        const updatePost = res.data.posts[i];

        if(post.id === updatePost.id){
          useGeneralStore().selectedPost.comments = updatePost.comments
        }
      }
    },

    async likePost(post, isPostPage){
      let res = await $axios.post(`/api/like`, {
        post_id: post.id,
      }, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log(res);

      let singlePost = null

      // IF POST PAGE IS GIVEN(OF TYPE TRUE OR ANY), ASSIGN THE POST TO "singlePost" ELSE, FIND THE POST FROM GENERAL STORE "posts" STATE AND ASSIGN
      // ELSE IS IF THE FUNCTION IS CALLED FROM THE MAIN PAGE.
      if(isPostPage){
        singlePost = post
      }
      else{
        singlePost = useGeneralStore().posts.find(p => p.id === post.id)
      }

      // PUSH THE LIKE INTO STORE
      singlePost.likes.push(res.data.like)
    },

    async unlikePost(post, isPostPage){
      let deleteLike = null
      let singlePost = null

      // IF POST PAGE IS GIVEN(OF TYPE TRUE OR ANY), ASSIGN THE POST TO "singlePost" ELSE, FIND THE POST FROM GENERAL STORE "posts" STATE AND ASSIGN
      // ELSE IS IF THE FUNCTION IS CALLED FROM THE MAIN PAGE.
      if(isPostPage){
        singlePost = post
      }
      else{
        singlePost = useGeneralStore().posts.find(p => p.id === post.id)
      }

      singlePost.likes.forEach(like => {
        if(like.user_id === this.id){
          deleteLike = like
        }
      })

      let res = await $axios.delete(`/api/like/${deleteLike.id}`)

      // REMOVE THE LIKE FROM INSIDE THE POST
      for (let i = 0; i < singlePost.likes.length; i++) {
        const like = singlePost.likes[i];
        if(like.id === res.data.like.id){
          singlePost.likes.splice(i, 1)
        }
      }
    },

    async updateUserImage(data){
      return await $axios.post('/api/update-user-image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },

    async updateUser(name, bio){
      return await $axios.post(`/api/update-user/${this.$state.id}`, {
        name: name, bio: bio
      }, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },

  },
  persist: true,
})