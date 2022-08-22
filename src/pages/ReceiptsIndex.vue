<script lang="ts" setup>
import { ref } from 'vue';
import ReceiptCard from '../components/ReceiptCard.vue';
import FilterReceipts from '../components/FilterReceipts.vue';
import { Receipt } from '../models/Receipt';
import { XIcon } from '@heroicons/vue/outline';
import ReceiptSkeleton from '../components/ReceiptSkeleton.vue';
import CustomDialog from '../components/common/CustomDialog.vue';
import Button from '../components/common/Button.vue';
import AddReceipt from '../components/AddReceipt.vue';
import { useReceiptStore } from '../store/receipt';
import { useLoaderStore } from '../store/globalLoader';
import { Alert } from '../models/Alert';

// Store
const loader = useLoaderStore();
const receipt = useReceiptStore();

// Dialogs
const addReceiptDialog = ref(false);

/**
 * Open dialog to create new receipt
 */
function openNewDialog() {
  receipt.selectReceipt(new Receipt());
  addReceiptDialog.value = true;
}

// Display loader
loader.open('Getting your Receipts');

// Get all receipts
Receipt.getAll()
  .catch(() => {
    Alert.create(Alert.DANGER, 'Please refresh the page.', 'Something went wrong.');
  })
  .finally(() => {
    loader.close();
  })

</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-5">
      <h2 class="text-3xl">My Receipts</h2>
      <FilterReceipts />
    </div>
    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <!-- Placeholder while loading -->
      <template v-if="loader.isOpen">
        <ReceiptSkeleton v-for="placeholder in 12" pulse />  
      </template>
      <!-- Display list here -->
      <template v-else>
        <!-- This is to add new receipt-->
        <ReceiptSkeleton add-new @addNewClicked="openNewDialog" />
        <ReceiptCard v-for="receiptItem of receipt.allReceipts" :item="receiptItem" />
      </template>
    </div>

    <!-- Add new receipt dialog -->
    <CustomDialog :show="addReceiptDialog" persistent size="md">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-xl">
            Create New Receipt
          </h3>
          <Button dense flat color="primary" @click="addReceiptDialog = false">
            <XIcon class="x-5 w-5" />
          </Button>
        </div>
      </template>
      <AddReceipt @on-success="addReceiptDialog = false" />
    </CustomDialog>
  </div>
</template>