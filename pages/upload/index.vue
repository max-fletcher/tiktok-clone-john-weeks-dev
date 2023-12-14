<template>
  <!-- ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT -->
  <!-- <UploadLayout> -->
  <div class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
    <div>
      <div class="text-[23px] font-semibold">Upload video</div>
      <div class="text-gray-400 mt-1">Post a video to your account</div>
    </div>
  </div>
  <!-- </UploadLayout> -->
</template>

<script setup lang="ts">
  // import UploadLayout from '~/layouts/UploadLayout.vue'; // ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT

  definePageMeta({
    // NOTICE THAT THE LAYOUT COMPONENT IS NAMED MainLayout BUT HERE WE ARE CALLING IT main-layout. THIS IS BECAUSE WE CAN'T USE UNDERSCORES AND CAPITALS HERE AND ANY CAMELCASE IS PARSED AS 
    // KEBAB-CASE BY NUXT FOR DEFINE-COMPOSABLES
    layout: 'upload-layout',
  })
</script>
