<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { Alert } from '../models/Alert';
import { Receipt } from '../models/Receipt';
import { useLoaderStore } from '../store/globalLoader';
import BasicInfo from '../components/receipt-details/BasicInfo.vue';
import Description from '../components/receipt-details/Description.vue';
import Tags from '../components/receipt-details/Tags.vue';
import ViewImage from '../components/receipt-details/ViewImage.vue';
import { IHttpResponse } from '../@types/IHttpResponse';

// Router
const router = useRouter();
const route = useRoute();

// Store
const loader = useLoaderStore();

// Display loader
loader.open('Getting Receipt details');

// Get receipt details
Receipt.get(route.params.receiptId.toString())
  .catch((error: IHttpResponse) => {
    Alert.create(Alert.DANGER, error.message, 'Something went wrong.');
    if(error.code === 404) router.push('/not-found')
  })
  .finally(() => {
    loader.close();
  })

</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 m-auto max-w-7xl" v-if="!loader.isOpen">
    <div>
      <BasicInfo class="mb-5" />
      <Tags />
    </div>
    <div class="col-span-2">
      <ViewImage class="mb-5" />
      <Description />
    </div>
  </div>
</template>