<script lang="ts" setup>
import { CalendarIcon, CurrencyDollarIcon, DocumentIcon, DocumentTextIcon, TagIcon } from '@heroicons/vue/outline';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import { IHttpResponse } from '../@types/IHttpResponse';
import { ITag } from '../@types/ITag';
import { Alert } from '../models/Alert';
import { Receipt } from '../models/Receipt';
import { Tag } from '../models/Tag';
import { useReceiptStore } from '../store/receipt';
import { useTagStore } from '../store/tag';
import Button from './common/Button.vue';
import BorderedField from './common/form-elements/BorderedField.vue';
import FileInput from './common/form-elements/FileInput.vue';
import MultiSelect from './common/form-elements/MultiSelect.vue';
import ViewTag from './common/Tag.vue';

// Emits
const emit = defineEmits(['onSuccess']);

// Props
const props = defineProps({
  isEditing: Boolean
})

// Store
const receipt = useReceiptStore();
const tag = useTagStore();

// Loading
const loading = ref(false);
const tagsLoading = ref(true);

// Store receipt info (This is a way to clone orignal receipt to avoid editing it directly)
const receiptData = ref(new Receipt(receipt.selectedReceipt));
const selectedTags = ref<ITag[]>([]);
const fileUploaded = ref();

// Create form validations
const newReceiptForm = yup.object({
  title: yup.string().required('Please enter a title.'),
  description: props.isEditing ? yup.string() : yup.string().required('Please enter a short description.'),
  date: yup.string().required('Please enter a date.'),
  amount: yup.number().min(0, 'Amount cannot be negative.').required('Please enter an amount.')
});

/**
 * Create new receipt
 */
function createReceipt() {
  loading.value = true;
  receiptData.value.create(selectedTags.value, fileUploaded.value)
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
      emit('onSuccess');
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * Edit receipt
 */
function editReceipt() {
  loading.value = true;
  receiptData.value.update()
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
      emit('onSuccess');
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * Remove tag from selected list
 * @param tagName The name of the tag to remove
 */
function removeTag(tagName: string) {
  const index = selectedTags.value.findIndex(t => t.name === tagName)
  if(index > -1) selectedTags.value.splice(index, 1);
}

/**
 * Get all tags - only when creating new receipt
 */
if(!props.isEditing) {
  Tag.getAll()
    .catch(() => Alert.create(Alert.DANGER, 'Could not retrieve tags.', 'Something went wrong.'))
    .finally(() => tagsLoading.value = false);
}

</script>

<template>
  <Form 
    class="grid grid-cols-1 gap-6" 
    :validation-schema="newReceiptForm"
    @submit="isEditing ? editReceipt() : createReceipt()"
  >
    <div class="block">
      <label class="text-gray-700">Title</label>
      <BorderedField
        name="title"
        type="text"
        v-model="receiptData.title"
      >
        <template #prepend>
          <DocumentIcon class="h-5 w-5" />
        </template>
      </BorderedField>
    </div>
    <div class="block grid gap-3 grid-cols-1 md:grid-cols-2">
      <div>
        <label class="text-gray-700">Date</label>
        <BorderedField
          name="date"
          type="date"
          placeholder="Date"
          v-model="receiptData.dateString"
        >
          <template #prepend>
            <CalendarIcon class="h-5 w-5" />
          </template>
        </BorderedField>
      </div>
      <div>
        <label class="text-gray-700">Amount</label>
        <BorderedField
          name="amount"
          type="number"
          placeholder="0.00"
          :step="0.5"
          v-model="receiptData.amount"
        >
          <template #prepend>
            <CurrencyDollarIcon class="h-5 w-5" />
          </template>
        </BorderedField>
      </div>
    </div>
    <div class="block" v-if="!isEditing">
      <label class="text-gray-700">Description</label>
      <BorderedField
        name="description"
        text-area
        v-model="receiptData.description"
      >
        <template #prepend>
          <DocumentTextIcon class="h-5 w-5" />
        </template>
      </BorderedField>
    </div>
    <div class="block" v-if="!isEditing">
      <label class="text-gray-700">Tags</label>
      <MultiSelect
        name="selectedTags"
        placeholder="Enter Tag Names"
        :options="tag.allTags"
        option-value="name"
        option-label="name"
        v-model="selectedTags"
        :allowNewOption="true"
        :loading="tagsLoading"
      >
        <template #prepend>
          <TagIcon class="h-5 w-5" />
        </template>
      </MultiSelect>
      <!-- Selected tags -->
      <div class="flex flex-wrap gap-2 mt-3" v-if="selectedTags.length > 0">
        <ViewTag
          round
          removable
          v-for="tag of selectedTags"
          :label="tag.name"
          @on-remove="removeTag(tag.name)"
        />
      </div>
    </div>
    <div class="block" v-if="!isEditing">
      <label class="text-gray-700">Attach a File</label>
      <FileInput @fileUploaded="fileUploaded = $event" />
    </div>
    <div class="grid gap-2">
      <Button
        submit
        :loading="loading"
        :loadingText="isEditing ? 'Updating Receipt' : 'Creating Receipt'"
        class="w-full"
        color="success"
      >
        {{ isEditing ? 'Update' : 'Create' }}
        Receipt
      </Button>
      <Button outline :disabled="loading" class="w-full" reset color="danger">
        Clear
      </Button>
    </div>
  </Form>
</template>