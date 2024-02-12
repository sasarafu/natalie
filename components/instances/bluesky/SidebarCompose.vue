<template>
  <CommonSidebarComposeTextarea
    ref="textareaRef"
    :readonly="submitting"
    @submit="submit"
  />

  <div class="flex gap-2">
    <button
      type="button"
      class="btn btn-primary btn-circle ml-auto"
      :disabled="submitting || message.length === 0"
      @click="submit"
    >
      <span class="material-symbols-outlined">arrow_forward</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { CommonSidebarComposeTextarea } from '#components';
import type { ILoginUser } from '~/models/common/user';

const props = defineProps<{
  user: ILoginUser;
}>();

const textareaRef = ref<InstanceType<typeof CommonSidebarComposeTextarea>>();

const message = ref<string>('');
const submitting = ref<boolean>(false);

const submit = async () => {
  if (message.value.length === 0 || submitting.value) return;

  submitting.value = true;

  try {
    await useApiClientsStore()
      .get<'bluesky'>(props.user)
      .post({ text: message.value });

    message.value = '';
  } catch (_) {}

  submitting.value = false;
};

const focus = () => textareaRef.value?.focus();
onActivated(focus);
</script>
