<template>
  <div
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
  >
    <div 
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <Icon class="animate-spin ml-1" name="mingcute:loading-line" size="100" color="#FFFFFF" />
    </div>

    <div>
      <video
        ref="video"
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        src="/cowe.mp4"
      />
    </div>

    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
      <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        3%
        <Icon class="ml-1" name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps(['post'])

  const route = useRoute()
  const router = useRouter()

  let video = ref(null)
  let isLoaded = ref(false)

  onMounted(() => {
    // IF THE VIDEO VARIABLE IS NOT EMPTY, APPEND AN EVENT LISTENER TO THE VIDEO VARIABLE 'video'. THE TERM 'loadeddata' IS A CASE-SENSITIVE RESERVED KEYWORD THAT TELLS THE
    // EVENT-LISTENER TO DO SOMETHING IN RESPONSE TO WHEN DATA IS FINISHED LOADING FOR, SAY, A VIDEO TAG.
    if(video.value) {
      video.value.addEventListener('loadeddata', (e) => {
        if(e.target){
          // SET 'isLoaded' VALUE TO true AFTER 200ms OF WHEN DATA IS FINISHED LOADING(I.E FINISHED LOADING IN VIDEO TAG)
          setTimeout(() => {
            isLoaded.value = true
          }, 200)
        }
      })
    }
  })

  // WILL PAUSE THE VIDEO, REWIND THE VIDEO BACK TO TIME=0 AND SET VIDEO SRC TO EMPTY STRING(I.E STOP THE VIDEO)
  onBeforeUnmount(() => {
    video.value.pause()
    video.value.currentTime = 0
    video.value.src = ''
  })

  const isHover = (bool) => {
    if(bool){
      video.value.play()
    }
    else{
      video.value.pause()
    }
  }
</script>