<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  padding: {
    type: String,
    default: 'p-6'
  }
})

/** Define classes */
const classList = computed(() => {
  return [props.padding]
})

</script>

<template>
  <section :class="classList">
    <slot></slot>
  </section>
</template>