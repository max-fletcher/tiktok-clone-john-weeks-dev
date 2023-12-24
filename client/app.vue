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
  const { $generalStore } = useNuxtApp()
  const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore)
</script>
