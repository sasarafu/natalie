<template>
  <CommonTextarea v-model="message" :readonly="submitting" @submit="submit" />
  <button
    type="button"
    class="btn btn-primary"
    :disabled="submitting || message.length === 0"
    @click="submit"
  >
    submit
  </button>
</template>

<script setup lang="ts">
import type { IAccount } from '~/models/account';

defineProps<{
  account: IAccount;
}>();

const message = ref<string>('');
const submitting = ref<boolean>(false);

const submit = () => {
  if (message.value.length === 0) return;

  submitting.value = true;
  console.log(`submitted: ${message.value}`);
  message.value = '';
  submitting.value = false;
};
</script>
