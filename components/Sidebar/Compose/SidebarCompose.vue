<template>
  <div class="w-64">
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="instance in instances"
        :key="instance"
        class="btn btn-primary"
        :class="{
          'btn-outline': selectedInstance !== instance,
        }"
        @click="selectedInstance = instance"
      >
        {{ instance }}
      </button>
    </div>

    <component
      :is="composeComponents[selectedInstance]"
      v-if="selectedInstance"
      class="mt-2"
    />
  </div>
</template>

<script setup lang="ts">
import { instances, type Instance } from '~/models/instance';
import {
  SidebarComposeBsky,
  SidebarComposeMastodon,
  SidebarComposeMisskey,
} from '#components';

const composeComponents = {
  bsky: SidebarComposeBsky,
  mastodon: SidebarComposeMastodon,
  misskey: SidebarComposeMisskey,
} satisfies {
  [instance in Instance]: unknown;
};

const selectedInstance = ref<Instance>();
</script>
