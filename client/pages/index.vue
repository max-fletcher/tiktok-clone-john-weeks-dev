<template>
  <!-- ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT -->
    <!-- <MainLayout> -->
    <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
      <div v-for="(post, index) in $generalStore.posts" :key="index">
        <PostMain v-if="post" :post="post" />
      </div>
    </div>
  <!-- </MainLayout> -->
</template>

<script setup lang="ts">
// import MainLayout from '~/layouts/MainLayout.vue'; // ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT

  definePageMeta({
    // NOTICE THAT THE LAYOUT COMPONENT IS NAMED MainLayout BUT HERE WE ARE CALLING IT main-layout. THIS IS BECAUSE WE CAN'T USE UNDERSCORES AND CAPITALS HERE AND ANY CAMELCASE IS PARSED AS 
    // KEBAB-CASE BY NUXT FOR DEFINE-COMPOSABLES
    layout: 'main-layout',
  })

  const { $generalStore } = useNuxtApp()

  onMounted(async () => {
    try {
      await $generalStore.getAllUsersAndPosts()
    } catch (error) {
      console.log(error);
      
    }
  })
</script>
