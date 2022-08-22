<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';
import { useSlots, ref, watch } from 'vue';
import { CogIcon } from '@heroicons/vue/outline';
import Card from '../Card.vue';
import Button from '../Button.vue';

// Template slots
const slots  = useSlots();

// Props
const props = defineProps<{
  name: string,
  placeholder: string,
  options: any[],
  optionValue: string,
  optionLabel: string,
  modelValue: any[],
  loading?: Boolean,
  allowNewOption?: Boolean
}>()

// Emits
const emit = defineEmits(['update:modelValue']);

// Metadata
const focused = ref(false);
const inputValue = ref('');
const filteredOptions = ref(props.options);
const selectedOptions = ref<any[]>([]);

// Options might be async, wait for loading to be finished
watch(props, (change) => {
  if(change.loading === false) {
    filteredOptions.value = props.options
  };
});

/**
 * Filter options while user is typing
 */
function filterOptions() {
  filteredOptions.value = props.options.filter(i => {
    if(inputValue.value == '') return true;
    return i[props.optionLabel].toLowerCase().includes(inputValue.value.toLowerCase());
  });
}

/**
 * Item has been clicked ad/remove it from list and emit value
 * @param option The option that has been clicked
 */
function itemClicked(option: any) {
  const index = selectedOptions.value.findIndex(o => o[props.optionValue] === option[props.optionValue]);
  // De-select
  if (index > -1) {
    selectedOptions.value.splice(index, 1);
  // Select
  } else {
    selectedOptions.value.push(option)
  }
  emit('update:modelValue', selectedOptions.value);
}

/**
 * Add a new option
 */
function newOption() {
  selectedOptions.value.push({
    [props.optionValue]: inputValue.value,
    [props.optionLabel]: inputValue.value
  })
  emit('update:modelValue', selectedOptions.value);
}

</script>

<template>
  <div class="relative">
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
          v-model="inputValue"
          @focus="focused = true"
          @blur="focused = false"
          @input="filterOptions"
          :name="name || ''"
          type="text"
          :placeholder="placeholder"
          class="w-full border-0 focus:ring-0 rounded-md"
          :disabled="loading"
        />
      </div>
      <div 
        v-if="slots.append"
        class="flex justify-center items-center p-2 text-gray-500"
      >
        <slot name="append"></slot>
      </div>
      <div 
        v-if="loading"
        class="flex justify-center items-center p-2 text-gray-500"
      >
        <slot name="loading">
          <CogIcon class="h-6 w-6 animate-spin-2s mx-auto" />
        </slot>
      </div>  
    </div>
    <ErrorMessage :name="name || ''" class="text-sm text-red-500" />
    <Card class="absolute top-8 left-0 right-0 z-40 rounded-b" v-if="focused">
      <Button
        flat 
        color="primary" 
        class="w-full rounded-none" 
        :class="{'rounded-b': index === options.length - 1}" 
        v-for="(option, index) of filteredOptions" 
        @mousedown="itemClicked(option)"
      >
        {{ option[optionLabel] }}
      </Button>
      <Button
        flat
        class="w-full rounded-none rounded-b" 
        v-if="allowNewOption && inputValue.length > 0" 
        @mousedown="newOption()"
      >
        Enter tag for
        {{ inputValue }}
      </Button>
    </Card>
  </div>
</template>