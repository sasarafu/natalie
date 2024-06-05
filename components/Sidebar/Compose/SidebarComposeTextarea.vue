<template>
  <textarea
    ref="textareaRef"
    v-model="model"
    :readonly="readonly"
    class="textarea w-full h-96"
    @keydown.enter.meta.exact="handleKeydownEnter"
    @keydown.s.meta.exact.prevent
  />
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  readonly: boolean;
}>();

const emits = defineEmits<{
  (e: 'submit'): void;
}>();

const textareaRef = ref<HTMLTextAreaElement>();

const handleKeydownEnter = (e: KeyboardEvent) => {
  if (!e.ctrlKey && !e.metaKey) return;
  emits('submit');
};

defineExpose({
  focus: () => textareaRef.value?.focus(),
});
</script>
