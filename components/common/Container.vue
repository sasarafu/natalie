<template>
  <div class="common-container flex flex-col">
    <div class="common-container-header">
      <slot name="header" class="common-container-header"></slot>
    </div>

    <div class="common-container-body flex-auto overflow-y-auto">
      <div ref="topElement" class="h-0"></div>

      <slot></slot>

      <div ref="bottomElement">
        <slot name="loading"></slot>
      </div>
    </div>

    <div>
      <slot name="footer" class="common-container-footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'top', value: boolean): void;
  (e: 'bottom'): void;
}>();

const topElement = ref<HTMLElement>();
const topObserver = new IntersectionObserver((entries) => {
  emits('top', entries[0]?.isIntersecting ?? false);
});

const bottomElement = ref<HTMLElement>();
const bottomObserver = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting) {
    emits('bottom');
  }
});

onMounted(() => {
  topObserver.observe(topElement.value!);
  bottomObserver.observe(bottomElement.value!);
});
</script>
