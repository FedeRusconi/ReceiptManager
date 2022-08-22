<script lang="ts" setup>
import Card from './common/Card.vue';
import CardSection from './common/CardSection.vue';
import { format } from 'date-fns';
import Tag from './common/Tag.vue';
import { IReceipt } from '../@types/IReceipt';

defineProps<{item: IReceipt}>();

</script>

<template>
  <Card clickable rounded :link-to="{name: 'ReceiptDetails', params: {receiptId: item._id}}">
    <CardSection padding="p-0">
      <img
        v-if="item.attachment"
        class="w-full h-60 object-cover" 
        :src="item.attachment.filePath" 
        :alt="item.attachment.originalName"
      />
      <img
        v-else
        class="w-full h-60 object-cover" 
        src="/src/assets/image-placeholder.svg" 
        alt="No image uploaded"
      />
    </CardSection>
    <CardSection>
      <h1 class="text-xl font-bold">{{ item.title }}</h1>
      <div class="flex justify-between">
        <h3 class="text-md font-bold">
          ${{ item.amount.toFixed(2) }}
        </h3>
        <p>{{ format(new Date(item.date), 'd MMMM yy') }}</p>
      </div>
      
    </CardSection>
    <CardSection>
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="tag of item.tags.slice(0, 3)"
          :label="tag.name"
          round
        />
        <Tag
          v-if="item.tags.length > 3"
          :label="`${item.tags.length - 3} More`"
          round
        />
      </div>
    </CardSection>
  </Card>
</template>