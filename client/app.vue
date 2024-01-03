<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <AuthOverlay v-if="isLoginOpen" />
      <EditProfileOverlay v-if="isEditProfileOpen" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  // 'storeToRefs' CONVERTS STORE STATES AND GETTERS TO REFS SO IT CAN BE DESTRUCTURED WHILE MAINTAINING REACTIVITY, AND IF NEED BE, PASSED AS PROP TO ANY COMPONENT.
  // ACTIONS CAN BE DESTRUCTURED DIRECTLY WITHOUT USING 'storeToRefs'.
  import { storeToRefs } from 'pinia'

  // IMPORT '$generalStore' FROM useNuxtApp(ALIASED INSIDE plugins/store) AND GET THE 'isLoginOpen' STATE AS A REF FROM IT
  const { $userStore, $generalStore } = useNuxtApp()
  const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore)

  onMounted(async () => {
    // THIS IS TO PREVENT SCROLLING WHEN MODALS(LOGIN/REGISTER AND EDITPROFILE) ARE OPEN. ALSO SEE 'general.js' - 'bodySwitch(val)' (WHERE 'generalStore' ACTIONS ARE DEFINED) FOR THE REST OF THE FUNCTIONAL CODE
    $generalStore.bodySwitch(false)
    isLoginOpen.value = false
    isEditProfileOpen.value = false

  // WORKS LIKE A MIDDLEWARE. WHENEVER A PAGE IS LOADED, THIS CHECKS IF SESSION HAS EXPIRED OR NOT USING INTERCEPTORS WHENEVER A REQUEST TO THE SERVER(USING AXIOS) IS MADE
    try {
      await $generalStore.hasSessionExpired()
      await $generalStore.getRandomUsers('suggested')
      await $generalStore.getRandomUsers('following')

      if($userStore.id){
        $userStore.getUser()
      }

    } catch (error) {
      console.log(error);
    }
  })

  // WHEN isLoginOpen.value OR isEditProfileOpen.value CHANGES, THEIR VALUE(i.e val) IS FED INTO THE 'bodyswitch' FUNCTION IN $generalStore, WHICH CAUSES SCROLLING TO BE DISABLED
  // SEE ABOVE BLOCK AND 'general.js' - 'bodySwitch(val)' (WHERE 'generalStore' ACTIONS ARE DEFINED) FOR THE REST OF THE FUNCTIONAL CODE
  watch(() => isLoginOpen.value, (val) => $generalStore.bodySwitch(val))
  watch(() => isEditProfileOpen.value, (val) => $generalStore.bodySwitch(val))
</script>
