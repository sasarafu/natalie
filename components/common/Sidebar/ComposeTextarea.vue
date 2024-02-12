<template>
  <textarea
    ref="textareaRef"
    v-model="computedModelValue"
    :readonly="readonly"
    class="textarea w-full h-96"
    @keydown.enter.meta.exact="handleKeydownEnter"
    @keydown.s.meta.exact.prevent
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  readonly: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
}>();

const computedModelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emits('update:modelValue', value),
});

const textareaRef = ref<HTMLTextAreaElement>();

const handleKeydownEnter = (e: KeyboardEvent) => {
  if (!e.ctrlKey && !e.metaKey) return;
  emits('submit');
};

// focus on appeared
const focus = () => textareaRef.value?.focus();
const textareaObserver = new IntersectionObserver(focus);

onMounted(() => {
  textareaObserver.observe(textareaRef.value!);
});
onBeforeUnmount(() => {
  textareaObserver.unobserve(textareaRef.value!);
});
</script>
