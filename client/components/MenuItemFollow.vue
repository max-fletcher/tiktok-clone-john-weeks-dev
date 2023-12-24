<template>
  <div class="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
    <img src="https://picsum.photos/id/8/300/320" width="35" class="rounded-full lg:mx-0 mx-auto" />
    <div class="lg:pl-2.5 lg:block hidden">
      <div class="flex items-center">
        <div class="font-bold text-[14px]">
          User Name
        </div>
        <div class="ml-1 rounded-full bg-[#58D5EC] h-[14px] relative">
          <Icon class="relative -top-[7px]" name="teenyicons:tick-small-solid" color="#FFF" size="15" />
        </div>
      </div>
      <div class="font-light text-[12px] text-gray-600">
        User Name
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps(['user'])
</script>