<template>
  <div>
    <TopNav />
    <div>
      <div :class="route.fullPath === '/' ? 'max-w-[1150px]' : ''" class="flex justify-between mx-auto w-full lg:px-2.5 px-0">
        <div>
          <SideNavMain />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
</script>