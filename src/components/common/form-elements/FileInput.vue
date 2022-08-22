<script lang="ts" setup>
import { ref } from 'vue';
import { UploadIcon, XIcon } from '@heroicons/vue/outline';

const emit = defineEmits(['fileUploaded']);

// Reference of the input element
const fileInput = ref();
// Store base64 file src to display thumbnail
const fileSrc = ref();
// Store any errors
const uploadError = ref();

// Display image preview on file upload
const reader = new FileReader();
reader.onload = (e) => {
  fileSrc.value = e.target?.result;
  uploadError.value = undefined;
};

/**
 * New file has been added.  
 * Show preview and emit file
 */
function fileAdded(event: any) {
  const file = event.target.files[0];
  if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
    uploadError.value = 'Sorry! We only support JPG or PNG for now.';
    return;
  }
  // Emit file
  emit('fileUploaded', file);
  reader.readAsDataURL(file);
}

/**
 * File has been removed
 */
function fileRemoved() {
  fileSrc.value = undefined;
  fileInput.value.value = '';
  emit('fileUploaded', undefined);
}

</script>

<template>
  <div>
    <section class="flex items-start gap-5">
      <label class="
        flex
        transition-all
        rounded 
        drop-shadow-sm
        bg-primary 
        hover:bg-slate-700 
        border 
        border-primary 
        text-white 
        cursor-pointer
        disabled:bg-slate-200 
        disabled:text-slate-900 
        disabled:border-slate-200 
      ">
        <input ref="fileInput" type="file" @change="fileAdded" class="hidden" />
        <span class="flex gap-2 px-3 py-1">
          <UploadIcon class="h-5 w-5" />
          Click to Upload
        </span>
      </label>
      <div class="flex gap-2 items-start" v-if="fileSrc">
        <img :src="fileSrc" height="50" width="50" />
        <button @click="fileRemoved" class="rounded drop-shadow-sm bg-red-500 text-white">
          <XIcon class="h-3 w-3" />
        </button>
      </div>
    </section>
    
    
    <span class="text-sm text-red-500" v-if="uploadError">
      {{ uploadError }}
    </span>
  </div>
</template>
