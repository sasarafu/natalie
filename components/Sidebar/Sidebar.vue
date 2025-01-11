<script setup lang="ts">
import { Cog6ToothIcon, PencilSquareIcon } from '@heroicons/vue/20/solid';
</script>

<template>
  <header class="flex flex-col bg-base-200 p-2">
    <div>
      <button type="button" class="btn btn-sm btn-circle p-1 btn-primary">
        <PencilSquareIcon class="size-full" />
      </button>
    </div>
    <div class="grow" />
    <div>
      <button type="button" class="btn btn-sm btn-circle p-1 btn-ghost">
        <Cog6ToothIcon class="size-full" />
      </button>
    </div>
  </header>
</template>
