<template>
  <textarea
    v-model="message"
    class="textarea w-full h-96"
    placeholder="misskey"
    @keydown.enter.meta.exact="handleKeydownEnter"
  />
  <button type="button" class="btn btn-primary" @click="submit">submit</button>
</template>

<script setup lang="ts">
import type { IAccount } from '~/models/account';

const props = defineProps<{
  account: IAccount;
}>();

const message = ref<string>('');

const handleKeydownEnter = (e: KeyboardEvent) => {
  if (!e.ctrlKey && !e.metaKey) return;
  submit();
};

const submit = () => {
  console.log(`submitted: ${message.value}`);
  message.value = '';
};
</script>
