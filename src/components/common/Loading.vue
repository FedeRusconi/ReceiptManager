<script lang="ts" setup>
import { CogIcon } from '@heroicons/vue/outline';
import { useLoaderStore } from '../../store/globalLoader';
import CustomDialog from './CustomDialog.vue';

defineProps({
  noBackground: Boolean,
  dark: Boolean,
})

const loader = useLoaderStore();

</script>

<template>
  <CustomDialog :show="loader.isOpen" persistent hide-header :no-background="noBackground" :dark="dark">
    <div class="text-center">
      <CogIcon class="h-20 w-20 animate-spin-2s mx-auto"  />
      <h2 class="text-xl focus:outline-none" tabindex="1">
        {{ loader.getText }}
      </h2>
    </div>
  </CustomDialog>
</template>