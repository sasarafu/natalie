<template>
  <div>
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
      <button
        v-if="selectedInstance"
        class="btn btn-outline btn-circle btn-sm p-1"
        @click="selectedInstance = undefined"
      >
        <XMarkIcon class="size-full" />
      </button>
    </div>

    <component
      :is="loginComponents[selectedInstance]"
      v-if="selectedInstance"
      class="mt-2"
      @completed="$emit('completed')"
    />
  </div>
</template>

<script setup lang="ts">
import { instances, type Instance } from '~/models/instance';
import {
  SidebarAccountLoginBsky,
  SidebarAccountLoginMastodon,
  SidebarAccountLoginMisskey,
} from '#components';
import { XMarkIcon } from '@heroicons/vue/16/solid';

defineEmits<{
  (e: 'completed'): void;
}>();

const loginComponents = {
  bsky: SidebarAccountLoginBsky,
  mastodon: SidebarAccountLoginMastodon,
  misskey: SidebarAccountLoginMisskey,
} satisfies {
  [instance in Instance]: unknown;
};

const selectedInstance = ref<Instance>();
</script>
