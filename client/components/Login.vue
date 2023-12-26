<template>
  <div>
    <div class="text-center text-[28px] mb-4 font-bold">Log in</div>

    <div class="px-6 pb-1.5 text-[15px]">Email Address</div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Email Address"
        v-model:input="email"
        inputType="email"
        :autoFocus="true"
        error=""
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Password"
        v-model:input="password"
        inputType="password"
      />
    </div>

    <div class="px-6 text-[12px] text-gray-600">Forgot Password ?</div>

    <div class="px-6 pb-2 mt-6">
      <button 
        :disabled="(!email || !password)" 
        @click="login" 
        :class="(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'" 
        class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
      >
        Log In
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $userStore, $generalStore } = useNuxtApp()

  const email = ref('')
  const password = ref('')
  const errors = ref('')

  const login = async () => {

    errors.value = null

    try {
      await $userStore.getTokens()
      await $userStore.login(email.value, password.value)
      await $userStore.getUser()

      $generalStore.isLoginOpen = false
    } catch (error) {
      console.log(error);
    }
  }
</script>