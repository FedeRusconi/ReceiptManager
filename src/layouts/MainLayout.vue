<script lang="ts" setup>
import Navbar from './Navbar.vue';
import Loading from '../components/common/Loading.vue';
import Alert from '../components/common/Alert.vue';

</script>

<template>
  <Navbar />
  <div class="p-5">
    <router-view />
  </div>
  <!-- Global Loader -->
  <Loading dark no-background />
  <!-- This is necessary to display alerts -->
  <Alert />
</template>