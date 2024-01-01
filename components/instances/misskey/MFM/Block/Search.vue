<template>
  <div class="join whitespace-normal w-full my-1">
    <input
      v-model="searchQuery"
      class="join-item input input-bordered input-primary w-full"
    />
    <NuxtLink
      :to="`https://www.google.com/search?q=${searchQuery}`"
      target="_blank"
      class="join-item btn btn-primary"
    >
      検索
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { MfmSearch } from 'mfm-js';

const props = defineProps<MfmSearch['props'] & { baseUrl: string }>();
const searchQuery = ref(props.query);
</script>
