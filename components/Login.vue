<template>
  <div>
    <div class="text-center text-[28px] mb-4 font-bold">Log in</div>

    <div class="px-6 pb-1.5 text-[15px]">Email Address</div>

    <div class="px-6 pb-2">
      <!-- CUSTOM INPUT COMPONENT. 'inputType', 'autoFocus' AND 'error' ARE PROPS -->
      <TextInput 
        placeholder="Email Address"
        v-model:input="email"
        inputType="email"
        :autoFocus="true"
        error=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const email = ref('')
</script>