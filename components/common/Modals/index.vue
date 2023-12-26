<template>
  <div
    ref="modalRef"
    class="modal z-40 outline-none"
    :class="{ 'modal-open': isShown }"
    tabindex="0"
    @click="close()"
    @keydown.esc="close()"
  >
    <div v-if="current" class="modal-box border border-secondary" @click.stop>
      <component :is="current.component" v-bind="current.props">
        <!-- 必要があればslotでHeaderを読み込む -->
        <template #default="slotProps: SlotProps">
          <header class="flex items-center gap-x-2">
            <button
              type="button"
              class="btn btn-sm btn-square btn-ghost"
              @click="goBack"
            >
              <span class="material-symbols-outlined">
                {{ existsPrev ? 'arrow_back_ios_new' : 'close' }}
              </span>
            </button>
            <div class="text-xl font-bold">{{ slotProps.headerName }}</div>

            <div class="divider my-2"></div>
          </header>
        </template>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
type SlotProps = {
  headerName: string;
};

const { modals } = storeToRefs(modalsStore());
const current = computed(() => modals.value.slice(-1)[0]);
const existsPrev = computed(() => !!modals.value.slice(-2, -1)[0]);

const isShown = ref(false);

const modalRef = ref<HTMLElement>();
const focusModal = () => {
  modalRef.value?.focus();
};

const goBack = () => {
  modalsStore().pop();
};

const close = () => {
  isShown.value = false;
  modalsStore().clear();
};

watch(
  () => current.value,
  () => {
    if (current.value) {
      isShown.value = true;
      focusModal();
    } else {
      isShown.value = false;
    }
  },
);
</script>

<style scoped>
/* modal-box に設定された height/width/padding の設定をリセット */
/* height/width および padding を、内部に設定されるコンポーネント側で管理する */
.modal-box {
  height: auto;
  width: auto;
  max-height: none;
  max-width: none;
  padding: 0;
}
</style>
