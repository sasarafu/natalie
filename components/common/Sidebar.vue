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

      <template #footer>
        <div class="flex flex-col gap-y-2">
          <details class="dropdown dropdown-end dropdown-right">
            <summary class="btn btn-circle btn-ghost">
              <span class="material-symbols-outlined">settings</span>
            </summary>
            <ul class="menu dropdown-content bg-base-100 rounded-box">
              <li>
                <NuxtLink to="/login">
                  <span class="material-symbols-outlined">person_add</span>
                  add account
                </NuxtLink>
              </li>
            </ul>
          </details>
        </div>
      </template>
    </CommonContainer>

    <section
      v-if="activeLoginUser"
      v-show="isExpanded"
      class="flex flex-col gap-y-3 w-64 p-2 bg-neutral"
    >
      <CommonPartsUserSelector
        v-model="activeLoginUser"
        :users="orderedLoginUsers"
      />

      <component
        :is="composeComponents[activeLoginUser.instance.type]"
        :user="activeLoginUser"
      />
    </section>
  </header>
</template>

<script setup lang="ts">
import type { ILoginUser } from '~/models/common/user';

const composeComponents = {
  mastodon: resolveComponent('MastodonSidebarCompose'),
  misskey: resolveComponent('MisskeySidebarCompose'),
};

const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());

const isExpanded = ref<boolean>(true);
const activeLoginUser = ref<ILoginUser>(orderedLoginUsers.value[0]);

const expandMenu = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
