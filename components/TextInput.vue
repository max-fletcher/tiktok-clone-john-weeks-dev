<template>
  <div>
      <input 
          :id="`input-${placeholder}`"
          :placeholder="placeholder"
          class="
              block
              w-full
              bg-[#F1F1F2]
              text-gray-800
              border
              border-gray-300
              rounded-md
              py-2.5
              px-3
              focus:outline-none
          " 
          :type="inputType"
          v-model="inputComputed"
          autocomplete="off"
          :maxlength="max"
      >
      <!-- <h1>
        Input Computed:
        {{ inputComputed }}
      </h1>
      <h1>
        Input:
        {{ input }}
      </h1> -->
      <span v-if="error" class="text-red-500 text-[14px] font-semibold">
          {{ error }}
      </span>
  </div>
                  
</template>

<script setup>
  const emit = defineEmits(['update:input'])

  const props = defineProps(['input', 'placeholder', 'inputType', 'max', 'autoFocus', 'error'])
  const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props)

  onMounted(() => {
      if (autoFocus.value) {
          document.getElementById(`input-${placeholder.value}`).focus()
      }
  })

  // FOR 2-WAY BINDING COMPONENT PARENT REFS WITH CHILD REFS. PARENT HAS TO USE v-model:[VARIABLE_NAME] I BELIEVE FOR THIS TO WORK.
  const inputComputed = computed({
      get: () => {
        console.log('get', toRaw(input.value));
        return input.value
      },
      set: (val) => {
        console.log('set', val);
        emit('update:input', val)
      }
  })
</script>