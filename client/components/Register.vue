<template>
  <div>
    <div class="text-center text-[28px] mb-4 font-bold">Register</div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Full Name"
        v-model:input="name"
        inputType="text"
        :autoFocus="true"
        :error="errors && errors.name ? errors.name[0] : ''"
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Email Address"
        v-model:input="email"
        inputType="email"
        :error="errors && errors.email ? errors.email[0] : ''"
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Password"
        v-model:input="password"
        inputType="password"
        :error="errors && errors.password ? errors.password[0] : ''"
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Confirm Password"
        v-model:input="confirmPassword"
        inputType="password"
        :error="errors && errors.passwordConfirmation ? errors.passwordConfirmation[0] : ''"
      />
    </div>

    <div class="px-6 text-[12px] text-gray-600">Forgot Password ?</div>

    <div class="px-6 pb-2 mt-6">
      <button 
        :disabled="(!name || !email || !password || !confirmPassword)" 
        @click="register" 
        :class="(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'" 
        class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// IMPORT '$generalStore' FROM useNuxtApp(ALIASED INSIDE plugins/store)
  const { $userStore, $generalStore } = useNuxtApp()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errors = ref('')

  const register = async () => {
    console.log('register function', name.value, email.value, password.value, confirmPassword.value);

    errors.value = null

    try {
      await $userStore.getTokens()
      await $userStore.register(name.value, email.value, password.value, confirmPassword.value)
      await $userStore.getUser()

      $generalStore.isLoginOpen = false
    } catch (error) {
      console.log(error);
      errors.value = error.response.data.errors
    }
}
</script>