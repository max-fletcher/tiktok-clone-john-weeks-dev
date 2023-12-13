<template>
  <div>
    <TopNav />
    <div>
      <div :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''" class="flex justify-between mx-auto w-full lg:px-2.5 px-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
</script>

<style scoped>

</style>