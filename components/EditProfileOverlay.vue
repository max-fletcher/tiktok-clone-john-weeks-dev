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
                  src="https://picsum.photos/id/8/300/320" 
                  width="95" 
                  class="rounded-full" 
                />
                <div class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]">
                  <Icon name="ph:pencil-simple-line-bold" size="17" class="-mt-1 ml-0.5" />
                </div>
              </label>
              <input 
                class="hidden"
                type="file"
                id="image"
                @input="getUploadedFile"
                accept="image/png, image.jpeg, image/jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $generalStore } = useNuxtApp()

  let uploadedImage = ref(null)

  const getUploadedFile = () => {
    console.log('file uploaded');
  }
</script>