<template>
  <form @submit.prevent="submit">
    <div class="flex gap-2">
      <fieldset class="fieldset w-full">
        <input
          v-model="userid"
          type="text"
          class="input input-primary input-bordered w-full"
          placeholder="userid"
        />
        <p class="label">e.g. example.bsky.social</p>
      </fieldset>
      <button class="btn btn-circle btn-primary p-2" :disabled="disabled">
        <span v-if="submitting" class="loading loading-spinner loading-sm" />
        <PaperAirplaneIcon v-else class="size-full" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';
import { repositoryBsky } from '~/repositories/bsky/repositoryBsky';

const emits = defineEmits<{
  (e: 'completed'): void;
}>();

const userid = ref('');
const submitting = ref(false);

const disabled = computed(() => !userid.value || submitting.value);

const submit = async () => {
  if (submitting.value) {
    return;
  }
  submitting.value = true;

  try {
    const client = repositoryBsky.createSession();
    await client.init();
    await client.signIn(userid.value);
  } catch {
    console.error('bsky signin setup error');
  } finally {
    submitting.value = false;
  }

  emits('completed');
};
</script>
