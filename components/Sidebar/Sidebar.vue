<template>
  <aside class="flex gap-1">
    <header class="flex flex-col bg-base-200 p-2 gap-1">
      <button
        type="button"
        class="btn btn-sm btn-circle p-1"
        :class="[
          sidebar.open && sidebar.component === 'compose'
            ? 'btn-neutral'
            : 'btn-primary',
        ]"
        @click="toggleCompose"
      >
        <PencilSquareIcon class="size-full" />
      </button>

      <div class="grow" />

      <button
        type="button"
        class="btn btn-sm btn-circle p-1"
        :class="
          sidebar.open && sidebar.component === 'account'
            ? 'btn-neutral'
            : 'btn-ghost'
        "
        @click="openLogin"
      >
        <UserGroupIcon class="size-full" />
      </button>
      <button type="button" class="btn btn-sm btn-circle p-1 btn-ghost">
        <Cog6ToothIcon class="size-full" />
      </button>
    </header>

    <main
      v-show="sidebar.open"
      class="overflow-x-hidden overflow-y-auto p-2 bg-base-200"
    >
      <KeepAlive>
        <component :is="sidebarComponents[sidebar.component]" />
      </KeepAlive>
    </main>
  </aside>
</template>

<script setup lang="ts">
import { SidebarCompose, SidebarAccount } from '#components';
import {
  Cog6ToothIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/solid';

const { sidebar } = useSidebar();

const sidebarComponents = {
  compose: SidebarCompose,
  account: SidebarAccount,
} satisfies Record<(typeof sidebar)['value']['component'], unknown>;

const toggleCompose = () => {
  if (sidebar.value.open && sidebar.value.component === 'compose') {
    sidebar.value.open = false;
    return;
  }
  sidebar.value.open = true;
  sidebar.value.component = 'compose';
};

const openLogin = () => {
  sidebar.value.open = true;
  sidebar.value.component = 'account';
};
</script>
