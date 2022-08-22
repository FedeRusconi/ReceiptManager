<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['click'])

const props = defineProps({
  linkTo: Object,
  clickable: Boolean,
  rounded: Boolean,
  shadow: {
    type: String,
    default: 'shadow-md'
  },
  background: {
    type: String,
    default: 'bg-white'
  }
})

/** Define classes */
const classList = computed(() => {
  return [
    { 'cursor-pointer hover:drop-shadow-xl hover:-translate-y-2 focus:drop-shadow-xl focus:-translate-y-2': props.clickable },
    { rounded: props.rounded },
    props.background,
    props.shadow
  ];
})

/**
 * Card has been clicked, emit click event only if card has been marked as clickable
 */
function onClick(event: MouseEvent) {
  if(props.clickable) {
    emit('click', event)
  }
}

</script>

<template>
  <div :class="classList">
    <!-- Link version -->
    <router-link
      v-if="clickable && linkTo"
      class="block transition-all"
      :to="linkTo"
    >
      <slot></slot>
    </router-link>
    <!-- Normal version (can be clickable)-->
    <div 
      v-else
      class="transition-all"
      :tabindex="clickable ? 0 : -1"
      @click="onClick"
      @keyup.enter="onClick"
    >
      <slot></slot>
    </div>
  </div>  
</template>