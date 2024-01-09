<template>
  <div :id="`PostMain-${post.id}`" class="flex border-b py-6">
    <div @click="isLoggedIn(post.user)" class="cursor-pointer">
      <img class="rounded-full max-h-[60px]" width="60" :src="post.user.image" />
    </div>
    <div class="pl-3 w-full px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button @click="isLoggedIn(post.user)">
          <span class="font-bold hover:underline cursor-pointer">
            {{ $generalStore.allLowerCaseNoCaps(post.user.name) }}
          </span>
          <span class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer">
            {{ post.user.name }}
          </span>
        </button>

        <button class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
          Follow
        </button>
      </div>

      <div class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
        {{ post.text }}
      </div>
      <div class="text-[14px] text-gray-500 pb-0.5">
        #fun #cool #SuperAwesome
      </div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">original sound - AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div 
          @click="displayPost(post)"
          class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
        >
          <video
            v-if="post.video"
            ref="video"
            loop
            muted
            class="rounded-xl object-cover mx-auto h-full"
            :src="post.video"
          />
          <img class="absolute right-2 bottom-14" width="90" src="~/assets/images/tiktok-logo-white.png" />
        </div>
        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button 
                @click="isLiked ? unlikePost(post) : likePost(post)"
                class="rounded-full bg-gray-200 p-2 cursor-pointer"
              >
                <Icon name="mdi:heart" size="25" :color="isLiked ? '#F02C56' : ''" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">{{ post.likes.length }}</span>
            </div>

            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="bx:bxs-message-rounded-dots" size="25" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">34</span>
            </div>

            <div class="pb-4 text-center">
              <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="ri:share-forward-fill" size="25" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $generalStore, $userStore } = useNuxtApp()
  const router = useRouter()
  const props = defineProps(['post'])
  const { post } = toRefs(props)

  let video = ref(null)

  onMounted(() => {
    // CREATE AN IntersectionObserver OBJECT. WHEN THE VIDEO IS ON SCREEN, IntersectionObserver WILL CAUSE THE VIDEO TO PLAY AND VICE VERSA.
    let observer = new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){
        console.log('Element is playing ' + post.value.id)
        video.value.play()
      }
      else{
        console.log('Element is stopped ' + post.value.id)
        video.value.pause()
      }
    }, { threshold: [0.6] })

    // APPEND THE OBSERVER TO THE PARENT ELEMENT
    observer.observe(document.getElementById(`PostMain-${post.value.id}`))
  })

  // TO RESET VIDEO BEFORE COMPONENT IS UNMOUNTED
  onBeforeUnmount(() => {
    video.value.pause()
    video.value.currentTime = 0
    video.value.src = ''
  })

  // A COMPUTED PROPERTY SO THAT THE COMPONENT IS NOT RE-RENDERED WITH EVERY CHANGE THAT HAPPENS. IN THIS SCENARIO, IF "res" CHANGES, 
  // THEN THE VALUE OF "isLiked"(BOOLEAN) CHANGES AND TRIGGERS RE-RENDER. OTHERWISE, IF WE USED A FUNCTION, THIS WILL 
  // RE-RENDER WITH EVERY PAGE LOAD/PARENT OR SIBLING RE-RENDER BECAUSE THE "find" FUNCTION WILL BE RAN EVERYTIME.
  const isLiked = computed(() => {
    // FETCH LIKE OBJECT NESTED INSIDE POST, IF IT EXISTS.
    let res = post.value.likes.find((like) => like.user_id === $userStore.id)
    // IS 
    if(res){
      return true
    }
    return false
  })

  const likePost = async (post) => {
    // IF USER IS NOT LOGGED IN, OPEN THE LOGIN MODAL AND STOP THE REST OF THE FUNCTION EXECUTING(I.E PREMATURE RETURN)
    if(!$userStore.id){
      $generalStore.isLoginOpen = true
      return
    }

    try {
      await $userStore.likePost(post)
    } catch (error) {
      console.log(error);
    }
  }

  const unlikePost = async (post) => {
    // IF USER IS NOT LOGGED IN, OPEN THE LOGIN MODAL AND STOP THE REST OF THE FUNCTION EXECUTING(I.E PREMATURE RETURN)
    if(!$userStore.id){
      $generalStore.isLoginOpen = true
      return
    }

    try {
      await $userStore.unlikePost(post)
    } catch (error) {
      console.log(error);
    }
  }

  const isLoggedIn = (user) => {
    if(!$userStore.id){
      $generalStore.isLoginOpen = true //OPEN LOGIN MODAL IF USER IS NOT LOGGED IN
      return
    }
    setTimeout(() => router.push(`/profile/${user.id}`), 300)
  }

  const displayPost = (post) => {
    if(!$userStore.id){
      $generalStore.isLoginOpen = true //OPEN LOGIN MODAL IF USER IS NOT LOGGED IN
      return
    }

    $generalStore.setBackUrl('/')
    $generalStore.selectedPost = null
    setTimeout(() => router.push(`/post/${post.id}`), 200)
  }
</script>