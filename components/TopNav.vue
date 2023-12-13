<template>
  <div id="TopNav" class="fixed bg-white z-30 flex items-center w-full border-b h-[61px]">
    <div :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''" class="flex items-center justify-between w-full px-6 mx-auto">
      <div :class="route.fullPath === '/' ? '' : 'lg:w-[20%] w-[70%]'">
      <!-- <div :class="route.fullPath === '/' ? 'w-[80%]' : 'lg:w-[20%] w-[70%]'"> -->
        <NuxtLink to="/">
          <img width="115" src="~/assets/images/tiktok-logo.png">
        </NuxtLink>
      </div>
      <div class="hidden md:flex items-center bg-[#F1F1F1] p-1 rounded-full max-w-[380px] w-full">
        <input type="text" class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none" placeholder="Search accounts" />
        <div class="px-3 py-1 flex items-center border-l border-l-gray-300">
          <Icon name="ri:search-line" color="#A1A2A7" size="22" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
</script>

<style scoped>

</style>