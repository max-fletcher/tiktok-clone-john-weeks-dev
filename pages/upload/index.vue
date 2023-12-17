<template>
    <!-- ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT -->
    <!-- <UploadLayout> -->
    <div class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">

      <UploadError :errorType="errorType" />

      <div>
        <div class="text-[23px] font-semibold">Upload video</div>
        <div class="text-gray-400 mt-1">Post a video to your account</div>
      </div>

      <div class="mt-8 md:flex gap-6">
      <!-- Turns out in HTML, if the Input tag 'id' and label 'for' matches, then clicking the label is the same as clicking the input tag. This is why clicking the box opens the file-upload here. -->
      <!-- @dragover.prevent="$event => " will prevent anything from happening when dragged over. -->
        <label 
          v-if="!fileDisplay"
          for="fileInput"
          @drop.prevent="onDrop"
          @dragover.prevent=""
          class="
            md:mx-0
            mx-auto
            mt-4
            mb-6
            flex
            flex-col
            items-center
            justify-center
            w-full
            max-w-[260px]
            h-[470px]
            text-center
            p-3
            border-2
            border-dashed
            border-gray-300
            rounded-lg
            hover:bg-gray-100
            cursor-pointer
          "
        >
          <Icon name="majesticons:cloud-upload" size="40" color="#b3b3b1" />
          <div class="mt-4 text-[17px]">Select a video to upload</div>
          <div class="mt-1.5 text-gray-500 text-[13px]">or dear and drop a file</div>
          <div class="mt-12 text-gray-400 text-sm">MP4</div>
          <div class="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</div>
          <div class="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>
          <div class="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm">Select File</div>
          <input @input="onChange" ref="file" type="file" id="fileInput" hidden accept=".mp4" />
        </label>

        <div
          v-else
          class="
            md:mx-0
            mx-auto
            mt-4
            md:mb-12
            mb-16
            flex
            items-center
            justify-center
            w-full
            max-w-[260px]
            h-[540px]
            p-3
            rounded-2xl
            cursor-pointer
            relative
            border"
        >
          <div class="bg-black h-full w-full" />
          <img src="~/assets/images/mobile-case.png" class="absolute z-20 pointer-events-none" />
          <img src="~/assets/images/tiktok-logo-white.png" width="90" class="absolute right-4 bottom-6 z-20" />
          <video
            autoplay
            loop
            muted
            class="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
            :src="fileDisplay"
          />

          <div class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
            <div class="flex items-center truncate">
              <Icon name="clarity:success-standard-line" size="16" class="min-2-[16px]" />
              <!-- THE 'truncate' AND 'text-ellipse' HERE IS TO TRUNCATE LONG FILE NAMES -->
              <div class="text-[11px] pl-1 truncate text-ellipse">{{ fileData.name }}</div>
            </div>
            <button @click="clearVideo" class="text-[11px] ml-2 font-semibold">Change</button>
          </div>
        </div>

        <div class="mt-4 mb-6">
          <div class="flex bg- py-4 px-6">
            <div>
              <div>
                <Icon name="mdi:box-cutter-off" size="20" class="mr-4" />
              </div>
              <div>
                <div class="text-semibold text-[15px] mb-1.5">Divide videos and edit</div>
                <div class="text-semibold text- text-gray-400">
                  You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos onto portrait videos
                </div>
              </div>
            </div>
            <div class="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                <button class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                  Edit
                </button>
              </div>
          </div>

          <div class="mt-5">
            <div class="flex items-center justify-between">
              <div class="mb-1 font-semibold text-[15px]">Caption</div>
              <div class="text-gray-400 text-[12px]">{{ caption.length }}/150</div>
            </div>
            <input v-model="caption" maxlength="150" type="text" class="w-full border p-2.5 rounded-md focus:outline-none" />
          </div>
          <div class="flex gap-3">
            <button @click="discard" class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm">
              Discard
            </button>
            <button class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- </UploadLayout> -->
</template>

<script setup lang="ts">
  // import UploadLayout from '~/layouts/UploadLayout.vue'; // ANOTHER WAY TO DEFINE LAYOUT WITH IMPORT

  definePageMeta({
    // NOTICE THAT THE LAYOUT COMPONENT IS NAMED MainLayout BUT HERE WE ARE CALLING IT main-layout. THIS IS BECAUSE WE CAN'T USE UNDERSCORES AND CAPITALS HERE AND ANY CAMELCASE IS PARSED AS 
    // KEBAB-CASE BY NUXT FOR DEFINE-COMPOSABLES
    layout: 'upload-layout',
  })

  let file = ref(null) // used to store file
  let fileDisplay = ref(null) // used to store the file url(made from blob)
  let errorType = ref(null) // used to display error type if any
  let caption = ref('') // v-model with caption textbox
  let fileData = ref(null) // used to store file
  let errors = ref(null) // used to display errors if any
  let isUploading = ref(null) // used to show if upload is in progress or not

  // IT IS IMPERATIVE THAT YOU 
  watch(() => caption.value, (caption) => {
    if(caption.length >= 150){
      errorType.value = 'caption'
      return
    }
    errorType.value = null
  })

  // SINCE THE 'file' VARIABLE IS USED AS A ref ON THE FILE 'Input' TAG, 'file' WILL ALWAYS CONTAIN A FILE ON EITHER DRAG AND DROP(i.e 'onChange') OR SELECTING A FILE FROM WINDOW(i.e 'onDrop')

  // FOR SELECTING THE FILE FROM WINDOW
  const onChange = (e) => {
    // converts the file into a blob format(inside browser memory) and makes a URL out of the image that can be used as a display in a component/HTML
    fileDisplay.value = URL.createObjectURL(file.value.files[0])
    // console.log(toRaw(fileDisplay.value), fileDisplay, fileDisplay, 'fileDisplay');

    fileData.value = file.value.files[0]
  }

  // FOR DRAGGING AND DROPPING THE FILE
  const onDrop = (e) => {
    console.log('onDrop')
    errorType.value = '' // clear error
    file.value = e.dataTransfer.files[0] // store the file in 'file' variable on dropping
    fileData.value = e.dataTransfer.files[0] // store the file in 'fileData' variable on dropping
    // console.log(toRaw(file.value));

    let extension = file.value.name.substring(file.value.name.lastIndexOf('.') + 1)
    // console.log(extension);

    if(extension !== 'mp4'){
      errorType.value = 'file'
      return  // early return. Return nothing i.e exit function
    }

    // converts the file into a blob format(inside browser memory) and makes a URL out of the image that can be used as a display in a component/HTML
    fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0])
    // console.log(toRaw(fileDisplay.value), fileDisplay, fileDisplay, 'fileDisplay');
  }

  // CLEARS ALL FILE RELATED DATA AND CAPTION
  const discard = () => {
    file.value = null
    fileDisplay.value = null
    fileData.value = null
    caption.value = ''
  }

  // SAME AS 'discard' BUT DOESN'T CLEAR CAPTION
  const clearVideo = () => {
    file.value = null
    fileDisplay.value = null
    fileData.value = null
  }
</script>
