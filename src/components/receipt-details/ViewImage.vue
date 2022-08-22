<script lang="ts" setup>
import { ref } from 'vue';
import { useReceiptStore } from '../../store/receipt';
import { UploadIcon, XIcon } from '@heroicons/vue/outline';
import Button from '../common/Button.vue';
import Card from '../common/Card.vue';
import CardSection from '../common/CardSection.vue';
import FileInput from '../common/form-elements/FileInput.vue';
import { IHttpResponse } from '../../@types/IHttpResponse';
import { Alert } from '../../models/Alert';
import CustomDialog from '../common/CustomDialog.vue';

// Store
const receipt = useReceiptStore();

// Enable editing
const isEditing = ref(false);

//File uploaded
const fileUploaded = ref();

// Loading
const loading = ref(false);

// Dialogs
const zoomDialog = ref(false);

function zoomImage() {
  if(!receipt.selectedReceipt.attachment) return;
  zoomDialog.value = true;
}

/**
 * Update receipt image
 */
function updateImage() {
  loading.value = true;
  receipt.selectedReceipt.updateImage(fileUploaded.value)
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
      isEditing.value = false;
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })
    .finally(() => {
      loading.value = false;
    });
}

</script>

<template>
  <Card>
    <CardSection class="flex justify-between">
      <h3 class="text-xl font-bold text-primary">Attachment</h3>
      <Button flat dense color="primary" class="relative" @click="isEditing = true">
        <UploadIcon class="h-5 w-5" />
      </Button>
    </CardSection>
    <CardSection class="text-center">
      <Button
        flat
        dense
        @click="zoomImage"
        :class="{'cursor-zoom-in': receipt.selectedReceipt.attachment}"
      >
        <img
          v-if="receipt.selectedReceipt.attachment"
          class="w-full h-60 object-cover" 
          :src="receipt.selectedReceipt.attachment.filePath" 
          :alt="receipt.selectedReceipt.attachment.originalName"
        />
        <img
          v-else
          class="w-full h-60 object-cover" 
          src="/src/assets/image-placeholder.svg" 
          alt="No image uploaded"
        />
      </Button>
    </CardSection>
    <CardSection v-if="isEditing">
      <div class="flex justify-center items-center gap-2">
        <label class="text-gray-700">Attach a File</label>
        <FileInput @fileUploaded="fileUploaded = $event" />
      </div>
    </CardSection>
    <CardSection v-if="isEditing" class="flex justify-center gap-2">
      <Button
        @click="updateImage"
        :loading="loading"
        loadingText="Uploading File"
        color="success"
        :disabled="!fileUploaded"
      >
        Update Image
      </Button>
      <Button 
        @click="isEditing = false"
        outline 
        :disabled="loading"  
        color="danger"
      >
        Cancel
      </Button>
    </CardSection>

    <!-- Edit receipt dialog -->
    <CustomDialog :show="zoomDialog" size="lg" @close="zoomDialog = false">
      <template #title>
        <div class="text-right">
          <Button dense flat color="primary" @click="zoomDialog = false">
            <XIcon class="x-5 w-5" />
          </Button>
        </div>
      </template>
      <img
        class="w-full object-contain" 
        :src="receipt.selectedReceipt.attachment!.filePath" 
        :alt="receipt.selectedReceipt.attachment!.originalName"
      />
    </CustomDialog>
  </Card>
</template>