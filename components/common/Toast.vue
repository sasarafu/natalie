<template>
  <div class="toast toast-top toast-end opacity-80 z-50">
    <template v-for="toast in toasts.slice().reverse()" :key="toast.id">
      <div
        class="alert border"
        :class="{
          'border-info': toast.level === 'info',
          'border-error': toast.level === 'error',
        }"
      >
        <span>{{ toast.text }}</span>
        <div
          class="radial-progress"
          style="--size: 1rem"
          :style="{ '--value': toast.percent }"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { toasts } = storeToRefs(useToastsStore());

onMounted(() => {
  setInterval(() => {
    const now = new Date().getTime();
    toasts.value.forEach((toast) => {
      toast.percent = (1 - (now - toast.addedAt) / toast.timeout) * 100;
    });
  }, 100);
});
</script>
