<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <AuthOverlay v-if="isLoginOpen" />
      <EditProfileOverlay />
      <!-- v-if="isEditProfileOpen" -->
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  // CONVERTS STORE TO REF SO IT CAN BE USED IN ANY COMPONENT. ELSE, AN ERROR WILL BE THROWN.
  import { storeToRefs } from 'pinia'

  // IMPORT '$generalStore' FROM useNuxtApp(ALIASED INSIDE plugins/store) AND GET THE 'isLoginOpen' STATE AS A REF FROM IT
  const { $generalStore } = useNuxtApp()
  const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore)
</script>
