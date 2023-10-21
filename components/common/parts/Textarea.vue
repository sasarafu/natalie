<template>
  <textarea
    :value="modelValue"
    :readonly="readonly"
    class="textarea w-full h-96"
    @input="onInput"
    @keydown.enter.meta.exact="handleKeydownEnter"
    @keydown.s.meta.exact="handleKeydownS"
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

const onInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLTextAreaElement).value);
};

const handleKeydownEnter = (e: KeyboardEvent) => {
  if (!e.ctrlKey && !e.metaKey) return;
  emits('submit');
};

const handleKeydownS = (e: KeyboardEvent) => {
  e.preventDefault();
};
</script>
