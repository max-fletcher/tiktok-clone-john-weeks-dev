<template>
  <div class="w-[100%] relative flex justify-center">
    <div :class="errorType ? 'visible' : 'invisible'" class="absolute top-6 z-1000 mx-auto bg-black text-white bg-opacity-70 px-14 py-3 rounded-sm">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['errorType'])
  const { errorType } = toRefs(props)

  let error = ref('')

  // IT IS IMPERATIVE THAT YOU PASS IN 'errorType' AS AN ARGUMENT TO THE FUNCTION WHICH IS USED AS THE 2nd PARAM OF THE WATCH FUNCTION. ELSE THIS WON'T WORK BECAUSE THE IF CONDITION WILL FAIL EVERY TIME.
  watch(() => errorType.value, () => {
    console.log(errorType);
    
    if(errorType.value == 'caption'){
      error.value = 'Maximum 150 characters.'
    }
    else if(errorType.value == 'bio'){
      error.value = 'Maximum 80 characters.'
    }
    else if(errorType.value == 'file'){
      error.value = 'Unsupported file type. Use mp4 instead.'
    }
    else{
      error.value = ''
    }
  })
</script>