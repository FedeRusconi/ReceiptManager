<script lang="ts" setup>
import { ref } from 'vue';
import { useReceiptStore } from '../../store/receipt';
import { PencilAltIcon } from '@heroicons/vue/outline';
import BorderedField from '../common/form-elements/BorderedField.vue';
import Button from '../common/Button.vue';
import Card from '../common/Card.vue';
import CardSection from '../common/CardSection.vue';
import { Receipt } from '../../models/Receipt';
import { Alert } from '../../models/Alert';
import { IHttpResponse } from '../../@types/IHttpResponse';

// Store
const receipt = useReceiptStore();

// Enable editing
const isEditing = ref(false);
const description = ref(receipt.selectedReceipt.description);

// Loading
const loading = ref(false);

/**
 * Reset description to previous value
 */
function resetDescription() {
  description.value = receipt.selectedReceipt.description;
  isEditing.value = false;
}

/**
 * Update receipt description
 */
function updateDescription() {
  loading.value = true;
  const updatedReceipt = new Receipt(receipt.selectedReceipt);
  updatedReceipt.description = description.value;
  updatedReceipt.update()
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
      <h3 class="text-xl font-bold text-primary">Description</h3>
      <Button flat dense color="primary" class="relative" @click="isEditing = true">
        <PencilAltIcon class="h-5 w-5" />
      </Button>
    </CardSection>
    <CardSection>
      <BorderedField
        v-if="isEditing"
        name="description"
        text-area
        v-model="description"
      />
      <p v-else>{{ receipt.selectedReceipt.description }}</p>
    </CardSection>
    <CardSection v-if="isEditing" class="flex justify-center gap-2">
      <Button
        @click="updateDescription"
        :loading="loading"
        loadingText="Updating Receipt"
        color="success"
      >
        Update Description
      </Button>
      <Button 
        @click="resetDescription"
        outline 
        :disabled="loading" 
        color="danger"
      >
        Cancel
      </Button>
    </CardSection>
  </Card>
</template>