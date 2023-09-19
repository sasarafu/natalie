<template>
  <div
    ref="modalRef"
    class="modal z-40 outline-none"
    :class="{ 'modal-open': isShown }"
    tabindex="0"
    @click="close()"
    @keydown.esc="close()"
  >
    <div
      v-if="current"
      class="modal-box border border-secondary h-full w-full p-[1rem]"
      :style="{
        width: current.displayOptions?.width,
        height: current.displayOptions?.height,
        'max-width': current.displayOptions?.maxWidth ?? '90%',
        'max-height': current.displayOptions?.maxHeight ?? '90%',
      }"
      @click.stop
    >
      <div
        v-if="current.displayOptions?.hasHeader !== false"
        class="flex items-center gap-x-2"
      >
        <button
          type="button"
          class="btn btn-sm btn-square btn-ghost"
          @click="goBack"
        >
          <span class="material-symbols-outlined">
            {{ existsPrev ? 'arrow_back_ios_new' : 'close' }}
          </span>
        </button>
        <div class="text-xl font-bold">{{ current.name }}</div>

        <div class="divider my-2"></div>
      </div>

      <component :is="current.component" v-bind="current.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
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