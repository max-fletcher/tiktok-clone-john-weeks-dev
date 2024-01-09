// THIS IS A AUTH MIDDLEWARE THAT WE WILL APPLY ON SELECTED ROUTES

import { useUsersStore } from "~/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUsersStore()

  // IF THE ROUTE WE ARE NAVIGATING TO IS NOT THE HOME ROUTE(I.E '/') AND IF THE USER IS NOT LOGGED IN, NAVIGATE TO THE HOME ROUTE(I.E '/')
  if(to !== '/' && !userStore.id){
    return navigateTo('/')
  }
})