<template>
  <div>
    <template v-if="loginUsers.length">
      <div class="flex gap-x-1 h-screen w-screen bg-base-300">
        <CommonSidebar />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginUsers } from '~/stores/loginUsers';

const { loginUsers } = storeToRefs(useLoginUsers());

if (loginUsers.value.length === 0) {
  navigateTo('/login');
}
</script>
