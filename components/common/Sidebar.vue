<template>
  <header class="flex gap-0.5">
    <CommonContainer class="h-screen items-center w-16 p-2 bg-neutral">
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
            <ul class="menu dropdown-content bg-base-100 rounded-box w-48">
              <li>
                <span>
                  {{
                    `${runtimeConfig.public.appName}
                    v${runtimeConfig.public.version}
                    (${runtimeConfig.public.natalieEnv.substring(0, 4)})`
                  }}
                </span>
              </li>
              <li>
                <NuxtLink to="/login">
                  <span class="material-symbols-outlined">person_add</span>
                  add account
                </NuxtLink>
              </li>

              <!-- TODO: ちゃんと設定画面を作ったらそこに移す -->
              <li>
                <a @click="resetSettings">
                  <span class="material-symbols-outlined">delete</span>
                  reset settings
                </a>
              </li>
            </ul>
          </CommonPartsDetails>
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

const runtimeConfig = useRuntimeConfig();

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

const resetSettings = () => {
  useResetLocalStorage();
  location.reload();
};
</script>
