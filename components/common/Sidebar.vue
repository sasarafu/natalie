<template>
  <header class="flex gap-0.5">
    <CommonPartsContainer class="h-screen items-center w-16 p-2 bg-neutral">
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
          <CommonPartsDetails class="dropdown dropdown-end dropdown-right">
            <summary class="btn btn-circle btn-ghost">
              <span class="material-symbols-outlined">settings</span>
            </summary>
            <ul
              class="menu dropdown-content bg-base-100 rounded-box w-48 z-[10]"
            >
              <li>
                <button type="button" @click="openLogin">
                  <span class="material-symbols-outlined">person_add</span>
                  add account
                </button>
              </li>

              <li>
                <button type="button" @click="openSettings">
                  <span class="material-symbols-outlined">settings</span>
                  settings
                </button>
              </li>
            </ul>
          </CommonPartsDetails>
        </div>
      </template>
    </CommonPartsContainer>

    <section
      v-if="activeLoginUser"
      v-show="config.sidebar.isExpanded"
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
  bluesky: resolveComponent('BlueskySidebarCompose'),
  mastodon: resolveComponent('MastodonSidebarCompose'),
  misskey: resolveComponent('MisskeySidebarCompose'),
};

const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());

const { config } = storeToRefs(useConfigStore());
const activeLoginUser = ref<ILoginUser>(orderedLoginUsers.value[0]);

const expandMenu = () => {
  config.value.sidebar.isExpanded = !config.value.sidebar.isExpanded;
};

const openLogin = () => {
  useModalsStore().add(resolveComponent('CommonModalLogin'), {});
};

const openSettings = () => {
  useModalsStore().add(resolveComponent('CommonModalConfig'), {});
};
</script>
