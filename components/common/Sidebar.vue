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
      v-if="activeLoginUser"
      v-show="isExpanded"
      class="flex flex-col gap-y-3 w-64 p-2 bg-neutral"
    >
      <CommonUserSelector v-model="activeLoginUser" :users="loginUsers" />

      <MisskeyCompose
        v-if="activeLoginUser?.instance.type === 'misskey'"
        :user="activeLoginUser"
      />
      <MastodonCompose
        v-if="activeLoginUser?.instance.type === 'mastodon'"
        :user="activeLoginUser"
      />
    </section>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginUsers } from '~/stores/loginUsers';
import type { ILoginUser } from '~/models/common/user';

const { loginUsers } = storeToRefs(useLoginUsers());

const isExpanded = ref<boolean>(true);
const activeLoginUser = toRef<ILoginUser>(loginUsers.value[0]);

const expandMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
