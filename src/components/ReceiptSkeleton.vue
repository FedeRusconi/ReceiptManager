<script lang="ts" setup>
import Card from './common/Card.vue';
import CardSection from './common/CardSection.vue';
import Button from './common/Button.vue';
import { DocumentAddIcon } from '@heroicons/vue/outline';

defineProps({
  addNew: Boolean,
  pulse: Boolean
})

const emit = defineEmits(['addNewClicked']);

</script>

<template>
  <Card rounded class="relative">
    <div v-if="addNew" class="absolute rounded w-full h-full flex justify-center items-center">
      <Button color="primary" @click="emit('addNewClicked')">
        <DocumentAddIcon class="h-5 w-5 inline" />
        New Receipt
      </Button>
    </div>
    <CardSection padding="p-0" :class="{'animate-pulse': pulse}">
      <div class="w-full h-60 bg-slate-200"></div>
    </CardSection>
    <CardSection :class="{'animate-pulse': pulse}">
      <div class="w-1/2 h-7 bg-slate-200 rounded mb-2"></div>
      <div class="w-1/3 h-5 bg-slate-200"></div>
    </CardSection>
    <CardSection :class="{'animate-pulse': pulse}">
      <div class="flex flex-wrap gap-2">
        <div class="w-28 h-7 bg-slate-200 rounded-full"></div>
        <div class="w-28 h-7 bg-slate-200 rounded-full"></div>
      </div>
    </CardSection>
  </Card>
</template>