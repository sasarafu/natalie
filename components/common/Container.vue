<template>
  <div class="common-container flex flex-col">
    <div class="common-container-header">
      <slot name="header" class="common-container-header"></slot>
    </div>

    <div class="common-container-body flex-auto overflow-y-auto">
      <slot></slot>

      <div ref="observeBottom">
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
  (e: 'bottom'): void;
}>();

const observeBottom = ref<HTMLElement>();

const observer = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting) {
    emits('bottom');
  }
});

onMounted(() => {
  observer.observe(observeBottom.value!);
});
</script>
