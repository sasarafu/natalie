<template>
  <div
    ref="modalRef"
    tabindex="-1"
    class="modal-box border border-secondary outline-none p-4"
    @keydown.esc="$emit('close')"
  >
    <template v-if="title">
      <header class="flex items-center gap-x-2">
        <button
          type="button"
          class="btn btn-sm btn-square btn-ghost"
          :disabled="!closable"
          @click="$emit('close')"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
        <label class="text-xl font-bold">{{ title }}</label>
      </header>

      <div class="divider mt-2"></div>
    </template>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  closable?: boolean; // closableはUI表示に使い、実際のcloseができるかはemit('close')が指定されるかで制御すること
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const modalRef = ref<HTMLElement>();
onClickOutside(modalRef, () => emits('close'));

onMounted(() => modalRef.value?.focus());
</script>

<style scoped>
/* modal-box に設定された height/width の設定をリセット */
/* height/width を、内部に設定されるコンポーネント側で管理する */
.modal-box {
  width: auto;
  height: auto;
  max-height: none;
  max-width: none;
}
</style>
