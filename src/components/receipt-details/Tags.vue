<script lang="ts" setup>
import { ref } from 'vue';
import { useReceiptStore } from '../../store/receipt';
import { PencilAltIcon, TagIcon } from '@heroicons/vue/outline';
import Button from '../common/Button.vue';
import Card from '../common/Card.vue';
import CardSection from '../common/CardSection.vue';
import { Tag } from '../../models/Tag';
import ViewTag from '../common/Tag.vue';
import { IHttpResponse } from '../../@types/IHttpResponse';
import { Alert } from '../../models/Alert';
import { useTagStore } from '../../store/tag';
import { ITag } from '../../@types/ITag';
import MultiSelect from '../common/form-elements/MultiSelect.vue';

// Store
const receipt = useReceiptStore();
const tag = useTagStore();

// Enable editing
const isEditing = ref(false);

// Loading
const loading = ref(false);
const tagsLoading = ref(false);

// Tags
const selectedTags = ref<ITag[]>([]);

/**
 * Save new tags into db
 */
function saveTags() {
  loading.value = true;
  receipt.selectedReceipt.addTags(selectedTags.value)
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
      selectedTags.value = [];
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })
    .finally(() => loading.value = false)
}

/**
 * Remove tag from receipt
 * @param tagId The ID of the tag to delete
 */
function deleteTag(tagId: string) {
  receipt.selectedReceipt.deleteTag(tagId)
    .then((res: IHttpResponse) => {
      Alert.create(Alert.SUCCESS, res.message, 'Yay!');
    })
    .catch((err: IHttpResponse) => {
      Alert.create(Alert.DANGER, err.message, 'Ouch!');
    })    
}

/**
 * Enable editing of tags
 */
function enableEditing() {
  isEditing.value = true;
  Tag.getAll()
    .catch(() => Alert.create(Alert.DANGER, 'Could not retrieve tags.', 'Something went wrong.'))
    .finally(() => tagsLoading.value = false);
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
 * Reset selected tags
 */
function resetTags() {
  selectedTags.value = [];
  isEditing.value = false;
}

</script>

<template>
  <Card>
    <CardSection class="flex justify-between">
      <h3 class="text-xl font-bold text-primary">Tags</h3>
      <Button flat dense color="primary" class="relative" @click="enableEditing">
        <PencilAltIcon class="h-5 w-5" />
      </Button>
    </CardSection>
    <CardSection v-if="isEditing">
      <label class="text-gray-700">Enter new tags</label>
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
      <div class="flex justify-center gap-2 mt-2">
        <Button
          @click="saveTags"
          :loading="loading"
          loadingText="Saving Tags"
          color="success"
        >
          Save Tags
        </Button>
        <Button 
          @click="resetTags"
          outline 
          :disabled="loading"
          color="danger"
        >
          Cancel
        </Button>
      </div>
    </CardSection>
    <CardSection class="flex flex-wrap gap-2">
      <ViewTag
        v-for="tag of receipt.selectedReceipt.tags"
        :label="tag.name"
        round
        :removable="isEditing"
        @on-remove="deleteTag(tag._id!)"
      />
      <p v-if="receipt.selectedReceipt.tags.length === 0">
        This receipt has no tags.
      </p>
    </CardSection>
  </Card>
</template>