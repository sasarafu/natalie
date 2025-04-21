<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
      <slot />
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
const dialogRef = useTemplateRef('dialogRef');

defineExpose({
  open: () => {
    dialogRef.value?.showModal();
  },
  close: () => {
    dialogRef.value?.close();
  },
});

defineSlots<{
  default: unknown;
}>();
</script>
