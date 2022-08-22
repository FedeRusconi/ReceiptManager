<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';
import { useSlots } from 'vue';

// Template slots
const slots  = useSlots();

defineProps({
  name: String,
  type: {
    type: String,
    default: 'text'
  },
  textArea: Boolean,
  placeholder: String,
  step: Number,
  modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue']);

/** Emit value of input */
const emitValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

</script>

<template>
  <div>
    <div
      class="
        flex
        justify-between
        items-start
        rounded-md
        bg-white
        border
        border-gray-300
        shadow-sm
        focus-within:border-indigo-300 
        focus-within:ring 
        focus-within:ring-indigo-200 
        focus-within:ring-opacity-50
      "
    >
      <div 
        v-if="slots.prepend"
        class="flex justify-center items-center p-2 text-gray-500"
      >
        <slot name="prepend"></slot>
      </div>    
      <div class="w-full">
        <Field
          :value="modelValue"
          @input="emitValue"
          :name="name || ''"
          :type="type"
          :placeholder="placeholder"
          :step="step"
          class="w-full border-0 focus:ring-0 rounded-md"
          :as="textArea ? 'textarea' : 'input'"
        />
      </div>
      <div 
        v-if="slots.append"
        class="flex justify-center items-center p-2 text-gray-500"
      >
        <slot name="append"></slot>
      </div>  
    </div>
    <ErrorMessage :name="name || ''" class="text-sm text-red-500" />
  </div>
</template>