<template>
  <textarea
    :value="modelValue"
    :readonly="readonly"
    class="textarea w-full h-96"
    @input="$emit('update:modelValue', $event.target?.value)"
    @keydown.enter.meta.exact="handleKeydownEnter"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  readonly: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
}>();

const handleKeydownEnter = (e: KeyboardEvent) => {
  if (!e.ctrlKey && !e.metaKey) return;
  emits('submit');
};
</script>
