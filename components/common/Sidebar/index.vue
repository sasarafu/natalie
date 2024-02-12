<template>
  <header class="flex gap-0.5 max-sm:flex-col-reverse">
    <CommonPartsContainer
      class="items-center w-16 p-2 bg-neutral max-sm:flex-row-reverse max-sm:w-full"
    >
      <template #header>
        <div class="flex flex-col max-sm:flex-row-reverse gap-2">
          <button
            type="button"
            class="btn btn-circle btn-primary"
            @click="expandMenu"
          >
            <span class="material-symbols-outlined">edit_note</span>
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
              class="menu dropdown-content bg-base-100 rounded-box w-max z-[10]"
            >
              <li>
                <button type="button" @click="isOpenLoginModal = true">
                  <span class="material-symbols-outlined">person_add</span>
                  add account
                </button>
              </li>

              <li>
                <button type="button" @click="isOpenSettingsModal = true">
                  <span class="material-symbols-outlined">settings</span>
                  settings
                </button>
              </li>
            </ul>
          </CommonPartsDetails>
        </div>

        <CommonModalLogin
          v-if="isOpenLoginModal"
          @close="isOpenLoginModal = false"
        />
        <CommonModalConfig
          v-if="isOpenSettingsModal"
          @close="isOpenSettingsModal = false"
        />
      </template>
    </CommonPartsContainer>

    <!-- 入力画面の開閉状態はコンポーネント側で行う -->
    <CommonSidebarCompose />
  </header>
</template>

<script setup lang="ts">
const { config } = storeToRefs(useConfigStore());

const isOpenLoginModal = ref(false);
const isOpenSettingsModal = ref(false);

const expandMenu = () => {
  config.value.sidebar.isExpanded = !config.value.sidebar.isExpanded;
};
</script>
