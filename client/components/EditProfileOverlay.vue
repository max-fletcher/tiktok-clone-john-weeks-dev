<template>
  <div
    id="EditProfileOverlay"
    class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
  >
    <div 
      :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
      class="relative bg-white w-full max-w-[700px] sm:h-[580px] h-[655px] mx-3 p-4 rounded-lg mb-10"
    >
      <div class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
        <div class="text-[22px] font-medium">
          Edit Profile
        </div>
        <button
          @click="$generalStore.isEditProfileOpen = false"
        >
          <Icon name="mdi:close" size="25" />
        </button>
      </div>

      <div :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'" class="h-[calc(500px-200px)]">
        <div v-if="!uploadedImage">
          <div 
            id="ProfilePhotoSection" 
            class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
          >
            <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
              Profile Photo
            </div>
            <div class="flex items-center justify-center sm:-mt-6">
              <!-- ANOTHER CHEAP TRICK ON HOW TO MAKE AN IMAGE CLICKABLE THAT OPENS AN UPLOAD WINDOW. BASICALLY, THE INPUT IS HIDDEN BUT THE LABEL IS for="image" 
                    WHICH IS THE ID OF THE INPUT TAG SO IT OPENS UP WHEN THE LABEL IS CLICKED -->
              <label for="image" class="relative cursor-pointer">
                <img 
                  :src="userImage" 
                  width="95" 
                  class="rounded-full" 
                />
                <div class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]">
                    <Icon name="ph:pencil-simple-line-bold" size="17" class="-mt-1 ml-0.5"/>
                </div>
              </label>
              <input 
                class="hidden"
                type="file"
                id="image"
                @input="getUploadedImage"
                accept="image/png, image.jpeg, image/jpg"
              />
            </div>
          </div>

          <div 
            id="userNameSection" 
            class="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full"
          >
            <div class="font-semibold text-[15px] sm:mb-0 mb-2.5 text-gray-700 sm:w-[160px] sm:text-left text-center">
              Username
            </div>
            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <!-- CUSTOM REUSABLE INPUT COMPONENT. -->
                <TextInput 
                  placeholder="Username"
                  v-model:input="userName"
                  inputType="text"
                  max="30"
                  error=""
                />

                <div class="text-[11px] text-gray-500 mt-4">
                  Usernames can only contain letters, numbers, underscores, and periods. 
                  Changing your username will also change your profile link.
                </div>
              </div>
            </div>
          </div>

          <div 
            id="BioSection" 
            class="flex flex-col sm:h-[120px] px-1.5 py-2 w-full"
          >
            <div class="font-semibold text-[15px] sm:mb-0 mb-2.5 text-gray-700 sm:w-[160px] sm:text-left text-center">
              Bio
            </div>
            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <textarea 
                  v-model="userBio" 
                  maxlength="80" 
                  cols="40" 
                  rows="4" 
                  class="resize-none w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                ></textarea>

                <div v-if="userBio" class="text-[11px] text-gray-500">{{ userBio.length }}/80</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="w-full h-[430px]">
          <Cropper :src="uploadedImage" class="h-[430px]" ref="cropper" :stencil-component="CircleStencil" />
        </div>

        <div class="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full">
          <div 
            v-if="!uploadedImage" 
            id="UpdateInfoButtons" 
            class="flex items-center justify-end"
          >
            <button 
              @click="$generalStore.isEditProfileOpen = false"
              class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
            >
              <span class="px-2 font-medium text-[15px]">Cancel</span>
            </button>

            <button 
                :disabled="!isUpdated"
                @click="updateUserInfo()"
                :class="!isUpdated ? 'bg-gray-200' : 'bg-[#F02C56]'"
                class="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
            >
                <span class="mx-4 font-medium text-[15px]">Apply</span>
            </button>
          </div>

          <div 
            v-else 
            id="CropperButtons" 
            class="flex items-center justify-end"
          >
            <button 
              @click="uploadedImage = null"
              class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
            >
              <span class="px-2 font-medium text-[15px]">Cancel</span>
            </button>

            <button 
                @click="cropAndUpdateImage()"
                class="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
            >
                <span class="mx-4 font-medium text-[15px]">Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ANYTHING WHICH IS NOT IN COMPONENTS/PAGES(etc.) FOLDER WILL NOT BE IMPORTED SO YOU NEED TO IMPORT PACKAGE MANUALLY BOTH IN VUE AND JS FILES
  import { Cropper, CircleStencil } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css';

  // 'storeToRefs' CONVERTS STORE STATES AND GETTERS TO REFS SO IT CAN BE DESTRUCTURED WHILE MAINTAINING REACTIVITY, AND IF NEED BE, PASSED AS PROP TO ANY COMPONENT. 
  // ACTIONS CAN BE DESTRUCTURED DIRECTLY WITHOUT USING 'storeToRefs'.
  import { storeToRefs } from 'pinia'

  const { $userStore, $generalStore, $profileStore } = useNuxtApp()
  const { name, bio, image } = storeToRefs($userStore)
  const route = useRoute()

  // MAKING A COPY OF THE REFS SO THAT WE CAN FREELY EDIT THESE VALUES IN INPUT V-MODEL WITHOUT EDITING THE ACTUAL VALUES IN STORE STATE(SINCE IT IS USED TO POPULATE THE MODAL AND PAGE COMPONENTS
  onMounted(() => {
    userName.value = name.value
    userBio.value = bio.value
    userImage.value = image.value
  })

  let file = ref(null)
  let cropper = ref(null)
  let uploadedImage = ref(null)
  let userImage = ref(null)
  let userName = ref(null)
  let userBio = ref(null)
  let isUpdated = ref(false)

  const getUploadedImage = (e) => {
    console.log('uploaded image');

    file.value = e.target.files[0] // GRAB THE FILE FROM THE INPUT FIELD
    uploadedImage.value = URL.createObjectURL(file.value) //CREATE A URL FROM THE FILE
  }

  const cropAndUpdateImage = async () => {
      const { coordinates } = cropper.value.getResult()

      let data = new FormData()

      data.append('image', file.value || '')
      data.append('width', coordinates.width || '')
      data.append('height', coordinates.height || '')
      data.append('top', coordinates.top || '')
      data.append('left', coordinates.left || '')

    try {
        await $userStore.updateUserImage(data)
        await $userStore.getUser()
        await $profileStore.getProfile(route.params.id)

        $generalStore.updateSideMenuImage($generalStore.suggested, $userStore)
        $generalStore.updateSideMenuImage($generalStore.following, $userStore)

        userImage.value = image.value
        uploadedImage.value = null
    } catch (error) {
        console.log(error)
    }
}

  const updateUserInfo = async () => {
    try {
      await $userStore.updateUser(userName.value, userBio.value)
      await $userStore.getUser()
      await $profileStore.getProfile(route.params.id)

      userName.value = name.value
      userBio.value = bio.value

      setTimeout(() => {
        $generalStore.isEditProfileOpen = false
      }, 100)
    } catch (error) {
      console.log(error);
    }
  }

  // VALIDATION FOR THE 2 TEXT FIELDS. IF THE COPIED VALUE MATCHES THE 
  watch(() => userName.value, () => {
    if(!userName.value || userName.value === name.value)
      isUpdated.value = false
    else
      isUpdated.value = true
  })

  watch(() => userBio.value, () => {
    if(!userName.value || userBio.value.length < 1)
      isUpdated.value = false
    else
      isUpdated.value = true
  })
</script>