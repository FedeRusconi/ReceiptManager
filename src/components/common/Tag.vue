<script lang="ts" setup>
import { computed } from 'vue';
import { TagIcon } from '@heroicons/vue/solid';
import { XIcon } from '@heroicons/vue/outline';

const props = defineProps({
  label: String,
  rounded: Boolean,
  round: Boolean,
  background: {
    type: String,
    default: 'bg-slate-300'
  },
  text: {
    type: String,
    default: 'text-slate-900'
  },
  removable: Boolean
})

// Emits
const emit = defineEmits(['onRemove'])

/** Define classes */
const classList = computed(() => {
  return [
    { rounded: props.rounded },
    { 'rounded-full': props.round },
    props.background,
    props.text
  ];
})

/**
 * Remove button clicked, emit event
 */
function onRemove() {
  emit('onRemove')
}

</script>

<template>
  <span class="px-2 py-1 drop-shadow-sm" :class="classList">
    <slot name="icon">
      <TagIcon class="h-6 w-6 pr-1 inline" />
    </slot>
    <span class="text-sm">
      {{ label }}
    </span>
    <button class="ml-2" v-if="removable" @click="onRemove()">
      <XIcon class="h-5 w-5 inline rounded-full hover:bg-slate-100" />
    </button>
  </span>
</template>