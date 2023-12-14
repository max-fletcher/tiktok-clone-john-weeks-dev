<template>
  <div>
    <!-- ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT -->
    <!-- <MainLayout /> -->
  </div>
</template>

<script setup lang="ts">
  // import MainLayout from '~/layouts/MainLayout.vue'; // ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT

  definePageMeta({
    // NOTICE THAT THE LAYOUT COMPONENT IS NAMED MainLayout BUT HERE WE ARE CALLING IT main-layout. THIS IS BECAUSE WE CAN'T USE UNDERSCORES AND CAPITALS HERE AND ANY CAMELCASE IS PARSED AS 
    // KEBAB-CASE BY NUXT FOR DEFINE-COMPOSABLES
    layout: 'main-layout',
  })
</script>
