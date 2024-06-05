<template>
  <details ref="details" tabindex="-1" class="w-fit">
    <slot />
  </details>
</template>

<script setup lang="ts">
const details = ref<HTMLDetailsElement>();
const { focused } = useFocusWithin(details);

watch(focused, (focused) => {
  if (!focused && details.value) {
    details.value.open = false;
  }
});
</script>
