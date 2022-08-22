<script lang="ts" setup>
import Button from './Button.vue';
import { useAlertStore } from '../../store/alert';

// Store
const alert = useAlertStore();

/**
 * Emit event to close the alert
 */
function closeAlert(id: number) {
  alert.close(id);
}

</script>

<template>
  <div  
    class="fixed grid gap-y-2 z-50 shadow-md" 
    style="width: 500px; bottom: 20px; left: calc(50vw - 200px);"
  >
    <button 
      @click="closeAlert(alertItem.id)"
      v-for="alertItem of alert.allAlerts"
      class="relative px-4 py-3 rounded w-full" 
      :class="`${alertItem.severity.bg} ${alertItem.severity.border} ${alertItem.severity.text}`"
      role="alert"
    >
      <strong class="font-bold mr-1" v-if="alertItem.title">
        {{ alertItem.title }}
      </strong>
      <span class="block sm:inline">
        {{ alertItem.message }}
      </span>
    </button>
  </div>
</template>