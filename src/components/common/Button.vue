<script lang="ts" setup>
import { computed } from 'vue';
import { CogIcon } from '@heroicons/vue/outline';
import { primaryClasses, successClasses, dangerClasses, warningClasses, defaultClasses } from '../../composables/buttonHelpers';

const emit = defineEmits(['click'])

const props = defineProps({
  submit: Boolean,
  reset: Boolean,
  color: String,
  outline: Boolean,
  flat: Boolean,
  loading: Boolean,
  loadingText: String,
  disabled: Boolean,
  dense: Boolean
})

/**
 * Define type of button
 */
const btnType = computed(() => {
  return props.submit ? 'submit' : (props.reset ? 'reset' : 'button') 
})

/** Define classes */
const classList = computed(() => {
  let classList: string;
  switch(props.color) {
    case 'primary':
      classList = primaryClasses(props.outline, props.flat);
      break;
    case 'success':
      classList = successClasses(props.outline, props.flat);
      break;
    case 'danger':
      classList = dangerClasses(props.outline, props.flat);
      break;
    case 'warning':
      classList = warningClasses(props.outline, props.flat);
      break;
    default: 
      classList = defaultClasses(props.outline, props.flat);
      break;
  }
  if (props.dense) {
    classList += 'py-1 px-2';
  } else {
    classList += 'py-2 px-5';
  }
  if(props.disabled) {
    classList += ' opacity-50 cursor-not-allowed'
  }
  return classList;
})

/**
 * Button has been clicked, emit click event
 */
function onClick(event: MouseEvent) {
  emit('click', event)
}

</script>

<template>
  <button 
    @click="onClick"
    :type="btnType"
    :disabled="disabled || loading"
    class="
      transition-all
      rounded 
      drop-shadow-sm
      disabled:cursor-not-allowed
    "
    :class="classList"
  >
    <div v-if="loading">
      <CogIcon class="h-5 w-5 inline animate-spin-1.5s" />
      {{ loadingText }}
    </div>
    <slot v-else></slot>
  </button>
</template>