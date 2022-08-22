<script lang="ts" setup>
import { CalendarIcon, CurrencyDollarIcon, DocumentIcon, PencilAltIcon, XIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IHttpResponse } from '../../@types/IHttpResponse';
import { Alert } from '../../models/Alert';
import { useReceiptStore } from '../../store/receipt';
import AddReceipt from '../AddReceipt.vue';
import Button from '../common/Button.vue';
import Card from '../common/Card.vue';
import CardSection from '../common/CardSection.vue';
import CustomDialog from '../common/CustomDialog.vue';
import Tag from '../common/Tag.vue';

// Router
const router = useRouter();

// Store
const receipt = useReceiptStore();

// Dialogs
const editReceiptDialog = ref(false);
const deleteReceiptDialog = ref(false);

// Loading
const deleteLoading = ref(false);

/**
 * Delete selected receipt
 */
function deleteReceipt() {
  deleteLoading.value = true;
  receipt.selectedReceipt.delete()
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
      router.push({name: 'ReceiptsList'});
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })
    .finally(() => {
      deleteLoading.value = false;
    });
}

</script>

<template>
  <Card>
    <CardSection class="flex justify-between">
      <h3 class="text-xl font-bold text-primary">Receipt Info</h3>
      <Button flat dense color="primary" class="relative" @click="editReceiptDialog = true">
        <PencilAltIcon class="h-5 w-5" />
      </Button>
    </CardSection>
    <CardSection>
      <ul class="grid grid-rows-auto gap-3 border p-5">
        <li class="grid grid-cols-2">
          <section class="font-bold">
            <DocumentIcon class="h-5 w-5 inline" />
            Title
          </section>
          <section> {{ receipt.selectedReceipt.title }} </section>
        </li>
        <li class="grid grid-cols-2">
          <section class="font-bold">
            <CalendarIcon class="h-5 w-5 inline" />
            Date
          </section>
          <section> {{ receipt.selectedReceipt.dateBeautified }} </section>
        </li>
        <li class="grid grid-cols-2">
          <section class="font-bold">
            <CurrencyDollarIcon class="h-5 w-5 inline" />
            Amount
          </section>
          <section>
            <Tag
              background="bg-slate-900"
              text="text-slate-300"
              :label="receipt.selectedReceipt.amount.toFixed(2)"
              round
            >
              <template #icon>
                <CurrencyDollarIcon class="h-5 w-5 inline mr-2" />
              </template>
            </Tag>
          </section>
        </li>
      </ul>
      <Button
        @click="deleteReceiptDialog = true"
        outline
        class="w-full mt-3"
        color="danger"
      >
        Delete Receipt
      </Button>
    </CardSection>

    <!-- Edit receipt dialog -->
    <CustomDialog :show="editReceiptDialog" persistent size="md">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-xl">
            Edit Receipt
          </h3>
          <Button dense flat color="primary" @click="editReceiptDialog = false">
            <XIcon class="x-5 w-5" />
          </Button>
        </div>
      </template>
      <AddReceipt is-editing @on-success="editReceiptDialog = false" />
    </CustomDialog>

    <!-- Delete receipt dialog -->
    <CustomDialog :show="deleteReceiptDialog" persistent size="md">
      <template #title>
        <div class="flex justify-between items-center">
          <h3 class="text-xl">
            Delete Receipt
          </h3>
          <Button dense flat color="primary" @click="deleteReceiptDialog = false">
            <XIcon class="x-5 w-5" />
          </Button>
        </div>
      </template>
      <CardSection>
        <p class="text-center">
          Are you sure you want to delete the selected receipt?
          <br />
          <b>This action is irreversible.</b>
        </p>
      </CardSection>
      <CardSection>
        <Button
          @click="deleteReceipt"
          class="w-full"
          color="danger"
          :loading="deleteLoading"
          loadingText="Deleting Receipt"
        >
          Delete
        </Button>
      </CardSection>
    </CustomDialog>
  </Card>
</template>