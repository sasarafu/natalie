<template>
  <div ref="container" class="common-container flex flex-col">
    <div class="common-container-header">
      <slot name="header" class="common-container-header" />
    </div>

    <div class="common-container-body flex-auto overflow-y-auto">
      <div ref="topElement" class="h-0" />

      <slot />

      <div ref="bottomElement">
        <slot name="loading" />
      </div>
    </div>

    <div>
      <slot name="footer" class="common-container-footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'top', value: boolean): void;
  (e: 'bottom'): void;
}>();

const container = ref<HTMLElement>();
const topElement = ref<HTMLElement>();
const bottomElement = ref<HTMLElement>();

onMounted(() => {
  const topObserver = new IntersectionObserver(
    (entries) => {
      emits('top', entries[0]?.isIntersecting ?? false);
    },
    {
      root: container.value!,
    },
  );

  const bottomObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        emits('bottom');
      }
    },
    {
      root: container.value!,
    },
  );

  topObserver.observe(topElement.value!);
  bottomObserver.observe(bottomElement.value!);
});
</script>
