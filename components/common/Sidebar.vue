<template>
  <header class="flex">
    <CommonContainer class="h-screen items-center w-16 p-2 bg-neutral-focus">
      <template #header>
        <div class="flex flex-col gap-y-2">
          <button
            type="button"
            class="btn btn-circle btn-primary"
            @click="expandMenu"
          >
            <span class="material-symbols-outlined">edit_note</span>
          </button>

          <button type="button" class="btn btn-circle btn-info">
            <span class="material-symbols-outlined">search</span>
          </button>
        </div>
      </template>
    </CommonContainer>

    <section
      v-if="activeAccount"
      v-show="isExpanded"
      class="flex flex-col gap-y-3 w-64 p-2 bg-neutral"
    >
      <CommonAccountSelector v-model="activeAccount" :accounts="accounts" />

      <MisskeyCompose
        v-if="activeAccount?.instanceType === 'misskey'"
        :account="activeAccount"
      />
      <MastodonCompose
        v-if="activeAccount?.instanceType === 'mastodon'"
        :account="activeAccount"
      />
    </section>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAccounts } from '~/stores/accounts';
import type { IAccount } from '~/models/common/account';

const { accounts } = storeToRefs(useAccounts());

const isExpanded = ref<boolean>(true);
const activeAccount = toRef<IAccount>(accounts.value[0]);

const expandMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
