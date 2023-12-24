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
        error=""
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Email Address"
        v-model:input="email"
        inputType="email"
        error=""
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Password"
        v-model:input="password"
        inputType="password"
        error=""
      />
    </div>

    <div class="px-6 pb-2">
      <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
      <TextInput 
        placeholder="Confirm Password"
        v-model:input="confirmPassword"
        inputType="password"
        error=""
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
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errors = ref('')

  const register = () => {
    console.log('Register Henlo');
  }
</script>