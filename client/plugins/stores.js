import { useUsersStore } from '~/stores/user'
import { useProfileStore } from '~/stores/profile'
import { useGeneralStore } from '~/stores/general'

// WE ARE USING 'NUXT PERSISTED STATE'('@pinia-plugin-persistedstate/nuxt') SO THE STATE IS PERSISTED IN COOKIES(I.E EACH STATE HAS THE OPTION <-- persist: true -->. SEE DOCS).
// ALSO, WE ARE ALIASING THE STORES AND BINDING THE STORES TO 'NuxtApp' AS PLUGINS HERE SO WE DON'T HAVE TO IMPORT STORES IN COMPONENT EVERY TIME(I.E TO REDUCE REDUNDANCY OF IMPORTING 2 LINES INSTEAD OF 1 LINE)
export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide:{
      userStore: useUsersStore(),
      profileStore: useProfileStore(),
      generalStore: useGeneralStore(),
    }
  }
})
