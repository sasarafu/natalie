<template>
  <CommonPartsTextarea
    v-model="message"
    :readonly="submitting"
    @submit="submit"
  />
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
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const message = ref<string>('');
const submitting = ref<boolean>(false);

const submit = async () => {
  if (message.value.length === 0 || submitting.value) return;

  submitting.value = true;

  try {
    await (
      await useApiClientsStore().get<'mastodon'>(props.user)
    ).api.v1.statuses.create({
      status: message.value,
      visibility: 'private',
    });

    message.value = '';
  } catch (_) {}

  submitting.value = false;
};
</script>
