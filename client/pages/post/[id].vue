<template>
  <div id="PostPage" class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto">
    <div 
      v-if="$generalStore.selectedPost"
      class="lg:w-[calc(100%-540px)] h-full relative"
    >
      <NuxtLink 
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800" 
        :to="$generalStore.isBackUrl"
      >
        <Icon name="material-symbols:close" color="#FFFFFF" size="27" />
      </NuxtLink>

      <!-- "v-if" WILL SHOW ONLY WHEN THERE ARE MULTIPLE POSTS I.E GREATER THAN 1 -->
      <div v-if="$generalStore.ids.length > 1">
        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsUp"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-up" color="$FFFFFF" size="30" />
        </button>

        <button
          :disabled="!isLoaded"
          @click="loopThroughPostsDown"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <Icon name="mdi:chevron-down" color="$FFFFFF" size="30" />
        </button>
      </div>

      <img
        width="45"
        class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        src="~/assets/images/tiktok-logo-small.png"
      />

      <!-- THIS SERVES AS A STATIC BLURRED BACKGROUND AND NOTHING MORE -->
      <video
        v-if="$generalStore.selectedPost.video"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        :src="$generalStore.selectedPost.video"
      />

      <div 
        v-if="!isLoaded" 
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon class="animate-spin ml-1" name="mingcute:loading-line" size="100" color="#FFFFFF" />
      </div>
      <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          v-if="$generalStore.selectedPost.video"
          ref="video"
          loop
          muted
          class="h-screen mx-auto"
          :src="$generalStore.selectedPost.video"
        />
      </div>
    </div>

    <div 
      v-if="$generalStore.selectedPost"
      id="InfoSection"
      class="lg:max-w-[550px] relative w-full h-full bg-white"
    >
      <div class="py-7" />

      <div class="flex items-center justify-between px-8">
        <div class="flex items-center">
          <!-- NOTICE THE BACKTICK INSIDE THE DOUBLE QUOTE. THIS IS HOW YOU HANDLE BACKTICKS INSIDE BINDING PROPERTIES INSIDE VUE -->
          <NuxtLink :to="`/profile/${$generalStore.selectedPost.user.id}`">
            <img 
              class="rounded-full lg:mx-0 mx-auto"
              width="40"
              :src="$generalStore.selectedPost.user.image"
            />
          </NuxtLink>
          <div class="ml-3 pt-0.5">
            <div class="text-[17px] font-semibold">
              {{ $generalStore.allLowerCaseNoCaps($generalStore.selectedPost.user.name) }}
            </div>
            <div class="text-[13px] -mt-5 font-light">
              {{ $generalStore.selectedPost.user.name }}
              <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
              <span class="font-medium">{{ $generalStore.selectedPost.created_at }}</span>
            </div>
          </div>
        </div>

        <!-- "v-if" CAUSES THIS DELETE BUTTON TO ONLY SHOW IF THE POST USER ID MATCHES LOGGED IN USER ID, I.E THIS POST BELONGS TO THE LOGGED IN USER -->
        <Icon 
          v-if="$userStore.id === $generalStore.selectedPost.user.id"
          @click="deletePost()"
          name="material-symbols:delete-outline-sharp"
          size="25"
          class="cursor-pointer"
        />
      </div>

      <div class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.text }}</div>

      <div class="px-8 mt-4 text-sm font-bold">
        <Icon name="mdi:music" size="17" />
        original sound - {{ $generalStore.allLowerCaseNoCaps($generalStore.selectedPost.user.name) }}
      </div>

      <div class="flex items-center px-8 mt-8">
        <div class="pb-4 text-center flex items-center">
          <button 
            @click="isLiked ? unlikePost() : likePost()"
            class="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            <Icon 
              name="mdi:heart" 
              size="25" 
              :color="isLiked ? '#F02C56' : ''"
            />
          </button>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {{ $generalStore.selectedPost.likes.length }}
          </span>
        </div>

        <div class="pb-4 text-center flex items-center">
          <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
            <Icon name="bx:bxs-message-rounded-dots" size="25" />
          </div>
          <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            1,121
          </span>
        </div>
      </div>

      <div id="Comments" class="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto">
        <div class="pt-2" />

        <div
          v-if="$generalStore.selectedPost.comments.length < 1"
          class="text-center mt-6 text-xl text-gray-500"
        >
          No comments...
        </div>

        <div
          v-else
          v-for="(comment, index) in $generalStore.selectedPost.comments"
          :key="index"
          class="flex items-center justify-center px-8 mt-4"
        >
          <div class="flex items-center relative w-full">
            <NuxtLink :to="`/profile/${comment.user.id}`">
              <img
                :src="comment.user.image"
                width="40"
                class="absolute top-0 rounded-full lg:mx-0 mx-auto"
              />
            </NuxtLink>
            <div class="ml-14 pt-0.5 w-full">
              <div class="text-[18px] font-semibold flex items-center justify-between">
                {{ comment.user.name }}
                <!-- ONLY IF LOGGED IN USER IS THE ONE WHO MADE THIS COMMENT, SHOW THIS BUTTON -->
                <Icon 
                  v-if="comment.user.id === $userStore.id"
                  @click="deleteComment($generalStore.selectedPost, comment.id)"
                  name="material-symbols:delete-outline-sharp"
                  size="25" 
                  class="cursor-pointer"
                />
              </div>
              <div class="text-[15px] font-light">
                {{ comment.text }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-28" />
      </div>
      <!-- v-if="$userStore.id" MEANS IF USER IS LOGGED IN -->
      <div 
        v-if="$userStore.id" 
        id="CreateComment" 
        class="absolute flex items-center justify-center bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div :class="inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'" class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg-max-w-[420px]">
          <input 
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg" 
            type="text" 
            placeholder="Add comment..."
          />
        </div>
        <button 
          :disabled="!comment" 
          @click="addComment" 
          :class="comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'" 
          class="font-semibold text-sm ml-5 pr-1"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $generalStore, $userStore, $profileStore } = useNuxtApp()

  const route = useRoute()
  const router = useRouter()

  let video = ref(null)
  let isLoaded = ref(false)
  let comment = ref(null)
  let inputFocused = ref(false)

  onMounted(async () => {
    $generalStore.selectedPost = null
    try {
      await $generalStore.getPostById(route.params.id)
    } catch (error) {
      if(error && error.response.status === 400){
        router.push('/')
      }
    }

    // isLoaded.value = true
    // video.value.play()

    // IF THE VIDEO VARIABLE IS NOT EMPTY, APPEND AN EVENT LISTENER TO THE VIDEO VARIABLE 'video'. THE TERM 'loadeddata' IS A CASE-SENSITIVE RESERVED
    // KEYWORD THAT TELLS THE EVENT-LISTENER TO DO SOMETHING IN RESPONSE TO WHEN DATA IS FINISHED LOADING FOR, SAY, A VIDEO TAG.
    // if(video.value) {
      // console.log('Entered if');
      video.value.addEventListener('loadeddata', (e) => {
        console.log('Entered event listener', e, e.target);
        if(e.target){
          console.log('Entered 2nd if');
          // SET 'isLoaded' VALUE TO true AFTER 200ms OF WHEN DATA IS FINISHED LOADING(I.E FINISHED LOADING IN VIDEO TAG)
          setTimeout(() => {
            isLoaded.value = true
          }, 500)
        }
      })
    // }
  })

  // WILL PAUSE THE VIDEO, REWIND THE VIDEO BACK TO TIME=0 AND SET VIDEO SRC TO EMPTY STRING(I.E STOP THE VIDEO)
  onBeforeUnmount(() => {
    video.value.pause()
    video.value.currentTime = 0
    video.value.src = ''
  })

  // IT IS IMPERATIVE THAT YOU PASS IN 'isLoaded' AS AN ARGUMENT TO THE FUNCTION WHICH IS USED AS THE 2nd PARAM OF THE WATCH FUNCTION. ELSE THIS WON'T WORK BECAUSE THE IF CONDITION WILL FAIL EVERY TIME.
  watch(() => isLoaded.value, () => {
    if(isLoaded.value){
      setTimeout(() => {
        console.log('video inside setTimeOut', video.value);
        video.value.play()
      }, 500)
    }
  })

  const loopThroughPostsDown = () => {
    setTimeout(() => {
      let idArrayReversed = $generalStore.ids.reverse()
      let isBreak = false

      for (let i = 0; i < idArrayReversed.length; i++) {
        const id = idArrayReversed[i];
        if(id < route.params.id){
          router.push(`/post/${id}`)
          isBreak = true
          return
        }
      }

      // THIS IS TO ENSURE THAT WE LOOP TO THE BEGINNING WHEN WE REACH THE END AND i IS STILL INCREMENTED
      if(!isBreak){
        router.push(`/post/${idArrayReversed[0]}`)
      }
    }, 300)
  }

  const loopThroughPostsUp = () => {
    setTimeout(() => {
      let isBreak = false

      for (let i = 0; i < $generalStore.ids.length; i++) {
        const id = $generalStore.ids[i];
        if(id > route.params.id){
          router.push(`/post/${id}`)
          isBreak = true
          return
        }
      }

      // THIS IS TO ENSURE THAT WE LOOP TO THE BEGINNING WHEN WE REACH THE END AND i IS STILL INCREMENTED
      if(!isBreak){
        router.push(`/post/${$generalStore.ids[0]}`)
      }
    }, 300)
  }

  // A COMPUTED PROPERTY SO THAT THE COMPONENT IS NOT RE-RENDERED WITH EVERY CHANGE THAT HAPPENS. IN THIS SCENARIO, IF "res" CHANGES, 
  // THEN THE VALUE OF "isLiked"(BOOLEAN) CHANGES AND TRIGGERS RE-RENDER. OTHERWISE, IF WE USED A FUNCTION, THIS WILL 
  // RE-RENDER WITH EVERY PAGE LOAD/PARENT OR SIBLING RE-RENDER BECAUSE THE "find" FUNCTION WILL BE RAN EVERYTIME.
  const isLiked = computed(() => {
    // FETCH LIKE OBJECT NESTED INSIDE POST, IF IT EXISTS.
    let res = $generalStore.selectedPost.likes.find((like) => like.user_id === $userStore.id)
    // IS 
    if(res){
      return true
    }
    return false
  })

  const likePost = async () => {
    try {
      await $userStore.likePost($generalStore.selectedPost, true)
    } catch (error) {
      console.log(error);
    }
  }

  const unlikePost = async () => {
    try {
      await $userStore.unlikePost($generalStore.selectedPost, true)
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async () => {
    let res = confirm('Are you sure you want to delete this post?')
    try {
      if(res){
        await $userStore.deletePost($generalStore.selectedPost)
        await $profileStore.getProfile($userStore.id)
        router.push(`/profile/${$userStore.id}`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addComment = async () => {
    try {
      await $userStore.addComment($generalStore.selectedPost, comment.value)
      comment.value = null // CLEAR COMMENT VARIABLE
      // SCROLLS TO THE TOP OF THE COMMENTS LIST AFTER SUBMIT BECAUSE THE SUBMITTED ONE IS THE LATEST ONE AND WILL APPEAR AT THE TOP
      document.getElementById('Comment')?.scroll({top: 0, behavior:'smooth'})
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteComment = async (post, commentId) => {

    console.log(post, comment);

    let res = confirm('Are you sure you want to delete this comment?')
    try {
      if(res)
      await $userStore.deleteComment(post, commentId)
    } catch (error) {
      console.log(error);
    }
  }

</script>