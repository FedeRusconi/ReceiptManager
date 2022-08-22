<script lang="ts" setup>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// Props
const props = defineProps({
  show: Boolean,
  persistent: Boolean,
  hideHeader: Boolean,
  noBackground: Boolean,
  dark: Boolean,
  size: String,
});

// Emits
const emit = defineEmits(["close"]);

/**
 * Emit event to close the dialog
 */
function closeModal() {
  if (!props.persistent) {
    emit("close");
  }
}

/**
 * Get size classes
 */
function getSize() {
  switch (props.size) {
    case 'full':
      return 'max-w-full';
    case 'xl':
      return 'max-w-5xl';
    case 'lg':
      return 'max-w-3xl';
    case 'md':
      return 'max-w-lg';
    case 'sm':
      return 'max-w-sm';
    default:
      return 'max-w-fit';
  }
}


</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="closeModal"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="
            fixed 
            inset-0 
            bg-opacity-75 
            transition-opacity
          "
          :class="{'bg-slate-500': !noBackground}"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="
            relative 
            w-full
            inline-block 
            align-bottom  
            rounded-lg 
            text-left
            shadow-xl 
            transform 
            transition-all 
            sm:my-8 
            sm:align-middle 
            divide-y divide-gray-200
          "
          :class="(dark ? 'bg-primary text-white ' : 'bg-white ') + getSize()"
          >
            <DialogTitle v-if="!hideHeader" as="h3" class="text-lg leading-6 font-medium text-gray-900 w-full p-6">
              <slot name="title"></slot>
            </DialogTitle>
            <div class="p-6">
              <slot></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
