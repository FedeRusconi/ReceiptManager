<script lang="ts" setup>
import { CalendarIcon, FilterIcon, SearchIcon, TagIcon, XIcon } from '@heroicons/vue/outline';
import { ExclamationCircleIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
import { ITag } from '../@types/ITag';
import { Alert } from '../models/Alert';
import { Tag } from '../models/Tag';
import { useTagStore } from '../store/tag';
import Button from './common/Button.vue';
import CustomDialog from './common/CustomDialog.vue';
import BorderedField from './common/form-elements/BorderedField.vue';
import MultiSelect from './common/form-elements/MultiSelect.vue';
import ViewTag from './common/Tag.vue';
import Slider from '@vueform/slider';
import { Receipt } from '../models/Receipt';
import { useLoaderStore } from '../store/globalLoader';

// Store
const tag = useTagStore();
const loader = useLoaderStore();

// Timeout
const timeout = ref();

// Filters applied
const filtersApplied = ref(false);

// Search Terms
const searchTitle = ref('');
const searchTags = ref<ITag[]>([]);
const searchDateFrom = ref('');
const searchDateTo = ref('');
const searchAmount = ref([0, 501]);

// Slider configurations
const sliderConfig = ref({
  format: (value: number) => {
    if(value === 501) {
      return '$500+'
    } else {
      return `$${Math.round(value)}`
    }
  },
  max: 501
});

// Dialog
const filtersDialog = ref(false);

// Loading
const tagsLoading = ref(false);

/**
 * Open filters dialog
 */
function openFilters() {
  tagsLoading.value = true;
  filtersDialog.value = true
  Tag.getAll()
    .catch(() => Alert.create(Alert.DANGER, 'Could not retrieve tags.', 'Something went wrong.'))
    .finally(() => tagsLoading.value = false);
}

/**
 * Reset any filters applied
 */
function resetFilters() {
  searchTitle.value = '';
  searchTags.value = [];
  searchDateFrom.value = '';
  searchDateTo.value = '';
  searchAmount.value = [0, 501]
  applyFilters();
}

/**
 * Filter by title only
 */
function filterTitle() {
  // Timeout avoids sending too many requests
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    applyFilters();
  }, 500)
}

/**
 * Apply extra filters
 */
function applyFilters(config?: {showBadge: boolean}) {
  loader.open('Getting your Receipts');
  Receipt.getWithFilters({
    title: searchTitle.value,
    dateFrom: searchDateFrom.value,
    dateTo: searchDateTo.value,
    amount: searchAmount.value,
    tags: searchTags.value
  })
    .catch(() => Alert.create(Alert.DANGER, 'PLease refresh the page.', 'Something went wrong.'))
    .finally(() => {
      filtersDialog.value = false;
      filtersApplied.value = config ? config.showBadge : false;
      loader.close();
    });
}

/**
 * Remove tag from selected list
 * @param tagName The name of the tag to remove
 */
function removeTag(tagName: string) {
  const index = searchTags.value.findIndex(t => t.name === tagName)
  if(index > -1) searchTags.value.splice(index, 1);
}


</script>

<template>
  <div class="flex items-center gap-2">
    <BorderedField
      name="searchTitle"
      type="search"
      placeholder="Search by Title"
      v-model="searchTitle"
      @input="filterTitle"
    >
      <template #prepend>
        <SearchIcon class="h-5 w-5" />
      </template>
    </BorderedField>
    <Button color="primary" class="relative" @click="openFilters">
      <div v-if="filtersApplied" class="absolute rounded-full bg-white" style="top: -10px; right: -10px;">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" />
      </div>
      <FilterIcon class="h-5 w-5 mr-1 inline" />
      More
    </Button>
  </div>

  <!-- More Filters Dialog -->
  <CustomDialog size="sm" :show="filtersDialog" @close="filtersDialog = false">
    <template #title>
      <div class="flex justify-between items-center">
        <h3 class="text-xl">
          More Filters
        </h3>
        <Button dense flat color="primary" @click="filtersDialog = false">
          <XIcon class="x-5 w-5" />
        </Button>
      </div>
    </template>

    <!-- Date From -->
    <div class="mb-5">
      <label class="text-gray-700">Search by Date From</label>
      <BorderedField
        name="searchDateFrom"
        type="date"
        placeholder="Date From"
        v-model="searchDateFrom"
      >
        <template #prepend>
          <CalendarIcon class="h-5 w-5" />
        </template>
      </BorderedField>
    </div>

    <!-- Date To -->
    <div class="mb-5">
      <label class="text-gray-700">Search by Date To</label>
      <BorderedField
        name="searchDateTo"
        type="date"
        placeholder="Date To"
        v-model="searchDateTo"
      >
        <template #prepend>
          <CalendarIcon class="h-5 w-5" />
        </template>
      </BorderedField>
    </div>
    
    <!-- Amount -->
    <div class="mb-5">
      <label class="text-gray-700 mb-3">Amount Range</label>
      <Slider class="mt-3" v-model="searchAmount" v-bind="sliderConfig" />
    </div>   
    
    <!-- Tags -->
    <div class="mb-5">
      <label class="text-gray-700">Search Tags</label>
      <MultiSelect
        name="searchTags"
        placeholder="Enter Tag Names"
        :options="tag.allTags"
        option-value="name"
        option-label="name"
        v-model="searchTags"
        :loading="tagsLoading"
      >
        <template #prepend>
          <TagIcon class="h-5 w-5" />
        </template>
      </MultiSelect>
      <!-- Selected tags -->
      <div class="flex flex-wrap gap-2 mt-3" v-if="searchTags.length > 0">
        <ViewTag
          round
          removable
          v-for="tag of searchTags"
          :label="tag.name"
          @on-remove="removeTag(tag.name)"
        />
      </div>
    </div>

    <!-- Confirm buttons -->
    <div class="flex gap-2 justify-end mt-8">
      <Button outline color="danger" @click="resetFilters">
        Reset Filters
      </Button>
      <Button color="success" @click="applyFilters({showBadge: true})">
        Apply Filters
      </Button>
    </div>
  </CustomDialog>
</template>

<style src="@vueform/slider/themes/default.css"></style>